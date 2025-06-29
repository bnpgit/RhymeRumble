import React from 'react';
import { User, Mail, Calendar, Award, FileText, Heart, Trophy, X } from 'lucide-react';
import { User as UserType } from '../../types';
import { usePoems } from '../../hooks/usePoems';
import { useFriendships, useFriendRequests, useSendFriendRequest, useRespondToFriendRequest, useRemoveFriend } from '../../hooks/useFriendships';
import { useAuthStore } from '../../stores/authStore';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import LoadingSpinner from '../ui/LoadingSpinner';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserType;
}

export default function UserProfileModal({ isOpen, onClose, user }: UserProfileModalProps) {
  const { user: currentUser } = useAuthStore();
  const { data: userPoems, isLoading: poemsLoading } = usePoems();
  const { data: friendships } = useFriendships(currentUser?.id);
  const { data: friendRequests } = useFriendRequests(currentUser?.id);
  const sendFriendRequest = useSendFriendRequest();
  const respondToRequest = useRespondToFriendRequest();
  const removeFriend = useRemoveFriend();

  if (!currentUser) return null;

  // Filter poems by this user
  const userPoemsFiltered = userPoems?.filter(poem => poem.author_id === user.id) || [];

  // Check friendship status
  const isFriend = friendships?.some(f => 
    (f.user_id === user.id && f.friend_id === currentUser.id) ||
    (f.friend_id === user.id && f.user_id === currentUser.id)
  );

  const sentRequest = friendRequests?.sent?.find(req => req.friend_id === user.id);
  const receivedRequest = friendRequests?.received?.find(req => req.user_id === user.id);

  const handleSendFriendRequest = () => {
    sendFriendRequest.mutate({
      userId: currentUser.id,
      friendId: user.id
    });
  };

  const handleAcceptRequest = () => {
    if (receivedRequest) {
      respondToRequest.mutate({
        requestId: receivedRequest.id,
        action: 'accept'
      });
    }
  };

  const handleDeclineRequest = () => {
    if (receivedRequest) {
      respondToRequest.mutate({
        requestId: receivedRequest.id,
        action: 'decline'
      });
    }
  };

  const handleRemoveFriend = () => {
    removeFriend.mutate({
      userId: currentUser.id,
      friendId: user.id
    });
  };

  const getFriendshipButton = () => {
    if (user.id === currentUser.id) return null;

    if (isFriend) {
      return (
        <Button
          onClick={handleRemoveFriend}
          variant="outline"
          className="text-red-600 border-red-300 hover:bg-red-50"
          disabled={removeFriend.isPending}
        >
          Remove Friend
        </Button>
      );
    }

    if (receivedRequest) {
      return (
        <div className="flex space-x-2">
          <Button
            onClick={handleAcceptRequest}
            className="bg-green-600 hover:bg-green-700"
            disabled={respondToRequest.isPending}
          >
            Accept
          </Button>
          <Button
            onClick={handleDeclineRequest}
            variant="outline"
            className="text-red-600 border-red-300 hover:bg-red-50"
            disabled={respondToRequest.isPending}
          >
            Decline
          </Button>
        </div>
      );
    }

    if (sentRequest) {
      return (
        <Button
          variant="outline"
          disabled
          className="text-gray-500"
        >
          Request Sent
        </Button>
      );
    }

    return (
      <Button
        onClick={handleSendFriendRequest}
        className="bg-indigo-600 hover:bg-indigo-700"
        disabled={sendFriendRequest.isPending}
      >
        Add Friend
      </Button>
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <div className="relative">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <div className="h-16 w-16 rounded-full bg-indigo-600 flex items-center justify-center overflow-hidden">
              {user.avatar_url ? (
                <img
                  src={user.avatar_url}
                  alt={user.username}
                  className="h-full w-full object-cover"
                />
              ) : (
                <User className="h-8 w-8 text-white" />
              )}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{user.username}</h2>
              {user.full_name && (
                <p className="text-gray-600">{user.full_name}</p>
              )}
              <div className="flex items-center space-x-4 mt-1">
                <div className="flex items-center space-x-1">
                  <Award className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm text-gray-600">Level {user.level}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Trophy className="h-4 w-4 text-indigo-500" />
                  <span className="text-sm text-gray-600">{user.points} points</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            {getFriendshipButton()}
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Bio */}
          {user.bio && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">About</h3>
              <p className="text-gray-600 leading-relaxed">{user.bio}</p>
            </div>
          )}

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 text-center">
              <FileText className="h-8 w-8 text-indigo-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{userPoemsFiltered.length}</p>
              <p className="text-sm text-gray-600">Poems Written</p>
            </div>
            <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-xl p-4 text-center">
              <Heart className="h-8 w-8 text-red-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">
                {userPoemsFiltered.reduce((acc, poem) => acc + poem.likes_count, 0)}
              </p>
              <p className="text-sm text-gray-600">Total Likes</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 text-center">
              <Trophy className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">
                {userPoemsFiltered.filter(poem => poem.likes_count > 20).length}
              </p>
              <p className="text-sm text-gray-600">Popular Poems</p>
            </div>
          </div>

          {/* Recent Poems */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Poems</h3>
            {poemsLoading ? (
              <div className="flex justify-center py-8">
                <LoadingSpinner size="md" />
              </div>
            ) : userPoemsFiltered.length > 0 ? (
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {userPoemsFiltered.slice(0, 5).map((poem) => (
                  <div key={poem.id} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">{poem.title}</h4>
                      <div className="flex items-center space-x-1">
                        <Heart className="h-4 w-4 text-red-500" />
                        <span className="text-sm text-gray-600">{poem.likes_count}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2">{poem.content}</p>
                    <p className="text-xs text-gray-500 mt-2">
                      {new Date(poem.created_at).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <FileText className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                <p>No poems written yet</p>
              </div>
            )}
          </div>

          {/* Member Since */}
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Calendar className="h-4 w-4" />
            <span>Member since {new Date(user.created_at).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </Modal>
  );
}