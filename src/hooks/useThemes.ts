import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase, handleSupabaseError } from '../lib/supabase';
import { Theme } from '../types';
import { mockThemes } from '../lib/mockData';
import toast from 'react-hot-toast';

export const useThemes = () => {
  return useQuery({
    queryKey: ['themes'],
    queryFn: async () => {
      try {
        // Get themes with poem counts and participant counts
        const { data, error } = await supabase
          .from('themes')
          .select(`
            *,
            poems(count),
            profiles!themes_created_by_fkey(username)
          `)
          .order('created_at', { ascending: false });

        if (error) {
          console.warn('Supabase themes query failed, using mock data:', error);
          return mockThemes;
        }

        if (!data || data.length === 0) {
          console.log('No themes found in database, using mock data');
          return mockThemes;
        }

        // Calculate participants and total poems for each theme
        const themesWithStats = await Promise.all(
          data.map(async (theme: any) => {
            // Get unique participants count
            const { data: participantsData, error: participantsError } = await supabase
              .from('poems')
              .select('author_id')
              .eq('theme_id', theme.id);

            if (participantsError) {
              console.error('Error fetching participants:', participantsError);
            }

            const uniqueParticipants = participantsData 
              ? new Set(participantsData.map(p => p.author_id)).size 
              : 0;

            return {
              ...theme,
              total_poems: theme.poems[0]?.count || 0,
              participants: uniqueParticipants,
            };
          })
        );

        // Sort by popularity (participants count) for active themes, then by creation date
        return themesWithStats.sort((a, b) => {
          if (a.is_active && b.is_active) {
            // Both active: sort by participants (popularity), then by total poems
            if (b.participants !== a.participants) {
              return b.participants - a.participants;
            }
            return b.total_poems - a.total_poems;
          }
          if (a.is_active && !b.is_active) return -1;
          if (!a.is_active && b.is_active) return 1;
          // Both inactive: sort by creation date
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        }) as Theme[];
      } catch (error) {
        console.warn('Error fetching themes, using mock data:', error);
        return mockThemes;
      }
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
      toast.success('🎉 Battle theme created successfully! Let the poetry wars begin!');
    },
    onError: (error) => {
      const message = handleSupabaseError(error);
      toast.error(message);
    },
  });
};