import React, { useState } from 'react';
import { Users, UserPlus, Send, MessageCircle, Heart, Award } from 'lucide-react';

interface SocialHubProps {
  currentUser: any;
}

export default function SocialHub({ currentUser }: SocialHubProps) {
  const [activeTab, setActiveTab] = useState<'friends' | 'discover' | 'activity'>('friends');

  // Mock data
  const mockFriends = [
    { id: '1', username: 'PoetMaster', status: 'online', lastPoem: 'Fire and Ice', points: 2450 },
    { id: '2', username: 'VerseCrafter', status: 'offline', lastPoem: 'Ocean Dreams', points: 2120 },
    { id: '3', username: 'RhymeWarrior', status: 'online', lastPoem: 'Time\'s Echo', points: 1890 },
  ];

  const mockSuggestions = [
    { id: '4', username: 'WordWeaver', reason: 'Similar writing style', points: 1650, mutualFriends: 2 },
    { id: '5', username: 'SoulScriber', reason: 'Competed in same battles', points: 1420, mutualFriends: 1 },
    { id: '6', username: 'MelodyMaker', reason: 'Active in similar themes', points: 1280, mutualFriends: 3 },
  ];

  const mockActivity = [
    { id: '1', user: 'PoetMaster', action: 'won a battle', target: 'Fire: Friend or Foe', time: '2 hours ago', icon: '🏆' },
    { id: '2', user: 'VerseCrafter', action: 'liked your poem', target: 'Ocean Dreams', time: '4 hours ago', icon: '❤️' },
    { id: '3', user: 'RhymeWarrior', action: 'started following you', target: '', time: '6 hours ago', icon: '👥' },
    { id: '4', user: 'WordWeaver', action: 'created a new battle', target: 'Dreams: Escape or Reality', time: '8 hours ago', icon: '⚔️' },
  ];

  const tabs = [
    { id: 'friends' as const, label: 'Friends', icon: Users, count: mockFriends.length },
    { id: 'discover' as const, label: 'Discover', icon: UserPlus, count: mockSuggestions.length },
    { id: 'activity' as const, label: 'Activity', icon: MessageCircle, count: mockActivity.length },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Social Hub</h1>
        <p className="text-gray-600">Connect with fellow poets and build your community</p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center mb-8">
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
          {tabs.map(({ id, label, icon: Icon, count }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors relative ${
                activeTab === id
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{label}</span>
              {count > 0 && (
                <span className="bg-indigo-600 text-white text-xs rounded-full px-2 py-0.5 ml-1">
                  {count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Friends Tab */}
      {activeTab === 'friends' && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockFriends.map((friend) => (
            <div key={friend.id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="h-12 w-12 bg-indigo-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold">
                        {friend.username.charAt(0)}
                      </span>
                    </div>
                    <div className={`absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-white ${
                      friend.status === 'online' ? 'bg-green-400' : 'bg-gray-400'
                    }`}></div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{friend.username}</h3>
                    <p className="text-sm text-gray-600">{friend.points} points</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 text-gray-400 hover:text-indigo-600 transition-colors">
                    <MessageCircle className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                    <Heart className="h-5 w-5" />
                  </button>
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-sm text-gray-600">Latest poem:</p>
                <p className="font-medium text-gray-900">"{friend.lastPoem}"</p>
              </div>
              <div className="mt-4 flex space-x-2">
                <button className="flex-1 bg-indigo-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-indigo-700 transition-colors flex items-center justify-center space-x-1">
                  <Send className="h-4 w-4" />
                  <span>Invite to Battle</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Discover Tab */}
      {activeTab === 'discover' && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockSuggestions.map((suggestion) => (
            <div key={suggestion.id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="h-12 w-12 bg-emerald-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold">
                      {suggestion.username.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{suggestion.username}</h3>
                    <p className="text-sm text-gray-600">{suggestion.points} points</p>
                  </div>
                </div>
                <UserPlus className="h-5 w-5 text-gray-400" />
              </div>
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">Suggested because:</p>
                <p className="text-sm font-medium text-gray-900">{suggestion.reason}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {suggestion.mutualFriends} mutual friends
                </p>
              </div>
              <div className="flex space-x-2">
                <button className="flex-1 bg-emerald-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-emerald-700 transition-colors">
                  Add Friend
                </button>
                <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Activity Tab */}
      {activeTab === 'activity' && (
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {mockActivity.map((activity) => (
              <div key={activity.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
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

      {/* Stats Card */}
      <div className="mt-8 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-6 text-white">
        <h3 className="text-lg font-semibold mb-4">Your Social Stats</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold">{mockFriends.length}</p>
            <p className="text-purple-200">Friends</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">8</p>
            <p className="text-purple-200">Battles Together</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">24</p>
            <p className="text-purple-200">Likes Given</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">15</p>
            <p className="text-purple-200">Invitations Sent</p>
          </div>
        </div>
      </div>
    </div>
  );
}