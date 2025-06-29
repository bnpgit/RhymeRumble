import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { PenTool, Send, Lightbulb, Sparkles } from 'lucide-react';
import { useCreatePoem } from '../../hooks/usePoems';
import { useAuthStore } from '../../stores/authStore';
import { Theme } from '../../types';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import Input from '../ui/Input';
import toast from 'react-hot-toast';

interface CreatePoemModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: Theme;
}

interface PoemFormData {
  title: string;
  content: string;
  side: 'option_1' | 'option_2' | 'neutral';
}

export default function CreatePoemModal({ isOpen, onClose, theme }: CreatePoemModalProps) {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const createPoem = useCreatePoem();
  const [showInspiration, setShowInspiration] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<PoemFormData>({
    defaultValues: {
      side: 'neutral',
    },
  });

  const selectedSide = watch('side');

  // Poem inspiration suggestions based on theme
  const getInspiration = () => {
    const inspirations = {
      'Fire': [
        'Flames dance in the night,\nWarming hearts with golden light,\nFriend to those in need.',
        'Blazing fury burns,\nDestroying all in its path,\nFoe of peaceful dreams.',
        'Fire speaks in tongues,\nBoth creator and destroyer,\nNature\'s dual essence.'
      ],
      'Time': [
        'Past whispers softly,\nLessons learned in yesterday,\nWisdom\'s gentle guide.',
        'Future calls ahead,\nPromises of what could be,\nHope\'s eternal flame.',
        'Time flows like water,\nPast and future intertwined,\nPresent moment\'s gift.'
      ],
      'Ocean': [
        'Gentle waves caress,\nPeaceful blue expanse of calm,\nSoul\'s tranquil refuge.',
        'Tempest rages wild,\nCrashing waves destroy the shore,\nNature\'s mighty wrath.',
        'Ocean holds secrets,\nCalm surface, depths unknown,\nMystery eternal.'
      ]
    };

    const themeKey = Object.keys(inspirations).find(key => 
      theme.title.toLowerCase().includes(key.toLowerCase())
    );
    
    return themeKey ? inspirations[themeKey as keyof typeof inspirations] : [
      'Words flow like rivers,\nCarrying thoughts to new shores,\nPoetry\'s sweet gift.',
      'Silence speaks volumes,\nIn the space between heartbeats,\nTruth finds its voice.',
      'Dreams paint the darkness,\nWith colors of possibility,\nHope\'s canvas unfolds.'
    ];
  };

  const handleInspiration = () => {
    const inspirations = getInspiration();
    const randomInspiration = inspirations[Math.floor(Math.random() * inspirations.length)];
    setValue('content', randomInspiration);
    setShowInspiration(true);
    setTimeout(() => setShowInspiration(false), 2000);
  };

  const onSubmit = async (data: PoemFormData) => {
    if (!user) {
      navigate('/auth');
      return;
    }

    try {
      await createPoem.mutateAsync({
        ...data,
        theme_id: theme.id,
        author_id: user.id,
      });
      reset();
      onClose();
      toast.success('🎉 Your poem has been submitted successfully!');
    } catch (error) {
      console.error('Error creating poem:', error);
      toast.error('Failed to submit poem. Please try again.');
    }
  };

  const sideOptions = [
    { 
      value: 'option_1' as const, 
      label: theme.duality_option_1, 
      color: 'emerald', 
      description: `Embrace ${theme.duality_option_1.toLowerCase()}`,
      gradient: 'from-emerald-400 to-emerald-600'
    },
    { 
      value: 'option_2' as const, 
      label: theme.duality_option_2, 
      color: 'red', 
      description: `Challenge ${theme.duality_option_2.toLowerCase()}`,
      gradient: 'from-red-400 to-red-600'
    },
    { 
      value: 'neutral' as const, 
      label: 'Neutral', 
      color: 'gray', 
      description: 'Take a balanced perspective',
      gradient: 'from-gray-400 to-gray-600'
    },
  ];

  const getColorClasses = (color: string, selected: boolean) => {
    const baseClasses = 'p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 transform hover:scale-105 card-hover';
    switch (color) {
      case 'emerald':
        return `${baseClasses} ${selected 
          ? 'border-emerald-500 bg-gradient-to-br from-emerald-50 to-emerald-100 shadow-xl shadow-emerald-500/25' 
          : 'border-emerald-200 hover:border-emerald-300 hover:bg-emerald-50'}`;
      case 'red':
        return `${baseClasses} ${selected 
          ? 'border-red-500 bg-gradient-to-br from-red-50 to-red-100 shadow-xl shadow-red-500/25' 
          : 'border-red-200 hover:border-red-300 hover:bg-red-50'}`;
      case 'gray':
        return `${baseClasses} ${selected 
          ? 'border-gray-500 bg-gradient-to-br from-gray-50 to-gray-100 shadow-xl shadow-gray-500/25' 
          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'}`;
      default:
        return baseClasses;
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create Your Poem"
      size="lg"
    >
      <div className="mb-6 p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl border border-indigo-200">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{theme.title}</h3>
        <p className="text-gray-600">{theme.description}</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-4">
            Choose Your Perspective
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {sideOptions.map((option) => (
              <label
                key={option.value}
                className={getColorClasses(option.color, selectedSide === option.value)}
              >
                <input
                  type="radio"
                  value={option.value}
                  {...register('side', { required: 'Please select a perspective' })}
                  className="sr-only"
                />
                <div className="text-center">
                  <div className={`w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-r ${option.gradient} flex items-center justify-center shadow-lg`}>
                    <span className="text-white font-bold text-lg">
                      {option.label.charAt(0)}
                    </span>
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg">{option.label}</h3>
                  <p className="text-sm text-gray-600 mt-1">{option.description}</p>
                  {option.value === 'neutral' && (
                    <p className="text-xs text-amber-600 mt-2 font-medium bg-amber-50 px-2 py-1 rounded-full">
                      (Participates but cannot win)
                    </p>
                  )}
                </div>
              </label>
            ))}
          </div>
          {errors.side && (
            <p className="text-sm text-red-600 mt-2">{errors.side.message}</p>
          )}
        </div>

        <Input
          label="Poem Title"
          {...register('title', {
            required: 'Title is required',
            minLength: {
              value: 3,
              message: 'Title must be at least 3 characters',
            },
          })}
          error={errors.title?.message}
          placeholder="Give your poem a captivating title..."
          className="text-lg"
        />

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="block text-lg font-semibold text-gray-700">
              Your Poem
            </label>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleInspiration}
              className={`transition-all duration-300 ${showInspiration ? 'animate-popUp bg-yellow-50 border-yellow-300' : ''}`}
            >
              <Lightbulb className={`h-4 w-4 mr-2 ${showInspiration ? 'text-yellow-600' : ''}`} />
              Get Inspired
              {showInspiration && <Sparkles className="h-4 w-4 ml-1 text-yellow-600" />}
            </Button>
          </div>
          <textarea
            {...register('content', {
              required: 'Poem content is required',
              minLength: {
                value: 10,
                message: 'Poem must be at least 10 characters',
              },
            })}
            rows={8}
            className="block w-full px-4 py-3 border border-gray-300 rounded-2xl focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 font-serif leading-7 text-lg shadow-inner bg-gradient-to-br from-white to-gray-50"
            placeholder="Write your poem here... 

Example haiku:
Fire dances bright
Warming hearts on winter nights
Friend to those in need"
          />
          {errors.content && (
            <p className="text-sm text-red-600">{errors.content.message}</p>
          )}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <p className="text-sm text-blue-800">
              <strong>💡 Tip:</strong> Haikus work great! Try 3 lines with 5-7-5 syllables, or express yourself freely in any poetic form.
            </p>
          </div>
        </div>

        <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
          <Button type="button" variant="outline" onClick={onClose} size="lg">
            Cancel
          </Button>
          <Button 
            type="submit" 
            loading={createPoem.isPending} 
            size="lg"
            className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <Send className="h-5 w-5 mr-2" />
            Submit Poem
          </Button>
        </div>
      </form>
    </Modal>
  );
}