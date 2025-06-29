import React, { useState } from 'react';
import { Crown, Trophy, Medal, Award, User, TrendingUp, Flame, Heart, Zap, Star, Sparkles } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';

export default function LeaderboardPage() {
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState<'overall' | 'monthly' | 'battles'>('overall');

  // Enhanced leaderboard data with weighted scoring (hidden from users)
  const mockLeaders = [
    { 
      id: '1', 
      username: 'PoetMaster', 
      points: 2450, 
      level: 12, 
      battlesWon: 15, 
      poemsWritten: 67,
      totalLikes: 234,
      score: (67 * 5) + (234 * 2) + (15 * 10), // Hidden calculation
      avatar: '👑',
      trend: 'up',
      rank: 1
    },
    { 
      id: '2', 
      username: 'VerseCrafter', 
      points: 2120, 
      level: 11, 
      battlesWon: 12, 
      poemsWritten: 54,
      totalLikes: 198,
      score: (54 * 5) + (198 * 2) + (12 * 10),
      avatar: '🏆',
      trend: 'up',
      rank: 2
    },
    { 
      id: '3', 
      username: 'RhymeWarrior', 
      points: 1890, 
      level: 10, 
      battlesWon: 10, 
      poemsWritten: 48,
      totalLikes: 156,
      score: (48 * 5) + (156 * 2) + (10 * 10),
      avatar: '🥇',
      trend: 'down',
      rank: 3
    },
    { 
      id: '4', 
      username: 'WordWeaver', 
      points: 1650, 
      level: 9, 
      battlesWon: 8, 
      poemsWritten: 41,
      totalLikes: 134,
      score: (41 * 5) + (134 * 2) + (8 * 10),
      avatar: '🥈',
      trend: 'up',
      rank: 4
    },
    { 
      id: '5', 
      username: 'SoulScriber', 
      points: 1420, 
      level: 8, 
      battlesWon: 7, 
      poemsWritten: 36,
      totalLikes: 112,
      score: (36 * 5) + (112 * 2) + (7 * 10),
      avatar: '🥉',
      trend: 'stable',
      rank: 5
    },
    { 
      id: '6', 
      username: 'MelodyMaker', 
      points: 1280, 
      level: 8, 
      battlesWon: 6, 
      poemsWritten: 32,
      totalLikes: 98,
      score: (32 * 5) + (98 * 2) + (6 * 10),
      avatar: '🎵',
      trend: 'up',
      rank: 6
    },
    { 
      id: '7', 
      username: 'StanzaStorm', 
      points: 1150, 
      level: 7, 
      battlesWon: 5, 
      poemsWritten: 29,
      totalLikes: 87,
      score: (29 * 5) + (87 * 2) + (5 * 10),
      avatar: '⚡',
      trend: 'down',
      rank: 7
    },
    { 
      id: '8', 
      username: 'InkDancer', 
      points: 980, 
      level: 6, 
      battlesWon: 4, 
      poemsWritten: 25,
      totalLikes: 76,
      score: (25 * 5) + (76 * 2) + (4 * 10),
      avatar: '💃',
      trend: 'stable',
      rank: 8
    },
  ];

  // Recent battles data for Battle Wins tab
  const recentBattles = [
    {
      id: '1',
      theme: 'Fire: Friend or Foe',
      winningSide: 'Friend',
      topUser: 'PoetMaster',
      topUserLikes: 45,
      totalParticipants: 23,
      endDate: '2 days ago',
      icon: Flame,
      gradient: 'from-red-400 to-orange-500'
    },
    {
      id: '2',
      theme: 'Time: Past or Future',
      winningSide: 'Future',
      topUser: 'VerseCrafter',
      topUserLikes: 38,
      totalParticipants: 18,
      endDate: '5 days ago',
      icon: TrendingUp,
      gradient: 'from-purple-400 to-indigo-500'
    },
    {
      id: '3',
      theme: 'Ocean: Calm or Storm',
      winningSide: 'Storm',
      topUser: 'RhymeWarrior',
      topUserLikes: 42,
      totalParticipants: 31,
      endDate: '1 week ago',
      icon: Heart,
      gradient: 'from-blue-400 to-cyan-500'
    },
    {
      id: '4',
      theme: 'Dreams: Escape or Reality',
      winningSide: 'Escape',
      topUser: 'WordWeaver',
      topUserLikes: 35,
      totalParticipants: 27,
      endDate: '1 week ago',
      icon: Star,
      gradient: 'from-pink-400 to-purple-500'
    }
  ];

  // Sort leaders by score for overall and monthly (hidden calculation)
  const sortedLeaders = [...mockLeaders].sort((a, b) => b.score - a.score);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="h-6 w-6 text-yellow-400" />;
      case 2: return <Trophy className="h-6 w-6 text-gray-300" />;
      case 3: return <Medal className="h-6 w-6 text-orange-400" />;
      default: return <Award className="h-5 w-5 text-gray-400" />;
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1: return 'bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-500 shadow-xl';
      case 2: return 'bg-gradient-to-r from-gray-300 via-gray-400 to-slate-400 shadow-xl';
      case 3: return 'bg-gradient-to-r from-orange-400 via-amber-500 to-yellow-500 shadow-xl';
      default: return 'bg-gradient-to-r from-gray-100 to-gray-200';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return '📈';
      case 'down': return '📉';
      default: return '➡️';
    }
  };

  const tabs = [
    { id: 'overall' as const, label: 'Overall', icon: Crown },
    { id: 'monthly' as const, label: 'This Month', icon: TrendingUp },
    { id: 'battles' as const, label: 'Battle Wins', icon: Trophy },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-yellow-300 via-orange-300 to-red-300 bg-clip-text text-transparent mb-4 animate-float">
            Hall of Fame
          </h1>
          <p className="text-white/90 text-xl font-medium">Celebrating our most talented poets</p>
          <div className="flex justify-center mt-4">
            <div className="flex items-center space-x-2 bg-gradient-to-r from-pink-400 to-rose-500 rounded-full px-6 py-3 shadow-lg">
              <Sparkles className="h-5 w-5 text-white" />
              <span className="text-white font-semibold">Rankings update in real-time</span>
            </div>
          </div>
        </div>

        {/* Colorful Tabs */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-2 bg-white/20 backdrop-blur-sm p-2 rounded-2xl shadow-xl border border-white/30">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl text-sm font-bold transition-all duration-200 ${
                  activeTab === id
                    ? 'bg-gradient-to-r from-violet-500 to-purple-600 text-white shadow-lg transform scale-105'
                    : 'text-white hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Colorful Top 3 Podium */}
        {(activeTab === 'overall' || activeTab === 'monthly') && (
          <div className="mb-8">
            <div className="flex justify-center items-end space-x-6 mb-8">
              {/* 2nd Place */}
              <div className="text-center animate-slideInLeft">
                <div className={`${getRankColor(2)} p-4 rounded-full mb-3 inline-flex items-center justify-center`}>
                  <span className="text-2xl">{sortedLeaders[1]?.avatar}</span>
                </div>
                <div className="bg-gradient-to-br from-slate-100 to-gray-200 p-4 rounded-xl shadow-xl min-w-[120px] border-2 border-gray-300">
                  <Trophy className="h-6 w-6 text-gray-500 mx-auto mb-2" />
                  <h3 className="font-bold text-gray-900">{sortedLeaders[1]?.username}</h3>
                  <p className="text-sm text-gray-600 font-semibold">{sortedLeaders[1]?.points} pts</p>
                </div>
              </div>

              {/* 1st Place */}
              <div className="text-center animate-slideInUp">
                <div className={`${getRankColor(1)} p-6 rounded-full mb-3 inline-flex items-center justify-center transform scale-110`}>
                  <span className="text-3xl">{sortedLeaders[0]?.avatar}</span>
                </div>
                <div className="bg-gradient-to-br from-yellow-100 to-amber-200 p-6 rounded-xl shadow-2xl min-w-[140px] border-3 border-yellow-400">
                  <Crown className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                  <h3 className="font-bold text-gray-900 text-lg">{sortedLeaders[0]?.username}</h3>
                  <p className="text-gray-700 font-bold">{sortedLeaders[0]?.points} pts</p>
                  <p className="text-xs text-gray-600">Level {sortedLeaders[0]?.level}</p>
                </div>
              </div>

              {/* 3rd Place */}
              <div className="text-center animate-slideInRight">
                <div className={`${getRankColor(3)} p-4 rounded-full mb-3 inline-flex items-center justify-center`}>
                  <span className="text-2xl">{sortedLeaders[2]?.avatar}</span>
                </div>
                <div className="bg-gradient-to-br from-orange-100 to-amber-200 p-4 rounded-xl shadow-xl min-w-[120px] border-2 border-orange-400">
                  <Medal className="h-6 w-6 text-orange-600 mx-auto mb-2" />
                  <h3 className="font-bold text-gray-900">{sortedLeaders[2]?.username}</h3>
                  <p className="text-sm text-gray-600 font-semibold">{sortedLeaders[2]?.points} pts</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Battle Wins Tab Content */}
        {activeTab === 'battles' && (
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {recentBattles.map((battle, index) => {
              const IconComponent = battle.icon;
              return (
                <div
                  key={battle.id}
                  className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-6 transform hover:scale-105 transition-all duration-200 animate-fadeIn border border-white/50"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`bg-gradient-to-r ${battle.gradient} p-3 rounded-xl shadow-lg`}>
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">{battle.theme}</h3>
                        <p className="text-sm text-gray-500">{battle.endDate}</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-full text-sm font-bold shadow-lg">
                      {battle.winningSide} Won
                    </span>
                  </div>
                  
                  <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4 mb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Champion Poet</p>
                        <p className="font-bold text-gray-900">{battle.topUser}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Likes Received</p>
                        <p className="font-bold text-indigo-600 text-lg">{battle.topUserLikes}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span className="font-medium">{battle.totalParticipants} participants</span>
                    <span className="flex items-center space-x-1">
                      <Heart className="h-4 w-4 text-red-500" />
                      <span>Battle completed</span>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Colorful Full Leaderboard */}
        {(activeTab === 'overall' || activeTab === 'monthly') && (
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-white/50">
            <div className="px-6 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
              <h2 className="text-lg font-bold">Full Rankings</h2>
              <p className="text-sm text-indigo-100 mt-1">
                Rankings based on overall contribution and community engagement
              </p>
            </div>
            <div className="divide-y divide-gray-100">
              {sortedLeaders.map((leader, index) => {
                const rank = index + 1;
                const isCurrentUser = leader.id === user?.id;
                
                return (
                  <div
                    key={leader.id}
                    className={`px-6 py-4 flex items-center justify-between transform hover:scale-[1.01] transition-all duration-200 animate-fadeIn ${
                      isCurrentUser 
                        ? 'bg-gradient-to-r from-indigo-50 to-purple-50 border-l-4 border-indigo-500' 
                        : 'hover:bg-gray-50'
                    }`}
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center justify-center w-8">
                        {getRankIcon(rank)}
                      </div>
                      <div className="text-lg font-bold text-gray-400 w-8">
                        #{rank}
                      </div>
                      <div className="bg-gradient-to-r from-gray-100 to-gray-200 p-2 rounded-full shadow-sm">
                        <span className="text-lg">{leader.avatar || '👤'}</span>
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className={`font-bold ${isCurrentUser ? 'text-indigo-900' : 'text-gray-900'}`}>
                            {leader.username}
                            {isCurrentUser && <span className="ml-2 text-sm text-indigo-600 font-bold">(You)</span>}
                          </h3>
                          <span className="text-sm">{getTrendIcon(leader.trend)}</span>
                        </div>
                        <p className="text-sm text-gray-600 font-medium">Level {leader.level}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-6 text-sm text-gray-600">
                      <div className="text-center">
                        <p className="font-bold text-gray-900">{leader.points}</p>
                        <p className="font-medium">Points</p>
                      </div>
                      <div className="text-center">
                        <p className="font-bold text-gray-900">{leader.poemsWritten}</p>
                        <p className="font-medium">Poems</p>
                      </div>
                      <div className="text-center">
                        <p className="font-bold text-gray-900">{leader.totalLikes}</p>
                        <p className="font-medium">Likes</p>
                      </div>
                      <div className="text-center">
                        <p className="font-bold text-gray-900">{leader.battlesWon}</p>
                        <p className="font-medium">Wins</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Colorful Your Stats */}
        {user && (
          <div className="mt-8 bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 rounded-2xl p-6 text-white shadow-2xl">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <Sparkles className="h-5 w-5 mr-2" />
              Your Journey
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center bg-white/20 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                <p className="text-3xl font-bold">{user.points}</p>
                <p className="text-pink-100 font-medium">Total Points</p>
              </div>
              <div className="text-center bg-white/20 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                <p className="text-3xl font-bold">{user.level}</p>
                <p className="text-pink-100 font-medium">Level</p>
              </div>
              <div className="text-center bg-white/20 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                <p className="text-3xl font-bold">5</p>
                <p className="text-pink-100 font-medium">Battles Won</p>
              </div>
              <div className="text-center bg-white/20 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                <p className="text-3xl font-bold">12</p>
                <p className="text-pink-100 font-medium">Poems Written</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}