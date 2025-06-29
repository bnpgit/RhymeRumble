import React from 'react';
import ProfileForm from '../components/profile/ProfileForm';
import GeometricShapes from '../components/ui/GeometricShapes';

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-700 relative overflow-hidden">
      {/* Animated Geometric Shapes Background */}
      <GeometricShapes colors={['rgba(99, 102, 241, 0.4)', 'rgba(168, 85, 247, 0.4)', 'rgba(236, 72, 153, 0.4)']} />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-yellow-300 via-orange-300 to-red-300 bg-clip-text text-transparent mb-4 animate-float">
            Profile Settings
          </h1>
          <p className="text-white/90 text-xl font-medium">Manage your account and preferences</p>
        </div>

        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-white/50">
          <ProfileForm />
        </div>
      </div>
    </div>
  );
}