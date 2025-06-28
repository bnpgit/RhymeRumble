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

      return data.map((poem: any) => ({
        ...poem,
        author: poem.profiles,
      })) as Poem[];
    },
    enabled: !!themeId,
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
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['poems', variables.theme_id] });
      queryClient.invalidateQueries({ queryKey: ['themes'] });
      toast.success('Poem submitted successfully!');
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
        const { error: updateError } = await supabase.rpc('decrement_likes', {
          poem_id: poemId,
        });

        if (updateError) throw updateError;
      } else {
        // Like
        const { error } = await supabase
          .from('poem_likes')
          .insert({ poem_id: poemId, user_id: userId });

        if (error) throw error;

        // Increment likes count
        const { error: updateError } = await supabase.rpc('increment_likes', {
          poem_id: poemId,
        });

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