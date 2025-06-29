import React from 'react';
import { UserPlus, Check, X, Users } from 'lucide-react';
import { useFriendRequests, useRespondToFriendRequest } from '../../hooks/useFriendships';
import { useAuthStore } from '../../stores/authStore';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import LoadingSpinner from '../ui/LoadingSpinner';

interface FriendRequestsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FriendRequestsModal({ isOpen, onClose }: FriendRequestsModalProps) {
  const { user } = useAuthStore();
  const { data: friendRequests, isLoading } = useFriendRequests(user?.id);
  const respondToRequest = useRespondToFriendRequest();

  const handleAccept = (requestId: string) => {
    respondToRequest.mutate({
      requestId,
      action: 'accept'
    });
  };

  const handleDecline = (requestId: string) => {
    respondToRequest.mutate({
      requestId,
      action: 'decline'
    });
  };

  if (!user) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Friend Requests"
      size="md"
    >
      <div className="space-y-6">
        {/* Received Requests */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <UserPlus className="h-5 w-5 mr-2 text-indigo-600" />
            Received Requests ({friendRequests?.received?.length || 0})
          </h3>
          
          {isLoading ? (
            <div className="flex justify-center py-8">
              <LoadingSpinner size="md" />
            </div>
          ) : friendRequests?.received && friendRequests.received.length > 0 ? (
            <div className="space-y-3">
              {friendRequests.received.map((request) => (
                <div key={request.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 bg-indigo-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold">
                        {request.friend?.username?.charAt(0) || 'U'}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{request.friend?.username}</h4>
                      <p className="text-sm text-gray-600">
                        {new Date(request.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      onClick={() => handleAccept(request.id)}
                      size="sm"
                      className="bg-green-600 hover:bg-green-700"
                      disabled={respondToRequest.isPending}
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                    <Button
                      onClick={() => handleDecline(request.id)}
                      size="sm"
                      variant="outline"
                      className="text-red-600 border-red-300 hover:bg-red-50"
                      disabled={respondToRequest.isPending}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <UserPlus className="h-12 w-12 mx-auto mb-2 text-gray-300" />
              <p>No pending friend requests</p>
            </div>
          )}
        </div>

        {/* Sent Requests */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Users className="h-5 w-5 mr-2 text-gray-600" />
            Sent Requests ({friendRequests?.sent?.length || 0})
          </h3>
          
          {friendRequests?.sent && friendRequests.sent.length > 0 ? (
            <div className="space-y-3">
              {friendRequests.sent.map((request) => (
                <div key={request.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 bg-gray-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold">
                        {request.friend?.username?.charAt(0) || 'U'}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{request.friend?.username}</h4>
                      <p className="text-sm text-gray-600">
                        Sent {new Date(request.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500 bg-gray-200 px-3 py-1 rounded-full">
                    Pending
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Users className="h-12 w-12 mx-auto mb-2 text-gray-300" />
              <p>No sent requests</p>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}