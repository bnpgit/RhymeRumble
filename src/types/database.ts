export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          username: string;
          full_name: string | null;
          avatar_url: string | null;
          bio: string | null;
          points: number;
          level: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          username: string;
          full_name?: string | null;
          avatar_url?: string | null;
          bio?: string | null;
          points?: number;
          level?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          username?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          bio?: string | null;
          points?: number;
          level?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      themes: {
        Row: {
          id: string;
          title: string;
          description: string;
          duality_option_1: string;
          duality_option_2: string;
          created_by: string;
          is_active: boolean;
          end_date: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description: string;
          duality_option_1: string;
          duality_option_2: string;
          created_by: string;
          is_active?: boolean;
          end_date?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string;
          duality_option_1?: string;
          duality_option_2?: string;
          created_by?: string;
          is_active?: boolean;
          end_date?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      poems: {
        Row: {
          id: string;
          theme_id: string;
          author_id: string;
          title: string;
          content: string;
          side: 'option_1' | 'option_2' | 'neutral';
          likes_count: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          theme_id: string;
          author_id: string;
          title: string;
          content: string;
          side: 'option_1' | 'option_2' | 'neutral';
          likes_count?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          theme_id?: string;
          author_id?: string;
          title?: string;
          content?: string;
          side?: 'option_1' | 'option_2' | 'neutral';
          likes_count?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      poem_likes: {
        Row: {
          id: string;
          poem_id: string;
          user_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          poem_id: string;
          user_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          poem_id?: string;
          user_id?: string;
          created_at?: string;
        };
      };
      friendships: {
        Row: {
          id: string;
          user_id: string;
          friend_id: string;
          status: 'pending' | 'accepted' | 'blocked';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          friend_id: string;
          status?: 'pending' | 'accepted' | 'blocked';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          friend_id?: string;
          status?: 'pending' | 'accepted' | 'blocked';
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}