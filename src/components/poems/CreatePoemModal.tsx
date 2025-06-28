import React from 'react';
import { useForm } from 'react-hook-form';
import { PenTool, Send } from 'lucide-react';
import { useCreatePoem } from '../../hooks/usePoems';
import { useAuthStore } from '../../stores/authStore';
import { Theme } from '../../types';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import Input from '../ui/Input';

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
  const createPoem = useCreatePoem();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<PoemFormData>({
    defaultValues: {
      side: 'neutral',
    },
  });

  const selectedSide = watch('side');

  const onSubmit = async (data: PoemFormData) => {
    if (!user) return;

    try {
      await createPoem.mutateAsync({
        ...data,
        theme_id: theme.id,
        author_id: user.id,
      });
      reset();
      onClose();
    } catch (error) {
      // Error is handled in the hook
    }
  };

  const sideOptions = [
    { 
      value: 'option_1' as const, 
      label: theme.duality_option_1, 
      color: 'emerald', 
      description: `Embrace ${theme.duality_option_1.toLowerCase()}` 
    },
    { 
      value: 'option_2' as const, 
      label: theme.duality_option_2, 
      color: 'red', 
      description: `Challenge ${theme.duality_option_2.toLowerCase()}` 
    },
    { 
      value: 'neutral' as const, 
      label: 'Neutral', 
      color: 'gray', 
      description: 'Take a balanced perspective' 
    },
  ];

  const getColorClasses = (color: string, selected: boolean) => {
    const baseClasses = 'p-4 rounded-lg border-2 cursor-pointer transition-all';
    switch (color) {
      case 'emerald':
        return `${baseClasses} ${selected 
          ? 'border-emerald-500 bg-emerald-50' 
          : 'border-emerald-200 hover:border-emerald-300'}`;
      case 'red':
        return `${baseClasses} ${selected 
          ? 'border-red-500 bg-red-50' 
          : 'border-red-200 hover:border-red-300'}`;
      case 'gray':
        return `${baseClasses} ${selected 
          ? 'border-gray-500 bg-gray-50' 
          : 'border-gray-200 hover:border-gray-300'}`;
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
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{theme.title}</h3>
        <p className="text-sm text-gray-600">{theme.description}</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Choose Your Perspective
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
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
                  <h3 className="font-semibold text-gray-900">{option.label}</h3>
                  <p className="text-xs text-gray-600 mt-1">{option.description}</p>
                  {option.value === 'neutral' && (
                    <p className="text-xs text-amber-600 mt-1 font-medium">
                      (Participates but cannot win)
                    </p>
                  )}
                </div>
              </label>
            ))}
          </div>
          {errors.side && (
            <p className="text-sm text-red-600 mt-1">{errors.side.message}</p>
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
          placeholder="Give your poem a title..."
        />

        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            Your Poem
          </label>
          <textarea
            {...register('content', {
              required: 'Poem content is required',
              minLength: {
                value: 10,
                message: 'Poem must be at least 10 characters',
              },
            })}
            rows={8}
            className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono leading-6"
            placeholder="Write your poem here... 

Example haiku:
Fire dances bright
Warming hearts on winter nights
Friend to those in need"
          />
          {errors.content && (
            <p className="text-sm text-red-600">{errors.content.message}</p>
          )}
          <p className="text-xs text-gray-500">
            Tip: Haikus work great! 3 lines with 5-7-5 syllables
          </p>
        </div>

        <div className="flex justify-end space-x-3">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" loading={createPoem.isPending}>
            <Send className="h-4 w-4 mr-2" />
            Submit Poem
          </Button>
        </div>
      </form>
    </Modal>
  );
}