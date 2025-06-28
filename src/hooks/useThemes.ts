import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase, handleSupabaseError } from '../lib/supabase';
import { Theme } from '../types';
import toast from 'react-hot-toast';

export const useThemes = () => {
  return useQuery({
    queryKey: ['themes'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('themes')
        .select(`
          *,
          poems(count),
          profiles!themes_created_by_fkey(username)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      return data.map((theme: any) => ({
        ...theme,
        total_poems: theme.poems[0]?.count || 0,
        participants: 0, // This would need a more complex query
      })) as Theme[];
    },
  });
};

export const useCreateTheme = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (themeData: {
      title: string;
      description: string;
      duality_option_1: string;
      duality_option_2: string;
      created_by: string;
      end_date?: string;
    }) => {
      const { data, error } = await supabase
        .from('themes')
        .insert(themeData)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['themes'] });
      toast.success('Theme created successfully!');
    },
    onError: (error) => {
      const message = handleSupabaseError(error);
      toast.error(message);
    },
  });
};