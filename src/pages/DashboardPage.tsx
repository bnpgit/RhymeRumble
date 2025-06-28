import React, { useState } from 'react';
import { Plus, Search, Filter, TrendingUp, Sparkles, Crown, Users, FileText } from 'lucide-react';
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
      <div className="min-h-screen bg-gradient-primary flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-white">Loading poetry battles...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Simplified Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div className="text-center sm:text-left">
            <h1 className="text-5xl font-bold text-white mb-4 animate-float">
              Poetry Battles
            </h1>
            <p className="text-white/80 text-xl">Choose your side and let your words do the fighting</p>
            <div className="flex items-center justify-center sm:justify-start mt-4 space-x-4">
              <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-light rounded-full px-4 py-2">
                <Users className="h-4 w-4 text-white" />
                <span className="text-sm text-white">{themes?.reduce((acc, theme) => acc + (theme.participants || 0), 0)} poets battling</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-light rounded-full px-4 py-2">
                <FileText className="h-4 w-4 text-white" />
                <span className="text-sm text-white">{themes?.reduce((acc, theme) => acc + (theme.total_poems || 0), 0)} poems written</span>
              </div>
            </div>
          </div>
          <Button
            onClick={() => setShowCreateTheme(true)}
            className="mt-6 sm:mt-0 bg-white text-indigo-600 hover:bg-gray-50 shadow-medium text-lg px-8 py-4"
          >
            <Plus className="h-6 w-6 mr-2" />
            Create Battle
            <Sparkles className="h-5 w-5 ml-2" />
          </Button>
        </div>

        {/* Simplified Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-light p-6 rounded-2xl text-white shadow-soft">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80">Your Points</p>
                <p className="text-3xl font-bold">{user?.points || 0}</p>
              </div>
              <Crown className="h-8 w-8 text-white/60" />
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-light p-6 rounded-2xl text-white shadow-soft">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80">Active Battles</p>
                <p className="text-3xl font-bold">{themes?.filter(t => t.is_active).length || 0}</p>
              </div>
              <Plus className="h-8 w-8 text-white/60" />
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-light p-6 rounded-2xl text-white shadow-soft">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80">Your Level</p>
                <p className="text-3xl font-bold">{user?.level || 1}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-white/60" />
            </div>
          </div>
        </div>

        {/* Simplified Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1">
            <Input
              placeholder="Search battles by theme or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              icon={<Search className="h-5 w-5 text-gray-400" />}
              className="text-lg py-3 rounded-xl shadow-soft bg-white/90"
            />
          </div>
          <div className="relative">
            <select
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value as 'all' | 'active' | 'completed')}
              className="pl-12 pr-8 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white/90 shadow-soft text-lg font-medium"
            >
              <option value="all">All Battles</option>
              <option value="active">Active Battles</option>
              <option value="completed">Completed Battles</option>
            </select>
            <Filter className="absolute left-4 top-4 h-5 w-5 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Popular Battles Section */}
        {filteredThemes.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-white/20 p-2 rounded-xl">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white">
                {filterBy === 'active' ? 'Most Popular Battles' : filterBy === 'completed' ? 'Recently Completed' : 'All Poetry Battles'}
              </h2>
            </div>
          </div>
        )}

        {/* Simplified Theme Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredThemes.map((theme, index) => (
            <div
              key={theme.id}
              className="animate-fadeIn"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <ThemeCard
                theme={theme}
                onJoinBattle={handleJoinBattle}
              />
            </div>
          ))}
        </div>

        {filteredThemes.length === 0 && (
          <div className="text-center py-16">
            <div className="bg-white/20 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
              <Search className="h-12 w-12 text-white" />
            </div>
            <p className="text-white text-xl mb-4">No battles found matching your criteria.</p>
            <Button
              onClick={() => setShowCreateTheme(true)}
              variant="outline"
              className="bg-white/20 text-white border-white/30 hover:bg-white/30"
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