import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PenTool, Zap, Users, Trophy, ArrowRight, Crown, Sparkles, Heart, Star } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';

export default function LandingPage() {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const handleGetStarted = () => {
    navigate('/auth?mode=signup');
  };

  const handleSignIn = () => {
    navigate('/auth?mode=signin');
  };

  const features = [
    {
      icon: PenTool,
      title: 'Creative Dualities',
      description: 'Write poems on themes with opposing sides - Fire as Friend vs Foe, Past vs Future',
      gradient: 'from-purple-500 to-indigo-600',
    },
    {
      icon: Zap,
      title: 'Battle & Vote',
      description: 'Compete with fellow poets and let the community decide the winning side',
      gradient: 'from-orange-500 to-red-600',
    },
    {
      icon: Users,
      title: 'Social Poetry',
      description: 'Connect with other poets, make friends, and invite them to epic poetry battles',
      gradient: 'from-emerald-500 to-teal-600',
    },
    {
      icon: Trophy,
      title: 'Rise the Ranks',
      description: 'Earn points, unlock achievements, and climb the leaderboards',
      gradient: 'from-amber-500 to-yellow-600',
    },
  ];

  const poetQuotes = [
    {
      quote: "Poetry is when an emotion has found its thought and the thought has found words.",
      author: "Robert Frost",
      avatar: '🌟',
    },
    {
      quote: "A poet is, before anything else, a person who is passionately in love with language.",
      author: "W.H. Auden",
      avatar: '📝',
    },
    {
      quote: "Poetry is the spontaneous overflow of powerful feelings.",
      author: "William Wordsworth",
      avatar: '💫',
    },
    {
      quote: "Poetry is not a turning loose of emotion, but an escape from emotion.",
      author: "T.S. Eliot",
      avatar: '🎭',
    },
    {
      quote: "The poet is the priest of the invisible.",
      author: "Wallace Stevens",
      avatar: '✨',
    },
    {
      quote: "Poetry is the rhythmical creation of beauty in words.",
      author: "Edgar Allan Poe",
      avatar: '🖋️',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      {/* Navigation */}
      <nav className="relative z-10 px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2 text-2xl font-bold text-white">
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-2 rounded-xl shadow-lg">
              <PenTool className="h-8 w-8 text-white" />
            </div>
            <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
              RhymeRumble
            </span>
          </div>
          
          <div className="flex items-center space-x-4">
            {user ? (
              <button
                onClick={() => navigate('/dashboard')}
                className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-3 rounded-xl font-bold hover:from-emerald-600 hover:to-teal-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
              >
                Go to Dashboard
              </button>
            ) : (
              <>
                <button
                  onClick={handleSignIn}
                  className="text-white hover:text-yellow-300 font-medium transition-colors"
                >
                  Sign In
                </button>
                <button
                  onClick={handleGetStarted}
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-3 rounded-xl font-bold hover:from-yellow-500 hover:to-orange-600 transform hover:scale-105 transition-all duration-200 shadow-lg"
                >
                  Get Started
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-20">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-6 rounded-full shadow-2xl animate-float">
                  <PenTool className="h-16 w-16 text-white" />
                </div>
                <div className="absolute -top-2 -right-2">
                  <Sparkles className="h-8 w-8 text-yellow-400 animate-pulse" />
                </div>
              </div>
            </div>
            
            <h1 className="text-7xl md:text-8xl font-bold mb-8 animate-slideInUp">
              <span className="bg-gradient-to-r from-yellow-300 via-orange-300 to-red-300 bg-clip-text text-transparent">
                Rhyme
              </span>
              <span className="bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 bg-clip-text text-transparent">
                Rumble
              </span>
            </h1>
            
            <p className="text-2xl md:text-3xl text-white/90 mb-8 max-w-4xl mx-auto leading-relaxed animate-slideInUp" style={{ animationDelay: '0.2s' }}>
              Where poetry meets competition. Create, battle, and connect through the power of words.
            </p>
            
            <div className="text-xl text-white/70 mb-12 max-w-3xl mx-auto animate-slideInUp" style={{ animationDelay: '0.4s' }}>
              Write haikus and short poems on themes with dualities. Choose your side, battle other poets, and let the community crown the victor.
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slideInUp" style={{ animationDelay: '0.6s' }}>
              <button
                onClick={handleGetStarted}
                className="bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-600 text-white px-10 py-5 rounded-2xl text-xl font-bold hover:from-emerald-500 hover:via-teal-600 hover:to-cyan-700 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-3xl flex items-center space-x-3"
              >
                <span>{user ? 'Continue Your Journey' : 'Start Your Poetry Journey'}</span>
                <ArrowRight className="h-6 w-6" />
              </button>
              
              {!user && (
                <div className="flex items-center space-x-2 text-white/80">
                  <Star className="h-5 w-5 text-yellow-400" />
                  <span className="text-lg">Free to join • No credit card required</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-gradient-to-br from-slate-900 to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent mb-6">
              Express, Compete, Connect
            </h2>
            <p className="text-2xl text-white/80 max-w-3xl mx-auto">
              Join a community where every word matters and every poem tells a story
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map(({ icon: Icon, title, description, gradient }, index) => (
              <div
                key={title}
                className="text-center p-8 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105 animate-slideInUp"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`bg-gradient-to-r ${gradient} p-4 rounded-2xl w-fit mx-auto mb-6 shadow-xl`}>
                  <Icon className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
                <p className="text-white/70 leading-7">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* What Poets Are Saying Section */}
      <div className="py-20 bg-gradient-to-br from-purple-900 to-indigo-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold bg-gradient-to-r from-pink-300 to-purple-300 bg-clip-text text-transparent mb-6">
              What Great Minds Say About Poetry
            </h2>
            <p className="text-xl text-white/80">Timeless wisdom from legendary poets and writers</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {poetQuotes.map((quote, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105 animate-slideInUp"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center space-x-4 mb-6">
                  <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-3 rounded-full text-2xl shadow-lg">
                    {quote.avatar}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white">{quote.author}</h4>
                    <p className="text-white/60">Legendary Poet</p>
                  </div>
                </div>
                <p className="text-white/80 text-lg leading-relaxed italic">
                  "{quote.quote}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-rose-600 via-pink-600 to-purple-700">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Crown className="h-16 w-16 text-yellow-400 mx-auto mb-4 animate-float" />
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-8">
            Ready to Rumble?
          </h2>
          <p className="text-2xl text-white/90 mb-12">
            Join poets from around the world in the ultimate battle of words
          </p>
          <button
            onClick={handleGetStarted}
            className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white px-12 py-6 rounded-2xl text-2xl font-bold hover:from-yellow-500 hover:via-orange-600 hover:to-red-600 transform hover:scale-105 transition-all duration-300 shadow-2xl flex items-center space-x-3 mx-auto"
          >
            <span>{user ? 'Continue Writing' : 'Start Writing Today'}</span>
            <Heart className="h-8 w-8" />
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 text-2xl font-bold text-white mb-4">
              <PenTool className="h-8 w-8 text-yellow-400" />
              <span>RhymeRumble</span>
            </div>
            <p className="text-gray-400">
              © 2024 RhymeRumble. Where poetry meets passion.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}