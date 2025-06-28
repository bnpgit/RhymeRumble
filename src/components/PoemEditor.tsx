import React, { useState } from 'react';
import { X, PenTool, Send } from 'lucide-react';
import { Theme } from '../types';

interface PoemEditorProps {
  theme: Theme;
  onClose: () => void;
  onSubmit: (poem: { title: string; content: string; side: 'friend' | 'foe' | 'neutral' }) => void;
}

export default function PoemEditor({ theme, onClose, onSubmit }: PoemEditorProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedSide, setSelectedSide] = useState<'friend' | 'foe' | 'neutral'>('neutral');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && content.trim()) {
      onSubmit({ title: title.trim(), content: content.trim(), side: selectedSide });
    }
  };

  const sideOptions = [
    { value: 'friend' as const, label: theme.duality[0], color: 'emerald', description: `Embrace ${theme.duality[0].toLowerCase()}` },
    { value: 'foe' as const, label: theme.duality[1], color: 'red', description: `Challenge ${theme.duality[1].toLowerCase()}` },
    { value: 'neutral' as const, label: 'Neutral', color: 'gray', description: 'Take a balanced perspective' },
  ];

  const getColorClasses = (color: string, selected: boolean) => {
    const baseClasses = 'p-4 rounded-lg border-2 cursor-pointer transition-all';
    switch (color) {
      case 'emerald':
        return `${baseClasses} ${selected 
          ? 'border-emerald-500 bg-emerald-50' 
          : 'border-emerald-200 hover:border-emerald-300'}`;
      case 'red':
        return `${baseClasses} ${selected 
          ? 'border-red-500 bg-red-50' 
          : 'border-red-200 hover:border-red-300'}`;
      case 'gray':
        return `${baseClasses} ${selected 
          ? 'border-gray-500 bg-gray-50' 
          : 'border-gray-200 hover:border-gray-300'}`;
      default:
        return baseClasses;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="bg-indigo-100 p-2 rounded-lg">
              <PenTool className="h-6 w-6 text-indigo-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Create Your Poem</h2>
              <p className="text-sm text-gray-600">{theme.title}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Choose Your Perspective
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {sideOptions.map((option) => (
                <div
                  key={option.value}
                  onClick={() => setSelectedSide(option.value)}
                  className={getColorClasses(option.color, selectedSide === option.value)}
                >
                  <div className="text-center">
                    <h3 className="font-semibold text-gray-900">{option.label}</h3>
                    <p className="text-xs text-gray-600 mt-1">{option.description}</p>
                    {option.value === 'neutral' && (
                      <p className="text-xs text-amber-600 mt-1 font-medium">
                        (Participates but cannot win)
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Poem Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Give your poem a title..."
              required
            />
          </div>

          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
              Your Poem
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={8}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-mono leading-6"
              placeholder="Write your poem here... 

Example haiku:
Fire dances bright
Warming hearts on winter nights
Friend to those in need"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Tip: Haikus work great! 3 lines with 5-7-5 syllables
            </p>
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center space-x-2"
            >
              <Send className="h-4 w-4" />
              <span>Submit Poem</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}