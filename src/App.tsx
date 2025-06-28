import React, { useState } from 'react';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import AuthPage from './components/AuthPage';
import BattleDashboard from './components/BattleDashboard';
import Leaderboard from './components/Leaderboard';
import SocialHub from './components/SocialHub';

function App() {
  const [currentPage, setCurrentPage] = useState<'landing' | 'auth' | 'home' | 'leaderboard' | 'social'>('landing');
  const [currentUser, setCurrentUser] = useState<any>(null);

  const handleAuth = (user: any) => {
    setCurrentUser(user);
    setCurrentPage('home');
  };

  const handleNavigate = (page: string) => {
    if (page === 'auth' && !currentUser) {
      setCurrentPage('auth');
    } else if (currentUser || page === 'landing') {
      setCurrentPage(page as any);
    }
  };

  const handleGetStarted = () => {
    if (currentUser) {
      setCurrentPage('home');
    } else {
      setCurrentPage('auth');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {currentPage !== 'landing' && (
        <Header 
          currentUser={currentUser} 
          onNavigate={handleNavigate}
          currentPage={currentPage}
        />
      )}
      
      {currentPage === 'landing' && (
        <LandingPage onGetStarted={handleGetStarted} />
      )}
      
      {currentPage === 'auth' && (
        <AuthPage onAuth={handleAuth} />
      )}
      
      {currentPage === 'home' && currentUser && (
        <BattleDashboard currentUser={currentUser} />
      )}
      
      {currentPage === 'leaderboard' && currentUser && (
        <Leaderboard currentUser={currentUser} />
      )}
      
      {currentPage === 'social' && currentUser && (
        <SocialHub currentUser={currentUser} />
      )}
    </div>
  );
}

export default App;