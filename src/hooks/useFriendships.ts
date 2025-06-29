import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase, handleSupabaseError } from '../lib/supabase';
import { Friendship } from '../types';
import toast from 'react-hot-toast';

export const useFriendships = (userId?: string) => {
  return useQuery({
    queryKey: ['friendships', userId],
    queryFn: async () => {
      if (!userId) return [];
      
      try {
        const { data, error } = await supabase
          .from('friendships')
          .select(`
            *,
            profiles!friendships_friend_id_fkey(*)
          `)
          .or(`user_id.eq.${userId},friend_id.eq.${userId}`)
          .eq('status', 'accepted');

        if (error) throw error;
        
        return data.map((friendship: any) => ({
          ...friendship,
          friend: friendship.profiles
        })) as Friendship[];
      } catch (error) {
        console.error('Error fetching friendships:', error);
        return [];
      }
    },
    enabled: !!userId,
  });
};

export const useFriendRequests = (userId?: string) => {
  return useQuery({
    queryKey: ['friend-requests', userId],
    queryFn: async () => {
      if (!userId) return { sent: [], received: [] };
      
      try {
        // Get sent requests
        const { data: sentData, error: sentError } = await supabase
          .from('friendships')
          .select(`
            *,
            profiles!friendships_friend_id_fkey(*)
          `)
          .eq('user_id', userId)
          .eq('status', 'pending');

        if (sentError) throw sentError;

        // Get received requests
        const { data: receivedData, error: receivedError } = await supabase
          .from('friendships')
          .select(`
            *,
            profiles!friendships_user_id_fkey(*)
          `)
          .eq('friend_id', userId)
          .eq('status', 'pending');

        if (receivedError) throw receivedError;

        return {
          sent: sentData.map((req: any) => ({ ...req, friend: req.profiles })),
          received: receivedData.map((req: any) => ({ ...req, friend: req.profiles }))
        };
      } catch (error) {
        console.error('Error fetching friend requests:', error);
        return { sent: [], received: [] };
      }
    },
    enabled: !!userId,
  });
};

export const useSendFriendRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userId, friendId }: { userId: string; friendId: string }) => {
      // Check if friendship already exists
      const { data: existing } = await supabase
        .from('friendships')
        .select('*')
        .or(`and(user_id.eq.${userId},friend_id.eq.${friendId}),and(user_id.eq.${friendId},friend_id.eq.${userId})`)
        .single();

      if (existing) {
        if (existing.status === 'pending') {
          throw new Error('Friend request already sent');
        } else if (existing.status === 'accepted') {
          throw new Error('You are already friends');
        } else if (existing.status === 'blocked') {
          throw new Error('Cannot send friend request');
        }
      }

      const { data, error } = await supabase
        .from('friendships')
        .insert({
          user_id: userId,
          friend_id: friendId,
          status: 'pending'
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['friend-requests'] });
      queryClient.invalidateQueries({ queryKey: ['friendships'] });
      toast.success('Friend request sent!');
    },
    onError: (error: any) => {
      const message = handleSupabaseError(error);
      toast.error(message);
    },
  });
};

export const useRespondToFriendRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ requestId, action }: { requestId: string; action: 'accept' | 'decline' }) => {
      const status = action === 'accept' ? 'accepted' : 'blocked';
      
      const { data, error } = await supabase
        .from('friendships')
        .update({ status })
        .eq('id', requestId)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['friend-requests'] });
      queryClient.invalidateQueries({ queryKey: ['friendships'] });
      
      if (variables.action === 'accept') {
        toast.success('Friend request accepted!');
      } else {
        toast.success('Friend request declined');
      }
    },
    onError: (error) => {
      const message = handleSupabaseError(error);
      toast.error(message);
    },
  });
};

export const useRemoveFriend = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userId, friendId }: { userId: string; friendId: string }) => {
      const { error } = await supabase
        .from('friendships')
        .delete()
        .or(`and(user_id.eq.${userId},friend_id.eq.${friendId}),and(user_id.eq.${friendId},friend_id.eq.${userId})`);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['friend-requests'] });
      queryClient.invalidateQueries({ queryKey: ['friendships'] });
      toast.success('Friend removed');
    },
    onError: (error) => {
      const message = handleSupabaseError(error);
      toast.error(message);
    },
  });
};