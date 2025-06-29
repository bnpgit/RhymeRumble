import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Users, UserPlus, Send, MessageCircle, Heart, Award, Search, BarChart3, TrendingUp, Coffee, Sparkles, Bell, Eye } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import { supabase } from '../lib/supabase';
import { useFriendships, useFriendRequests, useSendFriendRequest } from '../hooks/useFriendships';
import { mockActivity } from '../lib/mockData';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import FloatingBubbles from '../components/ui/FloatingBubbles';
import UserProfileModal from '../components/profile/UserProfileModal';
import FriendRequestsModal from '../components/social/FriendRequestsModal';
import { User } from '../types';

export default function SocialPage() {
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState<'friends' | 'discover' | 'activity' | 'stats'>('friends');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showFriendRequests, setShowFriendRequests] = useState(false);

  // Fetch friendships and friend requests
  const { data: friendships, isLoading: friendshipsLoading } = useFriendships(user?.id);
  const { data: friendRequests, isLoading: requestsLoading } = useFriendRequests(user?.id);
  const sendFriendRequest = useSendFriendRequest();

  // Fetch all profiles for discovery
  const { data: allProfiles, isLoading: profilesLoading } = useQuery({
    queryKey: ['all-profiles'],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .neq('id', user?.id || '');

        if (error) throw error;
        return data as User[];
      } catch (error) {
        console.warn('Error fetching profiles:', error);
        return [];
      }
    },
    enabled: !!user,
  });

  const handleSendFriendRequest = (friendId: string) => {
    if (!user) return;
    sendFriendRequest.mutate({
      userId: user.id,
      friendId
    });
  };

  const handleViewProfile = (profile: User) => {
    setSelectedUser(profile);
  };

  // Filter out existing friends and pending requests from discovery
  const getFilteredProfiles = () => {
    if (!allProfiles) return [];
    
    const friendIds = new Set(friendships?.map(f => 
      f.user_id === user?.id ? f.friend_id : f.user_id
    ) || []);
    
    const sentRequestIds = new Set(friendRequests?.sent?.map(r => r.friend_id) || []);
    const receivedRequestIds = new Set(friendRequests?.received?.map(r => r.user_id) || []);
    
    return allProfiles.filter(profile => 
      !friendIds.has(profile.id) && 
      !sentRequestIds.has(profile.id) && 
      !receivedRequestIds.has(profile.id) &&
      profile.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const filteredProfiles = getFilteredProfiles();

  const tabs = [
    { 
      id: 'friends' as const, 
      label: 'Friends', 
      icon: Users, 
      count: friendships?.length || 0, 
      color: 'from-blue-500 to-indigo-600' 
    },
    { 
      id: 'discover' as const, 
      label: 'Discover', 
      icon: UserPlus, 
      count: filteredProfiles.length, 
      color: 'from-green-500 to-emerald-600' 
    },
    { 
      id: 'activity' as const, 
      label: 'Activity', 
      icon: MessageCircle, 
      count: mockActivity.length, 
      color: 'from-purple-500 to-violet-600' 
    },
    { 
      id: 'stats' as const, 
      label: 'Stats', 
      icon: BarChart3, 
      count: 0, 
      color: 'from-orange-500 to-red-600' 
    },
  ];

  const EmptyState = ({ icon: Icon, title, description, actionText, onAction }: {
    icon: React.ElementType;
    title: string;
    description: string;
    actionText?: string;
    onAction?: () => void;
  }) => (
    <div className="text-center py-16">
      <div className="bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6 shadow-xl">
        <Icon className="h-12 w-12 text-white" />
      </div>
      <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
      <p className="text-white/80 text-lg mb-6 max-w-md mx-auto">{description}</p>
      {actionText && onAction && (
        <Button
          onClick={onAction}
          className="bg-gradient-to-r from-emerald-400 to-teal-500 hover:from-emerald-500 hover:to-teal-600 text-white border-0 font-bold px-6 py-3 shadow-lg"
        >
          {actionText}
        </Button>
      )}
    </div>
  );

  const isLoading = friendshipsLoading || profilesLoading || requestsLoading;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-600 via-pink-600 to-purple-700 flex items-center justify-center relative overflow-hidden">
        <FloatingBubbles colors={['rgba(255, 182, 193, 0.6)', 'rgba(221, 160, 221, 0.6)', 'rgba(255, 192, 203, 0.6)']} />
        <div className="text-center relative z-10">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-white text-lg">Loading social hub...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-600 via-pink-600 to-purple-700 relative overflow-hidden">
      {/* Animated Floating Bubbles Background */}
      <FloatingBubbles colors={['rgba(255, 182, 193, 0.6)', 'rgba(221, 160, 221, 0.6)', 'rgba(255, 192, 203, 0.6)']} />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-yellow-300 via-orange-300 to-red-300 bg-clip-text text-transparent mb-4 animate-float">
            Social Hub
          </h1>
          <p className="text-white/90 text-xl font-medium">Connect with fellow poets and build your community</p>
          
          {/* Friend Requests Notification */}
          {friendRequests?.received && friendRequests.received.length > 0 && (
            <div className="mt-4">
              <Button
                onClick={() => setShowFriendRequests(true)}
                className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-bold shadow-lg relative"
              >
                <Bell className="h-5 w-5 mr-2" />
                Friend Requests
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center">
                  {friendRequests.received.length}
                </span>
              </Button>
            </div>
          )}
        </div>

        {/* Colorful Tabs */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-2 bg-white/20 backdrop-blur-sm p-2 rounded-2xl shadow-xl border border-white/30">
            {tabs.map(({ id, label, icon: Icon, count, color }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl text-sm font-bold transition-all duration-200 transform hover:scale-105 ${
                  activeTab === id
                    ? `bg-gradient-to-r ${color} text-white shadow-lg scale-105`
                    : 'text-white hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
                {count > 0 && (
                  <span className="bg-white/30 text-white text-xs rounded-full px-2 py-0.5 ml-1">
                    {count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Friends Tab */}
        {activeTab === 'friends' && (
          <>
            {friendships && friendships.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {friendships.map((friendship, index) => {
                  const friend = friendship.user_id === user?.id ? friendship.friend : friendship.friend;
                  return (
                    <div
                      key={friendship.id}
                      className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-200 animate-fadeIn border border-white/50"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="relative">
                            <div className="h-12 w-12 bg-indigo-600 rounded-full flex items-center justify-center">
                              <span className="text-white font-semibold">
                                {friend?.username?.charAt(0) || 'U'}
                              </span>
                            </div>
                            <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-white bg-green-400"></div>
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{friend?.username}</h3>
                            <p className="text-sm text-gray-600">{friend?.points || 0} points</p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => friend && handleViewProfile(friend)}
                            className="p-2 text-gray-400 hover:text-indigo-600 transition-colors"
                          >
                            <Eye className="h-5 w-5" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                            <Heart className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3 mb-4">
                        <p className="text-sm text-gray-600">Bio:</p>
                        <p className="font-medium text-gray-900 text-sm">
                          {friend?.bio || 'No bio available'}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <button className="flex-1 bg-indigo-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-indigo-700 transition-colors flex items-center justify-center space-x-1">
                          <Send className="h-4 w-4" />
                          <span>Invite to Battle</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <EmptyState
                icon={Users}
                title="No Friends Yet"
                description="Start connecting with fellow poets! Your friends will appear here once you begin building your poetry community."
                actionText="Discover Poets"
                onAction={() => setActiveTab('discover')}
              />
            )}
          </>
        )}

        {/* Discover Tab */}
        {activeTab === 'discover' && (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-white mb-2">Discover Poets</h2>
              <p className="text-white/80 text-lg">Find poets with similar styles and interests</p>
            </div>
            
            <div className="max-w-md mx-auto mb-8">
              <Input
                placeholder="Search by username..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                icon={<Search className="h-5 w-5 text-gray-400" />}
                className="bg-white/90 border-white/50 shadow-lg"
              />
            </div>
            
            {filteredProfiles.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProfiles.map((profile, index) => (
                  <div
                    key={profile.id}
                    className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-200 animate-fadeIn border border-white/50"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="h-12 w-12 bg-emerald-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-semibold">
                            {profile.username.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{profile.username}</h3>
                          <p className="text-sm text-gray-600">{profile.points || 0} points</p>
                        </div>
                      </div>
                      <UserPlus className="h-5 w-5 text-gray-400" />
                    </div>
                    <div className="mb-4">
                      <p className="text-sm text-gray-600 mb-2">Bio:</p>
                      <p className="text-sm font-medium text-gray-900">
                        {profile.bio || 'No bio available'}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Level {profile.level || 1}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleSendFriendRequest(profile.id)}
                        disabled={sendFriendRequest.isPending}
                        className="flex-1 bg-emerald-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-emerald-700 transition-colors disabled:opacity-50"
                      >
                        Add Friend
                      </button>
                      <button
                        onClick={() => handleViewProfile(profile)}
                        className="px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        View Profile
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState
                icon={Coffee}
                title={searchTerm ? "No Poets Found" : "All Caught Up!"}
                description={searchTerm ? "No poets match your search. Try a different username." : "You've discovered all available poets! Check back later for new members."}
              />
            )}
          </div>
        )}

        {/* Activity Tab */}
        {activeTab === 'activity' && (
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-white/50">
            <div className="px-8 py-6 bg-gradient-to-r from-purple-500 to-violet-600 text-white">
              <h2 className="text-xl font-bold">Recent Activity</h2>
              <p className="text-sm text-purple-100 mt-1">Your personalized activity feed</p>
            </div>
            <div className="divide-y divide-gray-200">
              {mockActivity.map((activity, index) => (
                <div
                  key={activity.id}
                  className="px-8 py-6 hover:bg-gray-50 transition-colors animate-fadeIn"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center space-x-4">
                    <div className="text-2xl">{activity.icon}</div>
                    <div className="flex-1">
                      <p className="text-gray-900">
                        <span className="font-semibold">{activity.user}</span>
                        <span className="ml-1">{activity.action}</span>
                        {activity.target && (
                          <span className="ml-1 font-medium text-indigo-600">"{activity.target}"</span>
                        )}
                      </p>
                      <p className="text-sm text-gray-500">{activity.time}</p>
                    </div>
                    <div className="text-gray-400">
                      <Award className="h-5 w-5" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Stats Tab */}
        {activeTab === 'stats' && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">Your Social Statistics</h2>
              <p className="text-white/80 text-lg">Track your social engagement and growth</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-xl p-6 text-center transform hover:scale-105 transition-all duration-200 text-white">
                <div className="bg-white/20 p-4 rounded-full w-fit mx-auto mb-4">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <p className="text-4xl font-bold">{friendships?.length || 0}</p>
                <p className="text-blue-100 font-medium">Total Friends</p>
              </div>
              
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-xl p-6 text-center transform hover:scale-105 transition-all duration-200 text-white">
                <div className="bg-white/20 p-4 rounded-full w-fit mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-white" />
                </div>
                <p className="text-4xl font-bold">0</p>
                <p className="text-green-100 font-medium">Battles Together</p>
              </div>
              
              <div className="bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl shadow-xl p-6 text-center transform hover:scale-105 transition-all duration-200 text-white">
                <div className="bg-white/20 p-4 rounded-full w-fit mx-auto mb-4">
                  <Heart className="h-8 w-8 text-white" />
                </div>
                <p className="text-4xl font-bold">0</p>
                <p className="text-red-100 font-medium">Total Likes Given</p>
              </div>
              
              <div className="bg-gradient-to-br from-purple-500 to-violet-600 rounded-2xl shadow-xl p-6 text-center transform hover:scale-105 transition-all duration-200 text-white">
                <div className="bg-white/20 p-4 rounded-full w-fit mx-auto mb-4">
                  <Send className="h-8 w-8 text-white" />
                </div>
                <p className="text-4xl font-bold">{friendRequests?.sent?.length || 0}</p>
                <p className="text-purple-100 font-medium">Requests Sent</p>
              </div>
            </div>
            
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/50">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Social Growth Journey</h3>
              <div className="text-center py-8">
                <div className="bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-white" />
                </div>
                <p className="text-gray-600 text-lg">Your social statistics will grow as you engage with the community!</p>
              </div>
            </div>
          </div>
        )}

        {/* Modals */}
        {selectedUser && (
          <UserProfileModal
            isOpen={!!selectedUser}
            onClose={() => setSelectedUser(null)}
            user={selectedUser}
          />
        )}

        <FriendRequestsModal
          isOpen={showFriendRequests}
          onClose={() => setShowFriendRequests(false)}
        />
      </div>
    </div>
  );
}