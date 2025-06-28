import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import AuthForm from '../../components/auth/AuthForm';

// Mock the auth store
vi.mock('../../stores/authStore', () => ({
  useAuthStore: () => ({
    signIn: vi.fn(),
    signUp: vi.fn(),
  }),
}));

describe('AuthForm', () => {
  it('renders sign in form by default', () => {
    render(<AuthForm mode="signin" onToggleMode={() => {}} />);
    
    expect(screen.getByText('Welcome back!')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  it('renders sign up form when mode is signup', () => {
    render(<AuthForm mode="signup" onToggleMode={() => {}} />);
    
    expect(screen.getByText('Join RhymeRumble')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /create account/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
  });

  it('validates required fields', async () => {
    render(<AuthForm mode="signin" onToggleMode={() => {}} />);
    
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));
    
    await waitFor(() => {
      expect(screen.getByText('Email is required')).toBeInTheDocument();
      expect(screen.getByText('Password is required')).toBeInTheDocument();
    });
  });

  it('toggles password visibility', () => {
    render(<AuthForm mode="signin" onToggleMode={() => {}} />);
    
    const passwordInput = screen.getByLabelText(/password/i);
    const toggleButton = screen.getByRole('button', { name: '' }); // Eye icon button
    
    expect(passwordInput).toHaveAttribute('type', 'password');
    
    fireEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute('type', 'text');
  });
});