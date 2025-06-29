import { create } from 'zustand';
import { supabase, handleSupabaseError } from '../lib/supabase';
import { AuthState, User } from '../types';
import toast from 'react-hot-toast';

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  session: null,
  loading: true,

  signIn: async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        // Fetch user profile
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.user.id)
          .single();

        if (profileError) {
          console.error('Profile fetch error:', profileError);
          // If profile doesn't exist, create it
          if (profileError.code === 'PGRST116') {
            const { error: createError } = await supabase
              .from('profiles')
              .insert({
                id: data.user.id,
                username: data.user.email?.split('@')[0] || 'user',
                points: 0,
                level: 1,
              });
            
            if (createError) throw createError;
            
            // Fetch the newly created profile
            const { data: newProfile, error: newProfileError } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', data.user.id)
              .single();
            
            if (newProfileError) throw newProfileError;
            
            set({
              user: { ...newProfile, email: data.user.email! },
              session: data.session,
            });
          } else {
            throw profileError;
          }
        } else {
          set({
            user: { ...profile, email: data.user.email! },
            session: data.session,
          });
        }

        toast.success('Welcome back!');
      }
    } catch (error) {
      const message = handleSupabaseError(error);
      toast.error(message);
      throw error;
    }
  },

  signUp: async (email: string, password: string, username: string) => {
    try {
      // Check if username is already taken
      const { data: existingUser } = await supabase
        .from('profiles')
        .select('username')
        .eq('username', username)
        .single();

      if (existingUser) {
        throw new Error('Username is already taken');
      }

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username: username,
          }
        }
      });

      if (error) throw error;

      if (data.user) {
        // Create user profile immediately
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: data.user.id,
            username,
            points: 0,
            level: 1,
          });

        if (profileError) {
          console.error('Profile creation error:', profileError);
          // Don't throw here, as the user is already created
        }

        // If user is immediately confirmed (no email verification required)
        if (data.session) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', data.user.id)
            .single();

          if (profile) {
            set({
              user: { ...profile, email: data.user.email! },
              session: data.session,
            });
            toast.success('🎉 Welcome to RhymeRumble! Your poetry journey begins now!');
          }
        } else {
          toast.success('Account created successfully! You can now sign in.');
        }
      }
    } catch (error) {
      const message = handleSupabaseError(error);
      toast.error(message);
      throw error;
    }
  },

  signOut: async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      set({ user: null, session: null });
      toast.success('Signed out successfully');
      
      // Redirect to landing page after sign out
      window.location.href = '/';
    } catch (error) {
      const message = handleSupabaseError(error);
      toast.error(message);
      throw error;
    }
  },

  resetPassword: async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) throw error;
      toast.success('Password reset email sent!');
    } catch (error) {
      const message = handleSupabaseError(error);
      toast.error(message);
      throw error;
    }
  },

  updateProfile: async (updates: Partial<User>) => {
    try {
      const { user } = get();
      if (!user) throw new Error('No user logged in');

      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id);

      if (error) throw error;

      set({ user: { ...user, ...updates } });
      toast.success('Profile updated successfully!');
    } catch (error) {
      const message = handleSupabaseError(error);
      toast.error(message);
      throw error;
    }
  },
}));

// Initialize auth state
supabase.auth.onAuthStateChange(async (event, session) => {
  console.log('Auth state changed:', event, session?.user?.email);
  
  if (event === 'SIGNED_IN' && session?.user) {
    // Fetch user profile
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', session.user.id)
      .single();

    if (profile) {
      useAuthStore.setState({
        user: { ...profile, email: session.user.email! },
        session,
        loading: false,
      });
    } else {
      // Create profile if it doesn't exist
      const username = session.user.user_metadata?.username || session.user.email?.split('@')[0] || 'user';
      const { error } = await supabase
        .from('profiles')
        .insert({
          id: session.user.id,
          username,
          points: 0,
          level: 1,
        });

      if (!error) {
        const { data: newProfile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (newProfile) {
          useAuthStore.setState({
            user: { ...newProfile, email: session.user.email! },
            session,
            loading: false,
          });
        }
      }
    }
  } else if (event === 'SIGNED_OUT') {
    useAuthStore.setState({
      user: null,
      session: null,
      loading: false,
    });
  } else {
    useAuthStore.setState({ loading: false });
  }
});