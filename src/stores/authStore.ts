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

      if (data.user && data.session) {
        // Set session immediately for faster UI response
        set({ session: data.session, loading: false });
        
        // Fetch profile in background
        try {
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', data.user.id)
            .single();

          if (profile) {
            set({
              user: { ...profile, email: data.user.email! },
              session: data.session,
              loading: false,
            });
            toast.success('Welcome back!');
          } else if (profileError?.code === 'PGRST116') {
            // Profile doesn't exist, create it
            const username = data.user.user_metadata?.username || data.user.email?.split('@')[0] || 'user';
            const { error: createError } = await supabase
              .from('profiles')
              .insert({
                id: data.user.id,
                username,
                points: 0,
                level: 1,
              });
            
            if (!createError) {
              // Fetch the newly created profile
              const { data: newProfile } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', data.user.id)
                .single();
              
              if (newProfile) {
                set({
                  user: { ...newProfile, email: data.user.email! },
                  session: data.session,
                  loading: false,
                });
                toast.success('Welcome to RhymeRumble!');
              }
            }
          }
        } catch (profileError) {
          console.error('Profile fetch error:', profileError);
          // Continue with basic user info even if profile fails
          const fallbackUsername = data.user.user_metadata?.username || data.user.email?.split('@')[0] || 'poet';
          set({
            user: {
              id: data.user.id,
              email: data.user.email!,
              username: fallbackUsername,
              points: 0,
              level: 1,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            },
            session: data.session,
            loading: false,
          });
          toast.success('Welcome back!');
        }
      }
    } catch (error) {
      set({ loading: false });
      const message = handleSupabaseError(error);
      toast.error(message);
      throw error;
    }
  },

  signUp: async (email: string, password: string, username: string) => {
    try {
      // First check if username is available (with timeout)
      const usernameCheckPromise = supabase
        .from('profiles')
        .select('username')
        .eq('username', username)
        .single();

      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Username check timeout')), 5000)
      );

      try {
        const { data: existingUser } = await Promise.race([usernameCheckPromise, timeoutPromise]) as any;
        if (existingUser) {
          throw new Error('Username is already taken');
        }
      } catch (error: any) {
        if (error.message !== 'Username check timeout' && error.code !== 'PGRST116') {
          throw error;
        }
        // If timeout or no existing user, continue with signup
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
        // Create profile asynchronously
        const createProfile = async () => {
          try {
            await supabase
              .from('profiles')
              .insert({
                id: data.user!.id,
                username,
                points: 0,
                level: 1,
              });
          } catch (error) {
            console.error('Profile creation error:', error);
          }
        };

        // Don't wait for profile creation
        createProfile();

        // If user is immediately confirmed (no email verification required)
        if (data.session) {
          set({
            user: {
              id: data.user.id,
              email: data.user.email!,
              username,
              points: 0,
              level: 1,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            },
            session: data.session,
            loading: false,
          });
          toast.success('🎉 Welcome to RhymeRumble! Your poetry journey begins now!');
        } else {
          set({ loading: false });
          toast.success('Account created successfully! You can now sign in.');
        }
      }
    } catch (error) {
      set({ loading: false });
      const message = handleSupabaseError(error);
      toast.error(message);
      throw error;
    }
  },

  signOut: async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      set({ user: null, session: null, loading: false });
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
      const currentDomain = window.location.origin;
      
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${currentDomain}/auth?mode=reset-password`,
      });

      if (error) throw error;
      toast.success('Password reset email sent! Check your inbox and follow the instructions to reset your password.');
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

// Optimized auth state initialization
let authInitialized = false;

supabase.auth.onAuthStateChange(async (event, session) => {
  console.log('Auth state changed:', event, session?.user?.email);
  
  if (event === 'SIGNED_IN' && session?.user) {
    // Set session immediately
    useAuthStore.setState({
      session,
      loading: false,
    });

    // Fetch profile with increased timeout
    const profilePromise = supabase
      .from('profiles')
      .select('*')
      .eq('id', session.user.id)
      .single();

    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Profile fetch timeout')), 30000)
    );

    try {
      const { data: profile } = await Promise.race([profilePromise, timeoutPromise]) as any;
      
      if (profile) {
        useAuthStore.setState({
          user: { ...profile, email: session.user.email! },
          session,
          loading: false,
        });
      } else {
        // Create basic user object if profile fetch fails
        const fallbackUsername = session.user.user_metadata?.username || session.user.email?.split('@')[0] || 'poet';
        useAuthStore.setState({
          user: {
            id: session.user.id,
            email: session.user.email!,
            username: fallbackUsername,
            points: 0,
            level: 1,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
          session,
          loading: false,
        });

        // Try to create profile in background
        try {
          await supabase
            .from('profiles')
            .insert({
              id: session.user.id,
              username: fallbackUsername,
              points: 0,
              level: 1,
            });
        } catch (error) {
          console.error('Background profile creation failed:', error);
        }
      }
    } catch (error) {
      console.error('Profile fetch error:', error);
      // Fallback to basic user info
      const fallbackUsername = session.user.user_metadata?.username || session.user.email?.split('@')[0] || 'poet';
      useAuthStore.setState({
        user: {
          id: session.user.id,
          email: session.user.email!,
          username: fallbackUsername,
          points: 0,
          level: 1,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        session,
        loading: false,
      });
    }
  } else if (event === 'SIGNED_OUT') {
    useAuthStore.setState({
      user: null,
      session: null,
      loading: false,
    });
  } else if (!authInitialized) {
    // Initial load
    useAuthStore.setState({ loading: false });
    authInitialized = true;
  }
});