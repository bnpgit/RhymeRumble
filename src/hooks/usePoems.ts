import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase, handleSupabaseError } from '../lib/supabase';
import { Poem } from '../types';
import toast from 'react-hot-toast';

export const usePoems = (themeId?: string) => {
  return useQuery({
    queryKey: ['poems', themeId],
    queryFn: async () => {
      let query = supabase
        .from('poems')
        .select(`
          *,
          profiles!poems_author_id_fkey(username, avatar_url)
        `)
        .order('created_at', { ascending: false });

      if (themeId) {
        query = query.eq('theme_id', themeId);
      }

      const { data, error } = await query;

      if (error) throw error;

      // Get current user to check likes
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user && data) {
        // Get user's likes for these poems
        const poemIds = data.map(poem => poem.id);
        const { data: likes } = await supabase
          .from('poem_likes')
          .select('poem_id')
          .eq('user_id', user.id)
          .in('poem_id', poemIds);

        const likedPoemIds = new Set(likes?.map(like => like.poem_id) || []);

        return data.map((poem: any) => ({
          ...poem,
          author: poem.profiles,
          is_liked: likedPoemIds.has(poem.id),
        })) as Poem[];
      }

      return data.map((poem: any) => ({
        ...poem,
        author: poem.profiles,
        is_liked: false,
      })) as Poem[];
    },
  });
};

export const useCreatePoem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (poemData: {
      theme_id: string;
      author_id: string;
      title: string;
      content: string;
      side: 'option_1' | 'option_2' | 'neutral';
    }) => {
      const { data, error } = await supabase
        .from('poems')
        .insert(poemData)
        .select(`
          *,
          profiles!poems_author_id_fkey(username, avatar_url)
        `)
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (data, variables) => {
      // Invalidate and refetch poems for this theme
      queryClient.invalidateQueries({ queryKey: ['poems', variables.theme_id] });
      queryClient.invalidateQueries({ queryKey: ['poems'] });
      queryClient.invalidateQueries({ queryKey: ['themes'] });
      
      // Add the new poem to the cache immediately for better UX
      queryClient.setQueryData(['poems', variables.theme_id], (oldData: any) => {
        if (!oldData) return [{ ...data, author: data.profiles, is_liked: false }];
        return [{ ...data, author: data.profiles, is_liked: false }, ...oldData];
      });
      
      toast.success('🎉 Your poem has been published! Everyone can now read it.');
    },
    onError: (error) => {
      const message = handleSupabaseError(error);
      toast.error(message);
    },
  });
};

export const useLikePoem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ poemId, userId, isLiked }: {
      poemId: string;
      userId: string;
      isLiked: boolean;
    }) => {
      if (isLiked) {
        // Unlike
        const { error } = await supabase
          .from('poem_likes')
          .delete()
          .eq('poem_id', poemId)
          .eq('user_id', userId);

        if (error) throw error;

        // Decrement likes count
        const { error: updateError } = await supabase
          .from('poems')
          .update({ likes_count: supabase.sql`likes_count - 1` })
          .eq('id', poemId);

        if (updateError) throw updateError;
      } else {
        // Like
        const { error } = await supabase
          .from('poem_likes')
          .insert({ poem_id: poemId, user_id: userId });

        if (error) throw error;

        // Increment likes count
        const { error: updateError } = await supabase
          .from('poems')
          .update({ likes_count: supabase.sql`likes_count + 1` })
          .eq('id', poemId);

        if (updateError) throw updateError;
      }
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['poems'] });
    },
    onError: (error) => {
      const message = handleSupabaseError(error);
      toast.error(message);
    },
  });
};