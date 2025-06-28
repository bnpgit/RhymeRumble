export interface User {
  id: string;
  username: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  bio?: string;
  points: number;
  level: number;
  created_at: string;
  updated_at: string;
}

export interface Theme {
  id: string;
  title: string;
  description: string;
  duality_option_1: string;
  duality_option_2: string;
  created_by: string;
  is_active: boolean;
  end_date?: string;
  created_at: string;
  updated_at: string;
  participants?: number;
  total_poems?: number;
}

export interface Poem {
  id: string;
  theme_id: string;
  author_id: string;
  title: string;
  content: string;
  side: 'option_1' | 'option_2' | 'neutral';
  likes_count: number;
  created_at: string;
  updated_at: string;
  author?: {
    username: string;
    avatar_url?: string;
  };
  is_liked?: boolean;
}

export interface Friendship {
  id: string;
  user_id: string;
  friend_id: string;
  status: 'pending' | 'accepted' | 'blocked';
  created_at: string;
  updated_at: string;
  friend?: User;
}

export interface AuthState {
  user: User | null;
  session: any;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, username: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateProfile: (updates: Partial<User>) => Promise<void>;
}