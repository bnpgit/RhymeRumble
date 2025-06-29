import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, User } from 'lucide-react';
import { Poem } from '../../types';
import { useAuthStore } from '../../stores/authStore';
import { useLikePoem } from '../../hooks/usePoems';
import Button from '../ui/Button';

interface PoemCardProps {
  poem: Poem;
}

export default function PoemCard({ poem }: PoemCardProps) {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const likePoem = useLikePoem();

  const handleLike = () => {
    if (!user) {
      navigate('/auth');
      return;
    }
    
    likePoem.mutate({
      poemId: poem.id,
      userId: user.id,
      isLiked: poem.is_liked || false,
    });
  };

  const getSideColor = (side: string) => {
    switch (side) {
      case 'option_1':
        return 'bg-emerald-100 text-emerald-800';
      case 'option_2':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getSideLabel = (side: string) => {
    switch (side) {
      case 'option_1':
        return 'Option 1';
      case 'option_2':
        return 'Option 2';
      default:
        return 'Neutral';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-full bg-indigo-600 flex items-center justify-center overflow-hidden">
            {poem.author?.avatar_url ? (
              <img
                src={poem.author.avatar_url}
                alt={poem.author.username}
                className="h-full w-full object-cover"
              />
            ) : (
              <User className="h-5 w-5 text-white" />
            )}
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">{poem.author?.username}</h4>
            <p className="text-sm text-gray-500">
              {new Date(poem.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSideColor(poem.side)}`}>
          {getSideLabel(poem.side)}
        </span>
      </div>

      <h3 className="text-lg font-bold text-gray-900 mb-3">{poem.title}</h3>
      
      <div className="bg-gray-50 rounded-lg p-4 mb-4">
        <pre className="whitespace-pre-wrap font-serif text-gray-800 leading-relaxed">
          {poem.content}
        </pre>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLike}
            disabled={likePoem.isPending}
            className={`${poem.is_liked ? 'text-red-500' : 'text-gray-500'} hover:text-red-500`}
          >
            <Heart className={`h-4 w-4 mr-1 ${poem.is_liked ? 'fill-current' : ''}`} />
            {poem.likes_count}
          </Button>
        </div>
        <p className="text-xs text-gray-500">
          {new Date(poem.created_at).toLocaleTimeString()}
        </p>
      </div>
    </div>
  );
}