import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { PenTool } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import AuthForm from '../components/auth/AuthForm';
import LoadingSpinner from '../components/ui/LoadingSpinner';

export default function AuthPage() {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const { user, loading } = useAuthStore();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-amber-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="bg-indigo-600 p-3 rounded-full w-fit mx-auto mb-4">
            <PenTool className="h-8 w-8 text-white" />
          </div>
        </div>

        <AuthForm mode={mode} onToggleMode={() => setMode(mode === 'signin' ? 'signup' : 'signin')} />
      </div>
    </div>
  );
}