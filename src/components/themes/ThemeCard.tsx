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
    if (title.toLowerCase().includes('fire')) return 'from-red-400 to-orange-500';
    if (title.toLowerCase().includes('ocean')) return 'from-blue-400 to-cyan-500';
    if (title.toLowerCase().includes('time')) return 'from-purple-400 to-indigo-500';
    if (title.toLowerCase().includes('dream')) return 'from-pink-400 to-purple-500';
    return 'from-indigo-400 to-purple-500';
  };

  return (
    <div className="bg-white rounded-2xl shadow-medium hover:shadow-soft transition-all duration-200 overflow-hidden card-hover">
      {/* Simplified header */}
      <div className={`h-1 bg-gradient-to-r ${getGradientColors(theme.title)}`}></div>
      
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`bg-gradient-to-r ${getGradientColors(theme.title)} p-3 rounded-xl shadow-soft`}>
              <ThemeIcon className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">
                {theme.title}
              </h3>
              <p className="text-sm text-gray-500 font-medium">
                {theme.duality_option_1} vs {theme.duality_option_2}
              </p>
            </div>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-bold ${
            theme.is_active 
              ? 'bg-green-100 text-green-800' 
              : 'bg-gray-100 text-gray-700'
          }`}>
            {theme.is_active ? 'LIVE' : 'ENDED'}
          </span>
        </div>

        <p className="text-gray-600 mb-6 leading-relaxed">{theme.description}</p>

        {/* Simplified stats */}
        <div className="bg-gray-50 rounded-xl p-4 mb-6">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Users className="h-4 w-4 text-indigo-500" />
                <span className="font-semibold">{theme.participants || 0} poets</span>
              </div>
              <div className="flex items-center space-x-1">
                <FileText className="h-4 w-4 text-purple-500" />
                <span className="font-semibold">{theme.total_poems || 0} poems</span>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4 text-amber-500" />
              <span className="font-semibold">{formatTimeRemaining(theme.end_date)}</span>
            </div>
          </div>
        </div>

        {/* Simplified side options */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex space-x-2">
            <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium">
              {theme.duality_option_1}
            </span>
            <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
              {theme.duality_option_2}
            </span>
            <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium">
              Neutral
            </span>
          </div>
        </div>
        
        <Button
          onClick={() => onJoinBattle(theme.id)}
          disabled={!theme.is_active}
          className={`w-full text-lg py-3 rounded-xl font-bold shadow-soft ${
            theme.is_active
              ? `bg-gradient-to-r ${getGradientColors(theme.title)} text-white hover:shadow-medium`
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          {theme.is_active ? (
            <>
              <Crown className="h-5 w-5 mr-2" />
              Join Battle
            </>
          ) : (
            'View Results'
          )}
        </Button>
      </div>
    </div>
  );
}