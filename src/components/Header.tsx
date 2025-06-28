import React from 'react';
import { User, Crown, Users, PenTool, Menu } from 'lucide-react';

interface HeaderProps {
  currentUser?: any;
  onNavigate: (page: string) => void;
  currentPage: string;
}

export default function Header({ currentUser, onNavigate, currentPage }: HeaderProps) {
  const navItems = [
    { id: 'home', label: 'Battles', icon: PenTool },
    { id: 'leaderboard', label: 'Leaderboard', icon: Crown },
    { id: 'social', label: 'Social', icon: Users },
  ];

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center space-x-2 text-2xl font-bold text-indigo-600 hover:text-indigo-700 transition-colors"
            >
              <PenTool className="h-8 w-8" />
              <span>RhymeRumble</span>
            </button>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            {navItems.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => onNavigate(id)}
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentPage === id
                    ? 'text-indigo-600 bg-indigo-50'
                    : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </button>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            {currentUser ? (
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{currentUser.username}</p>
                  <p className="text-xs text-gray-500">{currentUser.points} points</p>
                </div>
                <div className="h-8 w-8 bg-indigo-600 rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-white" />
                </div>
              </div>
            ) : (
              <button
                onClick={() => onNavigate('auth')}
                className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition-colors"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}