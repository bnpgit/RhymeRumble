import React from 'react';
import { useForm } from 'react-hook-form';
import { Lightbulb, Plus } from 'lucide-react';
import { useCreateTheme } from '../../hooks/useThemes';
import { useAuthStore } from '../../stores/authStore';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import Input from '../ui/Input';

interface CreateThemeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ThemeFormData {
  title: string;
  description: string;
  duality_option_1: string;
  duality_option_2: string;
  end_date?: string;
}

export default function CreateThemeModal({ isOpen, onClose }: CreateThemeModalProps) {
  const { user } = useAuthStore();
  const createTheme = useCreateTheme();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ThemeFormData>();

  const onSubmit = async (data: ThemeFormData) => {
    if (!user) return;

    try {
      await createTheme.mutateAsync({
        ...data,
        created_by: user.id,
        end_date: data.end_date || undefined,
      });
      reset();
      onClose();
    } catch (error) {
      // Error is handled in the hook
    }
  };

  const themeExamples = [
    { title: 'Technology: Helper or Master', sides: ['Helper', 'Master'] },
    { title: 'Rain: Blessing or Burden', sides: ['Blessing', 'Burden'] },
    { title: 'Silence: Peace or Void', sides: ['Peace', 'Void'] },
    { title: 'Dreams: Escape or Reality', sides: ['Escape', 'Reality'] },
  ];

  const fillExample = (example: { title: string; sides: [string, string] }) => {
    reset({
      title: example.title,
      duality_option_1: example.sides[0],
      duality_option_2: example.sides[1],
      description: `Explore the dual nature of ${example.title.split(':')[0].toLowerCase()}. Which perspective resonates with your poetic voice?`,
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create New Battle Theme"
      size="lg"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Inspiration Examples
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
            {themeExamples.map((example, index) => (
              <button
                key={index}
                type="button"
                onClick={() => fillExample(example)}
                className="text-left p-3 border border-gray-200 rounded-lg hover:border-indigo-300 hover:bg-indigo-50 transition-colors"
              >
                <div className="font-medium text-sm text-gray-900">{example.title}</div>
                <div className="text-xs text-gray-500">
                  {example.sides[0]} vs {example.sides[1]}
                </div>
              </button>
            ))}
          </div>
        </div>

        <Input
          label="Battle Theme Title"
          {...register('title', {
            required: 'Title is required',
            minLength: {
              value: 5,
              message: 'Title must be at least 5 characters',
            },
          })}
          error={errors.title?.message}
          placeholder="e.g., Fire: Friend or Foe"
        />

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="First Perspective"
            {...register('duality_option_1', {
              required: 'First perspective is required',
            })}
            error={errors.duality_option_1?.message}
            placeholder="e.g., Friend"
          />
          <Input
            label="Second Perspective"
            {...register('duality_option_2', {
              required: 'Second perspective is required',
            })}
            error={errors.duality_option_2?.message}
            placeholder="e.g., Foe"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            Battle Description
          </label>
          <textarea
            {...register('description', {
              required: 'Description is required',
              minLength: {
                value: 20,
                message: 'Description must be at least 20 characters',
              },
            })}
            rows={4}
            className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            placeholder="Describe the theme and inspire poets to participate. What makes this duality interesting?"
          />
          {errors.description && (
            <p className="text-sm text-red-600">{errors.description.message}</p>
          )}
        </div>

        <Input
          label="End Date (Optional)"
          type="datetime-local"
          {...register('end_date')}
          error={errors.end_date?.message}
        />

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-medium text-blue-900 mb-2">Battle Rules Reminder</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Poets can choose any perspective or remain neutral</li>
            <li>• Neutral poets participate but cannot win the battle</li>
            <li>• The side with the most total likes across all poems wins</li>
            <li>• All poets earn participation points</li>
          </ul>
        </div>

        <div className="flex justify-end space-x-3">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" loading={createTheme.isPending}>
            <Plus className="h-4 w-4 mr-2" />
            Create Battle
          </Button>
        </div>
      </form>
    </Modal>
  );
}