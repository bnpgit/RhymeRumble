import React, { useState } from 'react';
import { Users, UserPlus, Send, MessageCircle, Heart, Award, Search, BarChart3, TrendingUp, Coffee, Sparkles } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

export default function SocialPage() {
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState<'friends' | 'discover' | 'activity' | 'stats'>('friends');
  const [searchTerm, setSearchTerm] = useState('');

  const tabs = [
    { id: 'friends' as const, label: 'Friends', icon: Users, count: 0, color: 'from-blue-500 to-indigo-600' },
    { id: 'discover' as const, label: 'Discover', icon: UserPlus, count: 0, color: 'from-green-500 to-emerald-600' },
    { id: 'activity' as const, label: 'Activity', icon: MessageCircle, count: 0, color: 'from-purple-500 to-violet-600' },
    { id: 'stats' as const, label: 'Stats', icon: BarChart3, count: 0, color: 'from-orange-500 to-red-600' },
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-600 via-pink-600 to-purple-700">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-yellow-300 via-orange-300 to-red-300 bg-clip-text text-transparent mb-4 animate-float">
            Social Hub
          </h1>
          <p className="text-white/90 text-xl font-medium">Connect with fellow poets and build your community</p>
        </div>

        {/* Colorful Tabs */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-2 bg-white/20 backdrop-blur-sm p-2 rounded-2xl shadow-xl border border-white/30">
            {tabs.map(({ id, label, icon: Icon, color }) => (
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
              </button>
            ))}
          </div>
        </div>

        {/* Friends Tab */}
        {activeTab === 'friends' && (
          <EmptyState
            icon={Users}
            title="No Friends Yet"
            description="Start connecting with fellow poets! Your friends will appear here once you begin building your poetry community."
            actionText="Discover Poets"
            onAction={() => setActiveTab('discover')}
          />
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
            
            <EmptyState
              icon={Coffee}
              title="Poets Will Appear Here"
              description="As more poets join RhymeRumble, you'll discover amazing writers with similar interests and styles. Check back soon!"
            />
          </div>
        )}

        {/* Activity Tab */}
        {activeTab === 'activity' && (
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-white/50">
            <div className="px-8 py-6 bg-gradient-to-r from-purple-500 to-violet-600 text-white">
              <h2 className="text-xl font-bold">Recent Activity</h2>
              <p className="text-sm text-purple-100 mt-1">Your personalized activity feed</p>
            </div>
            <div className="p-8">
              <EmptyState
                icon={Sparkles}
                title="Your Activity Feed Awaits"
                description="Once you start writing poems, liking content, and making friends, your activity will appear here. Start your poetry journey!"
                actionText="Write Your First Poem"
                onAction={() => window.location.href = '/dashboard'}
              />
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
                <p className="text-4xl font-bold">0</p>
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
                <p className="text-4xl font-bold">0</p>
                <p className="text-purple-100 font-medium">Invitations Sent</p>
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
      </div>
    </div>
  );
}