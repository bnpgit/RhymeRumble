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

        if (profileError) throw profileError;

        set({
          user: { ...profile, email: data.user.email! },
          session: data.session,
        });

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
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        // Create user profile
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: data.user.id,
            username,
            points: 0,
            level: 1,
          });

        if (profileError) throw profileError;

        toast.success('Account created successfully! Please check your email to verify your account.');
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
  const { user, loading } = useAuthStore.getState();

  if (event === 'SIGNED_IN' && session?.user) {
    if (!user) {
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