import React, { useState } from 'react';
import { Crown, Trophy, Medal, Award, User, TrendingUp } from 'lucide-react';

interface LeaderboardProps {
  currentUser: any;
}

export default function Leaderboard({ currentUser }: LeaderboardProps) {
  const [activeTab, setActiveTab] = useState<'overall' | 'monthly' | 'battles'>('overall');

  // Mock leaderboard data
  const mockLeaders = [
    { id: '1', username: 'PoetMaster', points: 2450, level: 12, battlesWon: 15, poemsWritten: 67, avatar: '👑' },
    { id: '2', username: 'VerseCrafter', points: 2120, level: 11, battlesWon: 12, poemsWritten: 54, avatar: '🏆' },
    { id: '3', username: 'RhymeWarrior', points: 1890, level: 10, battlesWon: 10, poemsWritten: 48, avatar: '🥇' },
    { id: '4', username: 'WordWeaver', points: 1650, level: 9, battlesWon: 8, poemsWritten: 41, avatar: '🥈' },
    { id: '5', username: 'SoulScriber', points: 1420, level: 8, battlesWon: 7, poemsWritten: 36, avatar: '🥉' },
    { id: '6', username: 'MelodyMaker', points: 1280, level: 8, battlesWon: 6, poemsWritten: 32, avatar: '🎵' },
    { id: '7', username: 'StanzaStorm', points: 1150, level: 7, battlesWon: 5, poemsWritten: 29, avatar: '⚡' },
    { id: '8', username: 'InkDancer', points: 980, level: 6, battlesWon: 4, poemsWritten: 25, avatar: '💃' },
  ];

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
      case 1: return 'bg-gradient-to-r from-yellow-400 to-yellow-600';
      case 2: return 'bg-gradient-to-r from-gray-300 to-gray-500';
      case 3: return 'bg-gradient-to-r from-amber-400 to-amber-600';
      default: return 'bg-gray-100';
    }
  };

  const tabs = [
    { id: 'overall' as const, label: 'Overall', icon: Crown },
    { id: 'monthly' as const, label: 'This Month', icon: TrendingUp },
    { id: 'battles' as const, label: 'Battle Wins', icon: Trophy },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Leaderboard</h1>
        <p className="text-gray-600">See who's dominating the poetry battles</p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center mb-8">
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === id
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Top 3 Podium */}
      <div className="mb-8">
        <div className="flex justify-center items-end space-x-4 mb-8">
          {/* 2nd Place */}
          <div className="text-center">
            <div className={`${getRankColor(2)} p-4 rounded-full mb-3 inline-flex items-center justify-center`}>
              <span className="text-2xl">{mockLeaders[1].avatar}</span>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md min-w-[120px]">
              <Trophy className="h-6 w-6 text-gray-400 mx-auto mb-2" />
              <h3 className="font-bold text-gray-900">{mockLeaders[1].username}</h3>
              <p className="text-sm text-gray-600">{mockLeaders[1].points} pts</p>
            </div>
          </div>

          {/* 1st Place */}
          <div className="text-center">
            <div className={`${getRankColor(1)} p-6 rounded-full mb-3 inline-flex items-center justify-center transform scale-110`}>
              <span className="text-3xl">{mockLeaders[0].avatar}</span>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg min-w-[140px]">
              <Crown className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
              <h3 className="font-bold text-gray-900 text-lg">{mockLeaders[0].username}</h3>
              <p className="text-gray-600">{mockLeaders[0].points} pts</p>
              <p className="text-xs text-gray-500">Level {mockLeaders[0].level}</p>
            </div>
          </div>

          {/* 3rd Place */}
          <div className="text-center">
            <div className={`${getRankColor(3)} p-4 rounded-full mb-3 inline-flex items-center justify-center`}>
              <span className="text-2xl">{mockLeaders[2].avatar}</span>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md min-w-[120px]">
              <Medal className="h-6 w-6 text-amber-600 mx-auto mb-2" />
              <h3 className="font-bold text-gray-900">{mockLeaders[2].username}</h3>
              <p className="text-sm text-gray-600">{mockLeaders[2].points} pts</p>
            </div>
          </div>
        </div>
      </div>

      {/* Full Leaderboard */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Full Rankings</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {mockLeaders.map((leader, index) => {
            const rank = index + 1;
            const isCurrentUser = leader.id === currentUser.id;
            
            return (
              <div
                key={leader.id}
                className={`px-6 py-4 flex items-center justify-between ${
                  isCurrentUser ? 'bg-indigo-50 border-l-4 border-indigo-400' : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-8">
                    {getRankIcon(rank)}
                  </div>
                  <div className="text-lg font-bold text-gray-400 w-8">
                    #{rank}
                  </div>
                  <div className="bg-gray-100 p-2 rounded-full">
                    <span className="text-lg">{leader.avatar || '👤'}</span>
                  </div>
                  <div>
                    <h3 className={`font-semibold ${isCurrentUser ? 'text-indigo-900' : 'text-gray-900'}`}>
                      {leader.username}
                      {isCurrentUser && <span className="ml-2 text-sm text-indigo-600">(You)</span>}
                    </h3>
                    <p className="text-sm text-gray-600">Level {leader.level}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-6 text-sm text-gray-600">
                  <div className="text-center">
                    <p className="font-semibold text-gray-900">{leader.points}</p>
                    <p>Points</p>
                  </div>
                  <div className="text-center">
                    <p className="font-semibold text-gray-900">{leader.battlesWon}</p>
                    <p>Wins</p>
                  </div>
                  <div className="text-center">
                    <p className="font-semibold text-gray-900">{leader.poemsWritten}</p>
                    <p>Poems</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Your Stats */}
      {currentUser && (
        <div className="mt-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 text-white">
          <h3 className="text-lg font-semibold mb-4">Your Stats</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold">{currentUser.points}</p>
              <p className="text-indigo-200">Total Points</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">{currentUser.level}</p>
              <p className="text-indigo-200">Level</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">5</p>
              <p className="text-indigo-200">Battles Won</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">12</p>
              <p className="text-indigo-200">Poems Written</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}