import React, { useState } from 'react';
import { Users, UserPlus, Send, MessageCircle, Heart, Award, Search, BarChart3, TrendingUp } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

export default function SocialPage() {
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState<'friends' | 'discover' | 'activity' | 'stats'>('friends');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data - in a real app, this would come from Supabase
  const mockFriends = [
    { 
      id: '1', 
      username: 'PoetMaster', 
      status: 'online', 
      lastPoem: 'Fire and Ice', 
      points: 2450,
      battlesWon: 15,
      battlesTogether: 8,
      mutualFriends: 5
    },
    { 
      id: '2', 
      username: 'VerseCrafter', 
      status: 'offline', 
      lastPoem: 'Ocean Dreams', 
      points: 2120,
      battlesWon: 12,
      battlesTogether: 6,
      mutualFriends: 3
    },
    { 
      id: '3', 
      username: 'RhymeWarrior', 
      status: 'online', 
      lastPoem: 'Time\'s Echo', 
      points: 1890,
      battlesWon: 10,
      battlesTogether: 4,
      mutualFriends: 7
    },
  ];

  const mockSuggestions = [
    { 
      id: '4', 
      username: 'WordWeaver', 
      reason: 'Similar writing style', 
      points: 1650, 
      mutualFriends: 2,
      commonThemes: ['Fire', 'Time'],
      similarity: 85
    },
    { 
      id: '5', 
      username: 'SoulScriber', 
      reason: 'Competed in same battles', 
      points: 1420, 
      mutualFriends: 1,
      commonThemes: ['Ocean', 'Dreams'],
      similarity: 78
    },
    { 
      id: '6', 
      username: 'MelodyMaker', 
      reason: 'Active in similar themes', 
      points: 1280, 
      mutualFriends: 3,
      commonThemes: ['Fire', 'Ocean'],
      similarity: 92
    },
  ];

  // Enhanced activity with filtering
  const mockActivity = [
    { 
      id: '1', 
      user: 'PoetMaster', 
      action: 'liked your poem', 
      target: 'Flames of Hope', 
      time: '2 hours ago', 
      icon: '❤️',
      type: 'like'
    },
    { 
      id: '2', 
      user: 'VerseCrafter', 
      action: 'accepted your friend request', 
      target: '', 
      time: '4 hours ago', 
      icon: '👥',
      type: 'friend'
    },
    { 
      id: '3', 
      user: 'System', 
      action: 'You won the battle', 
      target: 'Fire: Friend or Foe', 
      time: '6 hours ago', 
      icon: '🏆',
      type: 'battle'
    },
    { 
      id: '4', 
      user: 'RhymeWarrior', 
      action: 'liked your poem', 
      target: 'Ocean Whispers', 
      time: '8 hours ago', 
      icon: '❤️',
      type: 'like'
    },
  ];

  // Filter suggestions based on search
  const filteredSuggestions = mockSuggestions.filter(suggestion =>
    suggestion.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const tabs = [
    { id: 'friends' as const, label: 'Friends', icon: Users, count: mockFriends.length },
    { id: 'discover' as const, label: 'Discover', icon: UserPlus, count: filteredSuggestions.length },
    { id: 'activity' as const, label: 'Activity', icon: MessageCircle, count: mockActivity.length },
    { id: 'stats' as const, label: 'Stats', icon: BarChart3, count: 0 },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
          Social Hub
        </h1>
        <p className="text-gray-600 text-lg">Connect with fellow poets and build your community</p>
      </div>

      {/* Enhanced Tabs */}
      <div className="flex justify-center mb-8">
        <div className="flex space-x-2 bg-white p-2 rounded-2xl shadow-2xl border border-gray-200">
          {tabs.map(({ id, label, icon: Icon, count }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 transform hover:scale-105 relative ${
                activeTab === id
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/50 scale-105'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
              style={{
                transform: activeTab === id ? 'translateY(-2px)' : 'translateY(0)',
                boxShadow: activeTab === id ? '0 10px 25px rgba(99, 102, 241, 0.3)' : 'none'
              }}
            >
              <Icon className="h-4 w-4" />
              <span>{label}</span>
              {count > 0 && id !== 'stats' && (
                <span className={`text-xs rounded-full px-2 py-0.5 ml-1 ${
                  activeTab === id ? 'bg-white/20' : 'bg-indigo-600 text-white'
                }`}>
                  {count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Friends Tab */}
      {activeTab === 'friends' && (
        <div className="space-y-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Friends ({mockFriends.length})</h2>
            <p className="text-gray-600">Connect and battle with your poetry companions</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockFriends.map((friend, index) => (
              <div 
                key={friend.id} 
                className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 animate-slideInUp border border-gray-100"
                style={{ 
                  animationDelay: `${index * 0.1}s`,
                  boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <div className="h-14 w-14 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                        <span className="text-white font-bold text-lg">
                          {friend.username.charAt(0)}
                        </span>
                      </div>
                      <div className={`absolute -bottom-1 -right-1 h-5 w-5 rounded-full border-3 border-white shadow-lg ${
                        friend.status === 'online' ? 'bg-green-400' : 'bg-gray-400'
                      }`}></div>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg">{friend.username}</h3>
                      <p className="text-sm text-gray-600">{friend.points} points</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-2 text-gray-400 hover:text-indigo-600 transition-colors transform hover:scale-110">
                      <MessageCircle className="h-5 w-5" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-red-500 transition-colors transform hover:scale-110">
                      <Heart className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4 mb-4">
                  <p className="text-sm text-gray-600 mb-1">Latest poem:</p>
                  <p className="font-semibold text-gray-900">"{friend.lastPoem}"</p>
                  <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span>Battles together: {friend.battlesTogether}</span>
                    <span>Wins: {friend.battlesWon}</span>
                  </div>
                </div>
                
                <Button className="w-full" size="sm">
                  <Send className="h-4 w-4 mr-2" />
                  Invite to Battle
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Enhanced Discover Tab */}
      {activeTab === 'discover' && (
        <div className="space-y-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Discover Poets</h2>
            <p className="text-gray-600">Find poets with similar styles and interests</p>
          </div>
          
          <div className="max-w-md mx-auto mb-8">
            <Input
              placeholder="Search by username..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              icon={<Search className="h-5 w-5 text-gray-400" />}
            />
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSuggestions.map((suggestion, index) => (
              <div 
                key={suggestion.id} 
                className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 animate-slideInUp border border-gray-100"
                style={{ 
                  animationDelay: `${index * 0.1}s`,
                  boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="h-14 w-14 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-white font-bold text-lg">
                        {suggestion.username.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg">{suggestion.username}</h3>
                      <p className="text-sm text-gray-600">{suggestion.points} points</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-emerald-600">{suggestion.similarity}% match</div>
                    <UserPlus className="h-5 w-5 text-gray-400 mx-auto mt-1" />
                  </div>
                </div>
                
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">Suggested because:</p>
                  <p className="text-sm font-semibold text-gray-900 mb-2">{suggestion.reason}</p>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {suggestion.commonThemes.map((theme, i) => (
                      <span key={i} className="px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs">
                        {theme}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500">
                    {suggestion.mutualFriends} mutual friends
                  </p>
                </div>
                
                <div className="flex space-x-2">
                  <Button className="flex-1" size="sm">
                    Add Friend
                  </Button>
                  <Button variant="outline" size="sm" className="px-3">
                    View
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Enhanced Activity Tab */}
      {activeTab === 'activity' && (
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <div className="px-8 py-6 bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
            <p className="text-sm text-gray-600 mt-1">Your personalized activity feed</p>
          </div>
          <div className="divide-y divide-gray-100">
            {mockActivity.map((activity, index) => (
              <div 
                key={activity.id} 
                className="px-8 py-6 hover:bg-gray-50 transition-all duration-300 transform hover:scale-[1.01] animate-slideInLeft"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="flex items-center space-x-4">
                  <div className="text-3xl transform hover:scale-110 transition-all duration-300">
                    {activity.icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-900">
                      <span className="font-bold">{activity.user}</span>
                      <span className="ml-1">{activity.action}</span>
                      {activity.target && (
                        <span className="ml-1 font-semibold text-indigo-600">"{activity.target}"</span>
                      )}
                    </p>
                    <p className="text-sm text-gray-500">{activity.time}</p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    activity.type === 'like' ? 'bg-red-100 text-red-800' :
                    activity.type === 'friend' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {activity.type}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* New Stats Tab */}
      {activeTab === 'stats' && (
        <div className="space-y-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Social Statistics</h2>
            <p className="text-gray-600">Track your social engagement and growth</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl shadow-xl p-6 text-center transform hover:scale-105 transition-all duration-300 border border-gray-100">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-4 rounded-full w-fit mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <p className="text-3xl font-bold text-gray-900">{mockFriends.length}</p>
              <p className="text-gray-600">Total Friends</p>
            </div>
            
            <div className="bg-white rounded-2xl shadow-xl p-6 text-center transform hover:scale-105 transition-all duration-300 border border-gray-100">
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-4 rounded-full w-fit mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <p className="text-3xl font-bold text-gray-900">24</p>
              <p className="text-gray-600">Battles Together</p>
            </div>
            
            <div className="bg-white rounded-2xl shadow-xl p-6 text-center transform hover:scale-105 transition-all duration-300 border border-gray-100">
              <div className="bg-gradient-to-r from-red-500 to-pink-600 p-4 rounded-full w-fit mx-auto mb-4">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <p className="text-3xl font-bold text-gray-900">156</p>
              <p className="text-gray-600">Total Likes Given</p>
            </div>
            
            <div className="bg-white rounded-2xl shadow-xl p-6 text-center transform hover:scale-105 transition-all duration-300 border border-gray-100">
              <div className="bg-gradient-to-r from-purple-500 to-violet-600 p-4 rounded-full w-fit mx-auto mb-4">
                <Send className="h-8 w-8 text-white" />
              </div>
              <p className="text-3xl font-bold text-gray-900">42</p>
              <p className="text-gray-600">Invitations Sent</p>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Social Growth</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Friend Requests Sent</span>
                <span className="font-bold text-gray-900">12</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Friend Requests Received</span>
                <span className="font-bold text-gray-900">8</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Profile Views</span>
                <span className="font-bold text-gray-900">89</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Collaboration Invites</span>
                <span className="font-bold text-gray-900">15</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}