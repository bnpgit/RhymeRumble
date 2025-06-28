import React from 'react';
import { Clock, Users, FileText, Flame, Heart, Shield, Zap, Crown, Star } from 'lucide-react';
import { Theme } from '../../types';
import Button from '../ui/Button';

interface ThemeCardProps {
  theme: Theme;
  onJoinBattle: (themeId: string) => void;
}

export default function ThemeCard({ theme, onJoinBattle }: ThemeCardProps) {
  const getThemeIcon = (title: string) => {
    if (title.toLowerCase().includes('fire')) return Flame;
    if (title.toLowerCase().includes('love') || title.toLowerCase().includes('heart')) return Heart;
    if (title.toLowerCase().includes('time')) return Clock;
    if (title.toLowerCase().includes('dream')) return Star;
    if (title.toLowerCase().includes('ocean') || title.toLowerCase().includes('water')) return Zap;
    return Shield;
  };

  const ThemeIcon = getThemeIcon(theme.title);
  
  const formatTimeRemaining = (endDate?: string) => {
    if (!endDate) return 'Ongoing';
    const now = new Date();
    const end = new Date(endDate);
    const diff = end.getTime() - now.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) return `${days}d ${hours}h left`;
    if (hours > 0) return `${hours}h left`;
    return 'Ending soon';
  };

  const getGradientColors = (title: string) => {
    if (title.toLowerCase().includes('fire')) return 'from-red-400 via-orange-500 to-yellow-500';
    if (title.toLowerCase().includes('ocean')) return 'from-blue-400 via-cyan-500 to-teal-500';
    if (title.toLowerCase().includes('time')) return 'from-purple-400 via-indigo-500 to-blue-500';
    if (title.toLowerCase().includes('dream')) return 'from-pink-400 via-purple-500 to-indigo-500';
    return 'from-indigo-400 via-purple-500 to-pink-500';
  };

  return (
    <div className="bg-white rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-indigo-200 transform hover:scale-105 hover:-rotate-1 card-3d group">
      {/* Header with gradient */}
      <div className={`h-2 bg-gradient-to-r ${getGradientColors(theme.title)}`}></div>
      
      <div className="p-8">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className={`bg-gradient-to-r ${getGradientColors(theme.title)} p-4 rounded-2xl shadow-lg transform group-hover:rotate-12 transition-all duration-300`}>
              <ThemeIcon className="h-8 w-8 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                {theme.title}
              </h3>
              <p className="text-sm text-gray-500 font-medium">
                {theme.duality_option_1} vs {theme.duality_option_2}
              </p>
            </div>
          </div>
          <span className={`px-4 py-2 rounded-full text-sm font-bold shadow-lg ${
            theme.is_active 
              ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-white animate-pulse' 
              : 'bg-gradient-to-r from-gray-300 to-gray-400 text-gray-700'
          }`}>
            {theme.is_active ? 'LIVE' : 'ENDED'}
          </span>
        </div>

        <p className="text-gray-600 mb-8 leading-relaxed text-lg">{theme.description}</p>

        {/* Stats section with enhanced design */}
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-6 mb-8 shadow-inner">
          <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2 bg-white rounded-xl px-3 py-2 shadow-sm">
                <Users className="h-5 w-5 text-indigo-500" />
                <span className="font-semibold">{theme.participants || 0} poets</span>
              </div>
              <div className="flex items-center space-x-2 bg-white rounded-xl px-3 py-2 shadow-sm">
                <FileText className="h-5 w-5 text-purple-500" />
                <span className="font-semibold">{theme.total_poems || 0} poems</span>
              </div>
            </div>
            <div className="flex items-center space-x-2 bg-white rounded-xl px-3 py-2 shadow-sm">
              <Clock className="h-5 w-5 text-amber-500" />
              <span className="font-semibold">{formatTimeRemaining(theme.end_date)}</span>
            </div>
          </div>
        </div>

        {/* Side options with enhanced styling */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex space-x-3">
            <span className="px-4 py-2 bg-gradient-to-r from-emerald-100 to-emerald-200 text-emerald-800 rounded-full text-sm font-bold shadow-lg transform hover:scale-105 transition-all">
              {theme.duality_option_1}
            </span>
            <span className="px-4 py-2 bg-gradient-to-r from-red-100 to-red-200 text-red-800 rounded-full text-sm font-bold shadow-lg transform hover:scale-105 transition-all">
              {theme.duality_option_2}
            </span>
            <span className="px-4 py-2 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 rounded-full text-sm font-bold shadow-lg transform hover:scale-105 transition-all">
              Neutral
            </span>
          </div>
        </div>
        
        <Button
          onClick={() => onJoinBattle(theme.id)}
          disabled={!theme.is_active}
          className={`w-full text-lg py-4 rounded-2xl font-bold shadow-xl transform hover:scale-105 transition-all duration-300 ${
            theme.is_active
              ? `bg-gradient-to-r ${getGradientColors(theme.title)} hover:shadow-2xl text-white`
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          {theme.is_active ? (
            <>
              <Crown className="h-5 w-5 mr-2" />
              Join Battle
              <Zap className="h-5 w-5 ml-2" />
            </>
          ) : (
            'View Results'
          )}
        </Button>
      </div>
    </div>
  );
}