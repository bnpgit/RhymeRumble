import React, { useState } from 'react';
import { Plus, Search, Filter, TrendingUp, Sparkles, Crown, Users, FileText } from 'lucide-react';
import { useThemes } from '../hooks/useThemes';
import { usePoems } from '../hooks/usePoems';
import { useAuthStore } from '../stores/authStore';
import ThemeCard from '../components/themes/ThemeCard';
import CreateThemeModal from '../components/themes/CreateThemeModal';
import CreatePoemModal from '../components/poems/CreatePoemModal';
import PoemCard from '../components/poems/PoemCard';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import AnimatedBackground from '../components/ui/AnimatedBackground';
import { Theme } from '../types';

export default function DashboardPage() {
  const { user } = useAuthStore();
  const { data: themes, isLoading: themesLoading } = useThemes();
  const { data: allPoems, isLoading: poemsLoading } = usePoems();
  const [showCreateTheme, setShowCreateTheme] = useState(false);
  const [showCreatePoem, setShowCreatePoem] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState<Theme | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState<'all' | 'active' | 'completed'>('all');
  const [viewMode, setViewMode] = useState<'themes' | 'poems'>('themes');

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

  const filteredPoems = allPoems?.filter(poem => {
    return poem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
           poem.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
           poem.author?.username.toLowerCase().includes(searchTerm.toLowerCase());
  }) || [];

  const isLoading = themesLoading || poemsLoading;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-800 flex items-center justify-center relative overflow-hidden">
        <AnimatedBackground />
        <div className="text-center relative z-10">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-white text-lg">Loading poetry battles...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-800 relative overflow-hidden">
      {/* Animated Background */}
      <AnimatedBackground />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Header with Vibrant Colors */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div className="text-center sm:text-left">
            <h1 className="text-6xl font-bold bg-gradient-to-r from-yellow-300 via-pink-300 to-orange-300 bg-clip-text text-transparent mb-4 animate-float">
              Poetry Battles
            </h1>
            <p className="text-white/90 text-xl font-medium">Choose your side and let your words do the fighting</p>
            <div className="flex items-center justify-center sm:justify-start mt-4 space-x-4">
              <div className="flex items-center space-x-2 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full px-4 py-2 shadow-lg">
                <Users className="h-4 w-4 text-white" />
                <span className="text-sm text-white font-semibold">{themes?.reduce((acc, theme) => acc + (theme.participants || 0), 0)} poets battling</span>
              </div>
              <div className="flex items-center space-x-2 bg-gradient-to-r from-orange-400 to-red-500 rounded-full px-4 py-2 shadow-lg">
                <FileText className="h-4 w-4 text-white" />
                <span className="text-sm text-white font-semibold">{allPoems?.length || 0} poems written</span>
              </div>
            </div>
          </div>
          <Button
            onClick={() => setShowCreateTheme(true)}
            className="mt-6 sm:mt-0 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 hover:from-yellow-500 hover:via-orange-600 hover:to-red-600 text-white font-bold shadow-xl hover:shadow-2xl text-lg px-8 py-4 border-0 transform hover:scale-105 transition-all duration-200"
          >
            <Plus className="h-6 w-6 mr-2" />
            Create Battle
            <Sparkles className="h-5 w-5 ml-2" />
          </Button>
        </div>

        {/* Colorful Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-pink-500 via-rose-500 to-red-500 p-6 rounded-2xl text-white shadow-xl transform hover:scale-105 transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-pink-100 font-medium">Your Points</p>
                <p className="text-4xl font-bold">{user?.points || 0}</p>
              </div>
              <Crown className="h-10 w-10 text-pink-200" />
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 p-6 rounded-2xl text-white shadow-xl transform hover:scale-105 transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-100 font-medium">Active Battles</p>
                <p className="text-4xl font-bold">{themes?.filter(t => t.is_active).length || 0}</p>
              </div>
              <Plus className="h-10 w-10 text-emerald-200" />
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-amber-500 via-orange-500 to-yellow-500 p-6 rounded-2xl text-white shadow-xl transform hover:scale-105 transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-amber-100 font-medium">Your Level</p>
                <p className="text-4xl font-bold">{user?.level || 1}</p>
              </div>
              <TrendingUp className="h-10 w-10 text-amber-200" />
            </div>
          </div>
        </div>

        {/* View Mode Toggle */}
        <div className="flex justify-center mb-6">
          <div className="flex space-x-2 bg-white/20 backdrop-blur-sm p-2 rounded-2xl shadow-xl border border-white/30">
            <button
              onClick={() => setViewMode('themes')}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl text-sm font-bold transition-all duration-200 ${
                viewMode === 'themes'
                  ? 'bg-gradient-to-r from-violet-500 to-purple-600 text-white shadow-lg transform scale-105'
                  : 'text-white hover:text-white hover:bg-white/10'
              }`}
            >
              <Crown className="h-4 w-4" />
              <span>Battle Themes</span>
            </button>
            <button
              onClick={() => setViewMode('poems')}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl text-sm font-bold transition-all duration-200 ${
                viewMode === 'poems'
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg transform scale-105'
                  : 'text-white hover:text-white hover:bg-white/10'
              }`}
            >
              <FileText className="h-4 w-4" />
              <span>All Poems</span>
            </button>
          </div>
        </div>

        {/* Colorful Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1">
            <Input
              placeholder={viewMode === 'themes' ? "Search battles by theme or description..." : "Search poems by title, content, or author..."}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              icon={<Search className="h-5 w-5 text-gray-400" />}
              className="text-lg py-3 rounded-xl shadow-lg bg-white border-2 border-purple-200 focus:border-purple-400"
            />
          </div>
          {viewMode === 'themes' && (
            <div className="relative">
              <select
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value as 'all' | 'active' | 'completed')}
                className="pl-12 pr-8 py-3 border-2 border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-400 bg-white shadow-lg text-lg font-medium"
              >
                <option value="all">All Battles</option>
                <option value="active">Active Battles</option>
                <option value="completed">Completed Battles</option>
              </select>
              <Filter className="absolute left-4 top-4 h-5 w-5 text-gray-400 pointer-events-none" />
            </div>
          )}
        </div>

        {/* Content Section */}
        {viewMode === 'themes' ? (
          <>
            {/* Popular Battles Section */}
            {filteredThemes.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="bg-gradient-to-r from-violet-500 to-purple-600 p-3 rounded-xl shadow-lg">
                    <TrendingUp className="h-6 w-6 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-violet-300 to-pink-300 bg-clip-text text-transparent">
                    {filterBy === 'active' ? 'Most Popular Battles' : filterBy === 'completed' ? 'Recently Completed' : 'All Poetry Battles'}
                  </h2>
                </div>
              </div>
            )}

            {/* Theme Cards Grid */}
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
                <div className="bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6 shadow-xl">
                  <Search className="h-12 w-12 text-white" />
                </div>
                <p className="text-white text-xl mb-4 font-medium">No battles found matching your criteria.</p>
                <Button
                  onClick={() => setShowCreateTheme(true)}
                  className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white border-0 font-bold px-6 py-3 shadow-lg"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Create the first one!
                </Button>
              </div>
            )}
          </>
        ) : (
          <>
            {/* All Poems Section */}
            {filteredPoems.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-3 rounded-xl shadow-lg">
                    <FileText className="h-6 w-6 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-300 to-teal-300 bg-clip-text text-transparent">
                    All Published Poems
                  </h2>
                </div>
              </div>
            )}

            {/* Poems Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPoems.map((poem, index) => (
                <div
                  key={poem.id}
                  className="animate-fadeIn"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <PoemCard poem={poem} />
                </div>
              ))}
            </div>

            {filteredPoems.length === 0 && (
              <div className="text-center py-16">
                <div className="bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6 shadow-xl">
                  <FileText className="h-12 w-12 text-white" />
                </div>
                <p className="text-white text-xl mb-4 font-medium">No poems found matching your search.</p>
                <p className="text-white/80 text-lg">Join a battle to start writing poetry!</p>
              </div>
            )}
          </>
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