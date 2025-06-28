import React, { useState } from 'react';
import { X, Lightbulb, Plus } from 'lucide-react';

interface CreateThemeProps {
  onClose: () => void;
  onSubmit: (theme: { title: string; duality: [string, string]; description: string }) => void;
}

export default function CreateTheme({ onClose, onSubmit }: CreateThemeProps) {
  const [title, setTitle] = useState('');
  const [side1, setSide1] = useState('');
  const [side2, setSide2] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && side1.trim() && side2.trim() && description.trim()) {
      onSubmit({
        title: title.trim(),
        duality: [side1.trim(), side2.trim()],
        description: description.trim(),
      });
    }
  };

  const themeExamples = [
    { title: 'Technology: Helper or Master', sides: ['Helper', 'Master'] },
    { title: 'Rain: Blessing or Burden', sides: ['Blessing', 'Burden'] },
    { title: 'Silence: Peace or Void', sides: ['Peace', 'Void'] },
    { title: 'Dreams: Escape or Reality', sides: ['Escape', 'Reality'] },
  ];

  const fillExample = (example: { title: string; sides: [string, string] }) => {
    setTitle(example.title);
    setSide1(example.sides[0]);
    setSide2(example.sides[1]);
    setDescription(`Explore the dual nature of ${example.title.split(':')[0].toLowerCase()}. Which perspective resonates with your poetic voice?`);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="bg-amber-100 p-2 rounded-lg">
              <Lightbulb className="h-6 w-6 text-amber-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Create New Battle Theme</h2>
              <p className="text-sm text-gray-600">Start a new poetry battle for the community</p>
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
              Inspiration Examples
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
              {themeExamples.map((example, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => fillExample(example)}
                  className="text-left p-3 border border-gray-200 rounded-lg hover:border-indigo-300 hover:bg-indigo-50 transition-colors"
                >
                  <div className="font-medium text-sm text-gray-900">{example.title}</div>
                  <div className="text-xs text-gray-500">
                    {example.sides[0]} vs {example.sides[1]}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Battle Theme Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="e.g., Fire: Friend or Foe"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Format: "Subject: Option A or Option B"
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="side1" className="block text-sm font-medium text-gray-700 mb-2">
                First Perspective
              </label>
              <input
                type="text"
                id="side1"
                value={side1}
                onChange={(e) => setSide1(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="e.g., Friend"
                required
              />
            </div>
            <div>
              <label htmlFor="side2" className="block text-sm font-medium text-gray-700 mb-2">
                Second Perspective
              </label>
              <input
                type="text"
                id="side2"
                value={side2}
                onChange={(e) => setSide2(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="e.g., Foe"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Battle Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Describe the theme and inspire poets to participate. What makes this duality interesting?"
              required
            />
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-medium text-blue-900 mb-2">Battle Rules Reminder</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Poets can choose any perspective or remain neutral</li>
              <li>• Neutral poets participate but cannot win the battle</li>
              <li>• The side with the most total likes across all poems wins</li>
              <li>• All poets earn participation points</li>
            </ul>
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
              <Plus className="h-4 w-4" />
              <span>Create Battle</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}