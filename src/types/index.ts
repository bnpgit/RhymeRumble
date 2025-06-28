export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  points: number;
  level: number;
  joinedAt: Date;
  friends: string[];
  achievements: Achievement[];
}

export interface Theme {
  id: string;
  title: string;
  duality: [string, string]; // e.g., ["Friend", "Foe"]
  description: string;
  createdBy: string;
  createdAt: Date;
  isActive: boolean;
  endDate?: Date;
  participants: number;
  totalPoems: number;
}

export interface Poem {
  id: string;
  themeId: string;
  authorId: string;
  authorUsername: string;
  title: string;
  content: string;
  side: 'friend' | 'foe' | 'neutral';
  likes: number;
  likedBy: string[];
  createdAt: Date;
  isWinner?: boolean;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt: Date;
}

export interface Battle {
  id: string;
  themeId: string;
  participants: string[];
  poems: Poem[];
  votes: { [poemId: string]: number };
  status: 'active' | 'completed';
  winner?: 'friend' | 'foe' | 'tie';
  endDate: Date;
}