import React, { useState } from 'react';
import { Crown, Trophy, Medal, Award, User, TrendingUp, Flame, Heart, Zap } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';

export default function LeaderboardPage() {
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState<'overall' | 'monthly' | 'battles'>('overall');

  // Enhanced leaderboard data with weighted scoring
  const mockLeaders = [
    { 
      id: '1', 
      username: 'PoetMaster', 
      points: 2450, 
      level: 12, 
      battlesWon: 15, 
      poemsWritten: 67,
      totalLikes: 234,
      score: (67 * 5) + (234 * 2) + (15 * 10), // 335 + 468 + 150 = 953
      avatar: '👑',
      trend: 'up'
    },
    { 
      id: '2', 
      username: 'VerseCrafter', 
      points: 2120, 
      level: 11, 
      battlesWon: 12, 
      poemsWritten: 54,
      totalLikes: 198,
      score: (54 * 5) + (198 * 2) + (12 * 10), // 270 + 396 + 120 = 786
      avatar: '🏆',
      trend: 'up'
    },
    { 
      id: '3', 
      username: 'RhymeWarrior', 
      points: 1890, 
      level: 10, 
      battlesWon: 10, 
      poemsWritten: 48,
      totalLikes: 156,
      score: (48 * 5) + (156 * 2) + (10 * 10), // 240 + 312 + 100 = 652
      avatar: '🥇',
      trend: 'down'
    },
    { 
      id: '4', 
      username: 'WordWeaver', 
      points: 1650, 
      level: 9, 
      battlesWon: 8, 
      poemsWritten: 41,
      totalLikes: 134,
      score: (41 * 5) + (134 * 2) + (8 * 10), // 205 + 268 + 80 = 553
      avatar: '🥈',
      trend: 'up'
    },
    { 
      id: '5', 
      username: 'SoulScriber', 
      points: 1420, 
      level: 8, 
      battlesWon: 7, 
      poemsWritten: 36,
      totalLikes: 112,
      score: (36 * 5) + (112 * 2) + (7 * 10), // 180 + 224 + 70 = 474
      avatar: '🥉',
      trend: 'stable'
    },
    { 
      id: '6', 
      username: 'MelodyMaker', 
      points: 1280, 
      level: 8, 
      battlesWon: 6, 
      poemsWritten: 32,
      totalLikes: 98,
      score: (32 * 5) + (98 * 2) + (6 * 10), // 160 + 196 + 60 = 416
      avatar: '🎵',
      trend: 'up'
    },
    { 
      id: '7', 
      username: 'StanzaStorm', 
      points: 1150, 
      level: 7, 
      battlesWon: 5, 
      poemsWritten: 29,
      totalLikes: 87,
      score: (29 * 5) + (87 * 2) + (5 * 10), // 145 + 174 + 50 = 369
      avatar: '⚡',
      trend: 'down'
    },
    { 
      id: '8', 
      username: 'InkDancer', 
      points: 980, 
      level: 6, 
      battlesWon: 4, 
      poemsWritten: 25,
      totalLikes: 76,
      score: (25 * 5) + (76 * 2) + (4 * 10), // 125 + 152 + 40 = 317
      avatar: '💃',
      trend: 'stable'
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
      icon: Flame
    },
    {
      id: '2',
      theme: 'Time: Past or Future',
      winningSide: 'Future',
      topUser: 'VerseCrafter',
      topUserLikes: 38,
      totalParticipants: 18,
      endDate: '5 days ago',
      icon: TrendingUp
    },
    {
      id: '3',
      theme: 'Ocean: Calm or Storm',
      winningSide: 'Storm',
      topUser: 'RhymeWarrior',
      topUserLikes: 42,
      totalParticipants: 31,
      endDate: '1 week ago',
      icon: Heart
    },
    {
      id: '4',
      theme: 'Dreams: Escape or Reality',
      winningSide: 'Escape',
      topUser: 'WordWeaver',
      topUserLikes: 35,
      totalParticipants: 27,
      endDate: '1 week ago',
      icon: Zap
    }
  ];

  // Sort leaders by score for overall and monthly
  const sortedLeaders = [...mockLeaders].sort((a, b) => b.score - a.score);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="h-6 w-6 text-yellow-500" />;
      case 2: return <Trophy className="h-6 w-6 text-gray-400" />;
      case 3: return <Medal className="h-6 w-6 text-amber-600" />;
      default: return <Award className="h-5 w-5 text-gray-400" />;
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1: return 'bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 shadow-2xl shadow-yellow-500/50';
      case 2: return 'bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500 shadow-2xl shadow-gray-400/50';
      case 3: return 'bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 shadow-2xl shadow-amber-500/50';
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
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
          Leaderboard
        </h1>
        <p className="text-gray-600 text-lg">See who's dominating the poetry battles</p>
      </div>

      {/* Enhanced Tabs with 3D effect */}
      <div className="flex justify-center mb-12">
        <div className="flex space-x-2 bg-white p-2 rounded-2xl shadow-2xl border border-gray-200">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
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
            </button>
          ))}
        </div>
      </div>

      {/* Enhanced Top 3 Podium with 3D effects */}
      {(activeTab === 'overall' || activeTab === 'monthly') && (
        <div className="mb-12">
          <div className="flex justify-center items-end space-x-8 mb-12">
            {/* 2nd Place */}
            <div className="text-center transform hover:scale-105 transition-all duration-300 animate-slideInLeft">
              <div className={`${getRankColor(2)} p-6 rounded-full mb-4 inline-flex items-center justify-center transform hover:rotate-12 transition-all duration-300`}
                   style={{ 
                     transform: 'perspective(1000px) rotateX(10deg)',
                     boxShadow: '0 20px 40px rgba(0,0,0,0.2), 0 0 0 1px rgba(255,255,255,0.1) inset'
                   }}>
                <span className="text-3xl">{sortedLeaders[1]?.avatar}</span>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-2xl min-w-[140px] border border-gray-100 transform hover:translateY(-5px) transition-all duration-300"
                   style={{ boxShadow: '0 25px 50px rgba(0,0,0,0.15)' }}>
                <Trophy className="h-8 w-8 text-gray-400 mx-auto mb-3" />
                <h3 className="font-bold text-gray-900 text-lg">{sortedLeaders[1]?.username}</h3>
                <p className="text-gray-600 font-semibold">{sortedLeaders[1]?.score} pts</p>
                <div className="text-xs text-gray-500 mt-2">
                  <div>Poems: {sortedLeaders[1]?.poemsWritten}</div>
                  <div>Likes: {sortedLeaders[1]?.totalLikes}</div>
                  <div>Wins: {sortedLeaders[1]?.battlesWon}</div>
                </div>
              </div>
            </div>

            {/* 1st Place */}
            <div className="text-center transform hover:scale-110 transition-all duration-300 animate-slideInUp">
              <div className={`${getRankColor(1)} p-8 rounded-full mb-4 inline-flex items-center justify-center transform hover:rotate-12 transition-all duration-300 animate-pulse`}
                   style={{ 
                     transform: 'perspective(1000px) rotateX(10deg) scale(1.2)',
                     boxShadow: '0 30px 60px rgba(0,0,0,0.3), 0 0 0 2px rgba(255,255,255,0.2) inset'
                   }}>
                <span className="text-4xl">{sortedLeaders[0]?.avatar}</span>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-2xl min-w-[160px] border-2 border-yellow-200 transform hover:translateY(-8px) transition-all duration-300"
                   style={{ boxShadow: '0 30px 60px rgba(0,0,0,0.2), 0 0 30px rgba(255,215,0,0.3)' }}>
                <Crown className="h-10 w-10 text-yellow-500 mx-auto mb-3 animate-bounce" />
                <h3 className="font-bold text-gray-900 text-xl">{sortedLeaders[0]?.username}</h3>
                <p className="text-gray-600 font-bold text-lg">{sortedLeaders[0]?.score} pts</p>
                <p className="text-xs text-gray-500 mb-3">Level {sortedLeaders[0]?.level}</p>
                <div className="text-xs text-gray-500">
                  <div>Poems: {sortedLeaders[0]?.poemsWritten}</div>
                  <div>Likes: {sortedLeaders[0]?.totalLikes}</div>
                  <div>Wins: {sortedLeaders[0]?.battlesWon}</div>
                </div>
              </div>
            </div>

            {/* 3rd Place */}
            <div className="text-center transform hover:scale-105 transition-all duration-300 animate-slideInRight">
              <div className={`${getRankColor(3)} p-6 rounded-full mb-4 inline-flex items-center justify-center transform hover:rotate-12 transition-all duration-300`}
                   style={{ 
                     transform: 'perspective(1000px) rotateX(10deg)',
                     boxShadow: '0 20px 40px rgba(0,0,0,0.2), 0 0 0 1px rgba(255,255,255,0.1) inset'
                   }}>
                <span className="text-3xl">{sortedLeaders[2]?.avatar}</span>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-2xl min-w-[140px] border border-gray-100 transform hover:translateY(-5px) transition-all duration-300"
                   style={{ boxShadow: '0 25px 50px rgba(0,0,0,0.15)' }}>
                <Medal className="h-8 w-8 text-amber-600 mx-auto mb-3" />
                <h3 className="font-bold text-gray-900 text-lg">{sortedLeaders[2]?.username}</h3>
                <p className="text-gray-600 font-semibold">{sortedLeaders[2]?.score} pts</p>
                <div className="text-xs text-gray-500 mt-2">
                  <div>Poems: {sortedLeaders[2]?.poemsWritten}</div>
                  <div>Likes: {sortedLeaders[2]?.totalLikes}</div>
                  <div>Wins: {sortedLeaders[2]?.battlesWon}</div>
                </div>
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
                className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 transform hover:scale-105 hover:shadow-2xl transition-all duration-300 animate-slideInUp"
                style={{ 
                  animationDelay: `${index * 0.1}s`,
                  boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-3 rounded-xl shadow-lg">
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{battle.theme}</h3>
                      <p className="text-sm text-gray-500">{battle.endDate}</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                    {battle.winningSide} Won
                  </span>
                </div>
                
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4 mb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Top Performer</p>
                      <p className="font-bold text-gray-900">{battle.topUser}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Likes Received</p>
                      <p className="font-bold text-indigo-600 text-lg">{battle.topUserLikes}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{battle.totalParticipants} participants</span>
                  <span className="flex items-center space-x-1">
                    <Heart className="h-4 w-4" />
                    <span>Battle completed</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Enhanced Full Leaderboard */}
      {(activeTab === 'overall' || activeTab === 'monthly') && (
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
          <div className="px-8 py-6 bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Full Rankings</h2>
            <p className="text-sm text-gray-600 mt-1">
              Score = (Poems × 5) + (Likes × 2) + (Wins × 10)
            </p>
          </div>
          <div className="divide-y divide-gray-100">
            {sortedLeaders.map((leader, index) => {
              const rank = index + 1;
              const isCurrentUser = leader.id === user?.id;
              
              return (
                <div
                  key={leader.id}
                  className={`px-8 py-6 flex items-center justify-between transform hover:scale-[1.02] transition-all duration-300 animate-slideInLeft ${
                    isCurrentUser 
                      ? 'bg-gradient-to-r from-indigo-50 to-purple-50 border-l-4 border-indigo-400 shadow-lg' 
                      : 'hover:bg-gray-50'
                  }`}
                  style={{ 
                    animationDelay: `${index * 0.05}s`,
                    boxShadow: isCurrentUser ? '0 10px 25px rgba(99, 102, 241, 0.1)' : 'none'
                  }}
                >
                  <div className="flex items-center space-x-6">
                    <div className="flex items-center justify-center w-10">
                      {getRankIcon(rank)}
                    </div>
                    <div className="text-xl font-bold text-gray-400 w-10">
                      #{rank}
                    </div>
                    <div className="bg-gradient-to-r from-gray-100 to-gray-200 p-3 rounded-full shadow-lg transform hover:rotate-12 transition-all duration-300">
                      <span className="text-xl">{leader.avatar || '👤'}</span>
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className={`font-bold text-lg ${isCurrentUser ? 'text-indigo-900' : 'text-gray-900'}`}>
                          {leader.username}
                          {isCurrentUser && <span className="ml-2 text-sm text-indigo-600 font-medium">(You)</span>}
                        </h3>
                        <span className="text-lg">{getTrendIcon(leader.trend)}</span>
                      </div>
                      <p className="text-sm text-gray-600">Level {leader.level}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-8 text-sm text-gray-600">
                    <div className="text-center">
                      <p className="font-bold text-gray-900 text-lg">{leader.score}</p>
                      <p>Total Score</p>
                    </div>
                    <div className="text-center">
                      <p className="font-bold text-gray-900">{leader.poemsWritten}</p>
                      <p>Poems</p>
                    </div>
                    <div className="text-center">
                      <p className="font-bold text-gray-900">{leader.totalLikes}</p>
                      <p>Likes</p>
                    </div>
                    <div className="text-center">
                      <p className="font-bold text-gray-900">{leader.battlesWon}</p>
                      <p>Wins</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Enhanced Your Stats */}
      {user && (
        <div className="mt-12 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl p-8 text-white shadow-2xl transform hover:scale-105 transition-all duration-300"
             style={{ boxShadow: '0 25px 50px rgba(99, 102, 241, 0.3)' }}>
          <h3 className="text-2xl font-bold mb-6">Your Stats</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center bg-white/10 rounded-xl p-4 backdrop-blur-sm">
              <p className="text-3xl font-bold">{user.points}</p>
              <p className="text-indigo-200">Total Points</p>
            </div>
            <div className="text-center bg-white/10 rounded-xl p-4 backdrop-blur-sm">
              <p className="text-3xl font-bold">{user.level}</p>
              <p className="text-indigo-200">Level</p>
            </div>
            <div className="text-center bg-white/10 rounded-xl p-4 backdrop-blur-sm">
              <p className="text-3xl font-bold">5</p>
              <p className="text-indigo-200">Battles Won</p>
            </div>
            <div className="text-center bg-white/10 rounded-xl p-4 backdrop-blur-sm">
              <p className="text-3xl font-bold">12</p>
              <p className="text-indigo-200">Poems Written</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}