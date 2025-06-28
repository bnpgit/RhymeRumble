import React, { useState } from 'react';
import { Plus, Search, Filter, TrendingUp } from 'lucide-react';
import ThemeCard from './ThemeCard';
import PoemEditor from './PoemEditor';
import CreateTheme from './CreateTheme';
import { Theme } from '../types';

interface BattleDashboardProps {
  currentUser: any;
}

export default function BattleDashboard({ currentUser }: BattleDashboardProps) {
  const [showPoemEditor, setShowPoemEditor] = useState(false);
  const [showCreateTheme, setShowCreateTheme] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState<Theme | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState<'all' | 'active' | 'completed'>('all');

  // Mock themes data
  const mockThemes: Theme[] = [
    {
      id: '1',
      title: 'Fire: Friend or Foe',
      duality: ['Friend', 'Foe'],
      description: 'Fire can warm our hearts and homes, or destroy everything in its path. Where do you stand?',
      createdBy: 'user1',
      createdAt: new Date(),
      isActive: true,
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      participants: 23,
      totalPoems: 45,
    },
    {
      id: '2',
      title: 'Time: Past or Future',
      duality: ['Past', 'Future'],
      description: 'Do we find wisdom in looking back, or hope in looking forward? Choose your temporal allegiance.',
      createdBy: 'user2',
      createdAt: new Date(),
      isActive: true,
      endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      participants: 18,
      totalPoems: 31,
    },
    {
      id: '3',
      title: 'Ocean: Calm or Storm',
      duality: ['Calm', 'Storm'],
      description: 'The ocean can be a peaceful sanctuary or a raging tempest. Which face speaks to your soul?',
      createdBy: 'user3',
      createdAt: new Date(),
      isActive: false,
      participants: 31,
      totalPoems: 67,
    },
  ];

  const handleJoinBattle = (themeId: string) => {
    const theme = mockThemes.find(t => t.id === themeId);
    if (theme) {
      setSelectedTheme(theme);
      setShowPoemEditor(true);
    }
  };

  const handleSubmitPoem = (poem: { title: string; content: string; side: 'friend' | 'foe' | 'neutral' }) => {
    console.log('Submitting poem:', poem, 'for theme:', selectedTheme?.title);
    setShowPoemEditor(false);
    setSelectedTheme(null);
    // Here you would typically save the poem to your backend
  };

  const handleCreateTheme = (theme: { title: string; duality: [string, string]; description: string }) => {
    console.log('Creating new theme:', theme);
    setShowCreateTheme(false);
    // Here you would typically save the theme to your backend
  };

  const filteredThemes = mockThemes.filter(theme => {
    const matchesSearch = theme.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         theme.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterBy === 'all' || 
                         (filterBy === 'active' && theme.isActive) ||
                         (filterBy === 'completed' && !theme.isActive);
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Poetry Battles</h1>
          <p className="text-gray-600">Choose your side and let your words do the fighting</p>
        </div>
        <button
          onClick={() => setShowCreateTheme(true)}
          className="mt-4 sm:mt-0 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="h-5 w-5" />
          <span>Create Battle</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 rounded-xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-indigo-100">Your Points</p>
              <p className="text-2xl font-bold">{currentUser.points}</p>
            </div>
            <TrendingUp className="h-8 w-8 text-indigo-200" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-6 rounded-xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-emerald-100">Active Battles</p>
              <p className="text-2xl font-bold">{mockThemes.filter(t => t.isActive).length}</p>
            </div>
            <Plus className="h-8 w-8 text-emerald-200" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-amber-500 to-orange-600 p-6 rounded-xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-amber-100">Your Level</p>
              <p className="text-2xl font-bold">{currentUser.level}</p>
            </div>
            <TrendingUp className="h-8 w-8 text-amber-200" />
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search battles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <select
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value as 'all' | 'active' | 'completed')}
            className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
          >
            <option value="all">All Battles</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
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
          <button
            onClick={() => setShowCreateTheme(true)}
            className="mt-4 text-indigo-600 hover:text-indigo-700 font-medium"
          >
            Create the first one!
          </button>
        </div>
      )}

      {/* Modals */}
      {showPoemEditor && selectedTheme && (
        <PoemEditor
          theme={selectedTheme}
          onClose={() => {
            setShowPoemEditor(false);
            setSelectedTheme(null);
          }}
          onSubmit={handleSubmitPoem}
        />
      )}

      {showCreateTheme && (
        <CreateTheme
          onClose={() => setShowCreateTheme(false)}
          onSubmit={handleCreateTheme}
        />
      )}
    </div>
  );
}