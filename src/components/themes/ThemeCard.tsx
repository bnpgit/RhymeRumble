import React from 'react';
import { Clock, Users, FileText, Flame, Heart, Shield } from 'lucide-react';
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
    return `${hours}h left`;
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 hover:border-indigo-200">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="bg-indigo-100 p-2 rounded-lg">
              <ThemeIcon className="h-6 w-6 text-indigo-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">{theme.title}</h3>
              <p className="text-sm text-gray-500">
                {theme.duality_option_1} vs {theme.duality_option_2}
              </p>
            </div>
          </div>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            theme.is_active 
              ? 'bg-green-100 text-green-800' 
              : 'bg-gray-100 text-gray-800'
          }`}>
            {theme.is_active ? 'Active' : 'Completed'}
          </span>
        </div>

        <p className="text-gray-600 mb-6 leading-6">{theme.description}</p>

        <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Users className="h-4 w-4" />
              <span>{theme.participants || 0} poets</span>
            </div>
            <div className="flex items-center space-x-1">
              <FileText className="h-4 w-4" />
              <span>{theme.total_poems || 0} poems</span>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>{formatTimeRemaining(theme.end_date)}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex space-x-2">
            <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-medium">
              {theme.duality_option_1}
            </span>
            <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
              {theme.duality_option_2}
            </span>
            <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">
              Neutral
            </span>
          </div>
          
          <Button
            onClick={() => onJoinBattle(theme.id)}
            disabled={!theme.is_active}
            variant={theme.is_active ? 'primary' : 'outline'}
            size="sm"
          >
            {theme.is_active ? 'Join Battle' : 'View Results'}
          </Button>
        </div>
      </div>
    </div>
  );
}