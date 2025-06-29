import React, { useState, useEffect } from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';
import { PenTool } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import AuthForm from '../components/auth/AuthForm';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import AnimatedBackground from '../components/ui/AnimatedBackground';

export default function AuthPage() {
  const [searchParams] = useSearchParams();
  const initialMode = searchParams.get('mode') === 'signup' ? 'signup' : 'signin';
  const [mode, setMode] = useState<'signin' | 'signup'>(initialMode);
  const { user, loading } = useAuthStore();

  useEffect(() => {
    const modeParam = searchParams.get('mode');
    if (modeParam === 'signup' || modeParam === 'signin') {
      setMode(modeParam);
    }
  }, [searchParams]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-amber-50 relative overflow-hidden">
        <AnimatedBackground />
        <div className="relative z-10">
          <LoadingSpinner size="lg" />
        </div>
      </div>
    );
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-amber-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated Background */}
      <AnimatedBackground />
      
      <div className="max-w-md w-full space-y-8 relative z-10">
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