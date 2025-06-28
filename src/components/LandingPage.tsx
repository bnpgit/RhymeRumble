import React from 'react';
import { PenTool, Zap, Users, Trophy, ArrowRight } from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

export default function LandingPage({ onGetStarted }: LandingPageProps) {
  const features = [
    {
      icon: PenTool,
      title: 'Creative Dualities',
      description: 'Write poems on themes with opposing sides - Fire as Friend vs Foe, Past vs Future',
    },
    {
      icon: Zap,
      title: 'Battle & Vote',
      description: 'Compete with fellow poets and let the community decide the winning side',
    },
    {
      icon: Users,
      title: 'Social Poetry',
      description: 'Connect with other poets, make friends, and invite them to epic poetry battles',
    },
    {
      icon: Trophy,
      title: 'Rise the Ranks',
      description: 'Earn points, unlock achievements, and climb the leaderboards',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-amber-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-indigo-600 p-4 rounded-full">
                <PenTool className="h-12 w-12 text-white" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              <span className="text-indigo-600">Rhyme</span>
              <span className="text-amber-500">Rumble</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-8">
              Where poetry meets competition. Create, battle, and connect through the power of words.
            </p>
            <div className="text-lg text-gray-500 mb-10 max-w-2xl mx-auto">
              Write haikus and short poems on themes with dualities. Choose your side, battle other poets, and let the community crown the victor.
            </div>
            <button
              onClick={onGetStarted}
              className="bg-indigo-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center space-x-2 mx-auto"
            >
              <span>Start Your Poetry Journey</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Express, Compete, Connect
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join a community where every word matters and every poem tells a story
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map(({ icon: Icon, title, description }, index) => (
              <div
                key={title}
                className="text-center p-6 rounded-xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <div className="bg-indigo-100 p-3 rounded-full w-fit mx-auto mb-4">
                  <Icon className="h-8 w-8 text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
                <p className="text-gray-600 leading-6">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-gradient-to-r from-indigo-600 to-amber-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Rumble?
          </h2>
          <p className="text-xl text-indigo-100 mb-8">
            Join poets from around the world in the ultimate battle of words
          </p>
          <button
            onClick={onGetStarted}
            className="bg-white text-indigo-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transform hover:scale-105 transition-all duration-200 shadow-lg"
          >
            Create Your Account
          </button>
        </div>
      </div>
    </div>
  );
}