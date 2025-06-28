import React, { useState } from 'react';
import { Plus, Search, Filter, TrendingUp } from 'lucide-react';
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
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Poetry Battles</h1>
          <p className="text-gray-600">Choose your side and let your words do the fighting</p>
        </div>
        <Button
          onClick={() => setShowCreateTheme(true)}
          className="mt-4 sm:mt-0"
        >
          <Plus className="h-5 w-5 mr-2" />
          Create Battle
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 rounded-xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-indigo-100">Your Points</p>
              <p className="text-2xl font-bold">{user?.points || 0}</p>
            </div>
            <TrendingUp className="h-8 w-8 text-indigo-200" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-6 rounded-xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-emerald-100">Active Battles</p>
              <p className="text-2xl font-bold">{themes?.filter(t => t.is_active).length || 0}</p>
            </div>
            <Plus className="h-8 w-8 text-emerald-200" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-amber-500 to-orange-600 p-6 rounded-xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-amber-100">Your Level</p>
              <p className="text-2xl font-bold">{user?.level || 1}</p>
            </div>
            <TrendingUp className="h-8 w-8 text-amber-200" />
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="flex-1">
          <Input
            placeholder="Search battles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon={<Search className="h-5 w-5 text-gray-400" />}
          />
        </div>
        <div className="relative">
          <select
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value as 'all' | 'active' | 'completed')}
            className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
          >
            <option value="all">All Battles</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
          <Filter className="absolute left-3 top-3 h-5 w-5 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* Theme Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredThemes.map(theme => (
          <ThemeCard
            key={theme.id}
            theme={theme}
            onJoinBattle={handleJoinBattle}
          />
        ))}
      </div>

      {filteredThemes.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No battles found matching your criteria.</p>
          <Button
            onClick={() => setShowCreateTheme(true)}
            className="mt-4"
            variant="outline"
          >
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
  );
}