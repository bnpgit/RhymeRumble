import React, { useState } from 'react';
import { Plus, Search, Filter, TrendingUp, Sparkles, Crown, Zap, Users, FileText } from 'lucide-react';
import { useThemes } from '../hooks/useThemes';
import { useAuthStore } from '../stores/authStore';
import ThemeCard from '../components/themes/ThemeCard';
import CreateThemeModal from '../components/themes/CreateThemeModal';
import CreatePoemModal from '../components/poems/CreatePoemModal';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { Theme } from '../types';

export default function DashboardPage() {
  const { user } = useAuthStore();
  const { data: themes, isLoading } = useThemes();
  const [showCreateTheme, setShowCreateTheme] = useState(false);
  const [showCreatePoem, setShowCreatePoem] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState<Theme | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState<'all' | 'active' | 'completed'>('all');

  const handleJoinBattle = (themeId: string) => {
    const theme = themes?.find(t => t.id === themeId);
    if (theme) {
      setSelectedTheme(theme);
      setShowCreatePoem(true);
    }
  };

  const filteredThemes = themes?.filter(theme => {
    const matchesSearch = theme.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         theme.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterBy === 'all' || 
                         (filterBy === 'active' && theme.is_active) ||
                         (filterBy === 'completed' && !theme.is_active);
    return matchesSearch && matchesFilter;
  }) || [];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-gray-600">Loading poetry battles...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12">
          <div className="text-center sm:text-left">
            <h1 className="text-6xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4 animate-float">
              Poetry Battles
            </h1>
            <p className="text-gray-600 text-xl">Choose your side and let your words do the fighting</p>
            <div className="flex items-center justify-center sm:justify-start mt-4 space-x-4">
              <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
                <Users className="h-4 w-4 text-indigo-500" />
                <span className="text-sm text-gray-600">{themes?.reduce((acc, theme) => acc + (theme.participants || 0), 0)} poets battling</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
                <FileText className="h-4 w-4 text-purple-500" />
                <span className="text-sm text-gray-600">{themes?.reduce((acc, theme) => acc + (theme.total_poems || 0), 0)} poems written</span>
              </div>
            </div>
          </div>
          <Button
            onClick={() => setShowCreateTheme(true)}
            className="mt-6 sm:mt-0 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 shadow-xl hover:shadow-2xl transform hover:scale-105 text-lg px-8 py-4"
          >
            <Plus className="h-6 w-6 mr-2" />
            Create Battle
            <Sparkles className="h-5 w-5 ml-2" />
          </Button>
        </div>

        {/* Enhanced Stats Cards with 3D effects */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-600 p-8 rounded-3xl text-white shadow-2xl transform hover:scale-105 hover:rotate-1 transition-all duration-300 card-3d">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-indigo-100 text-lg">Your Points</p>
                <p className="text-4xl font-bold">{user?.points || 0}</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="h-5 w-5 text-indigo-200 mr-1" />
                  <span className="text-indigo-200 text-sm">+15 this week</span>
                </div>
              </div>
              <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-sm">
                <Crown className="h-10 w-10 text-white" />
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-600 p-8 rounded-3xl text-white shadow-2xl transform hover:scale-105 hover:rotate-1 transition-all duration-300 card-3d">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-100 text-lg">Active Battles</p>
                <p className="text-4xl font-bold">{themes?.filter(t => t.is_active).length || 0}</p>
                <div className="flex items-center mt-2">
                  <Zap className="h-5 w-5 text-emerald-200 mr-1" />
                  <span className="text-emerald-200 text-sm">Join now!</span>
                </div>
              </div>
              <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-sm">
                <Plus className="h-10 w-10 text-white" />
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-amber-500 via-orange-600 to-red-600 p-8 rounded-3xl text-white shadow-2xl transform hover:scale-105 hover:rotate-1 transition-all duration-300 card-3d">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-amber-100 text-lg">Your Level</p>
                <p className="text-4xl font-bold">{user?.level || 1}</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="h-5 w-5 text-amber-200 mr-1" />
                  <span className="text-amber-200 text-sm">Level up soon!</span>
                </div>
              </div>
              <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-sm">
                <TrendingUp className="h-10 w-10 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-6 mb-12">
          <div className="flex-1">
            <Input
              placeholder="Search battles by theme or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              icon={<Search className="h-5 w-5 text-gray-400" />}
              className="text-lg py-4 rounded-2xl shadow-lg border-2 focus:border-indigo-400 bg-white/90 backdrop-blur-sm"
            />
          </div>
          <div className="relative">
            <select
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value as 'all' | 'active' | 'completed')}
              className="pl-12 pr-8 py-4 border-2 border-gray-300 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white/90 backdrop-blur-sm shadow-lg text-lg font-medium"
            >
              <option value="all">All Battles</option>
              <option value="active">Active Battles</option>
              <option value="completed">Completed Battles</option>
            </select>
            <Filter className="absolute left-4 top-5 h-6 w-6 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Popular Battles Section */}
        {filteredThemes.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center space-x-2 mb-6">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-xl">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                {filterBy === 'active' ? 'Most Popular Battles' : filterBy === 'completed' ? 'Recently Completed' : 'All Poetry Battles'}
              </h2>
              <div className="bg-white/80 backdrop-blur-sm rounded-full px-3 py-1 shadow-sm">
                <span className="text-sm text-gray-600">Sorted by popularity</span>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Theme Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredThemes.map((theme, index) => (
            <div
              key={theme.id}
              className="animate-slideInUp"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ThemeCard
                theme={theme}
                onJoinBattle={handleJoinBattle}
              />
            </div>
          ))}
        </div>

        {filteredThemes.length === 0 && (
          <div className="text-center py-20">
            <div className="bg-gradient-to-r from-gray-100 to-gray-200 rounded-full w-32 h-32 flex items-center justify-center mx-auto mb-8 shadow-2xl">
              <Search className="h-16 w-16 text-gray-400" />
            </div>
            <p className="text-gray-500 text-2xl mb-6">No battles found matching your criteria.</p>
            <Button
              onClick={() => setShowCreateTheme(true)}
              variant="outline"
              size="lg"
              className="transform hover:scale-105 shadow-lg bg-white/80 backdrop-blur-sm"
            >
              <Plus className="h-5 w-5 mr-2" />
              Create the first one!
            </Button>
          </div>
        )}

        {/* Modals */}
        <CreateThemeModal
          isOpen={showCreateTheme}
          onClose={() => setShowCreateTheme(false)}
        />

        {selectedTheme && (
          <CreatePoemModal
            isOpen={showCreatePoem}
            onClose={() => {
              setShowCreatePoem(false);
              setSelectedTheme(null);
            }}
            theme={selectedTheme}
          />
        )}
      </div>
    </div>
  );
}