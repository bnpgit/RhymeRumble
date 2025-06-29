import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Lightbulb, Plus, Sparkles, Wand2 } from 'lucide-react';
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
  const navigate = useNavigate();
  const createTheme = useCreateTheme();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<ThemeFormData>();

  const currentValues = watch();

  const onSubmit = async (data: ThemeFormData) => {
    if (!user) {
      navigate('/auth');
      return;
    }

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
    { 
      title: 'Technology: Helper or Master', 
      sides: ['Helper', 'Master'],
      description: 'Technology surrounds us daily - does it serve humanity as a helpful tool, or have we become enslaved to its demands? Express your perspective on our digital relationship.'
    },
    { 
      title: 'Rain: Blessing or Burden', 
      sides: ['Blessing', 'Burden'],
      description: 'Rain brings life to parched earth and fills our reservoirs, yet it can also flood homes and ruin plans. Which face of rain speaks to your soul?'
    },
    { 
      title: 'Silence: Peace or Void', 
      sides: ['Peace', 'Void'],
      description: 'In silence, some find tranquility and meditation, while others discover loneliness and emptiness. What does silence whisper to you?'
    },
    { 
      title: 'Dreams: Escape or Reality', 
      sides: ['Escape', 'Reality'],
      description: 'Dreams can be a refuge from harsh reality or a glimpse into our deepest truths. Do your dreams offer escape or reveal reality?'
    },
    { 
      title: 'Ocean: Calm or Storm', 
      sides: ['Calm', 'Storm'],
      description: 'The ocean can be a peaceful sanctuary with gentle waves, or a raging tempest of destruction. Which ocean calls to your heart?'
    },
    { 
      title: 'Memory: Treasure or Burden', 
      sides: ['Treasure', 'Burden'],
      description: 'Memories can be precious gems we cherish forever, or heavy chains that bind us to the past. How do your memories shape you?'
    }
  ];

  const fillExample = (example: { title: string; sides: [string, string]; description: string }) => {
    setValue('title', example.title);
    setValue('duality_option_1', example.sides[0]);
    setValue('duality_option_2', example.sides[1]);
    setValue('description', example.description);
  };

  const generateRandomExample = () => {
    const randomExample = themeExamples[Math.floor(Math.random() * themeExamples.length)];
    fillExample(randomExample);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create New Battle Theme"
      size="lg"
    >
      <div className="space-y-8">
        {/* Enhanced Inspiration Section */}
        <div className="bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 rounded-2xl p-6 border-2 border-purple-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-purple-500 to-indigo-600 p-2 rounded-xl shadow-lg">
                <Lightbulb className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Get Inspired</h3>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={generateRandomExample}
              className="bg-white/80 hover:bg-white border-purple-300 text-purple-700 hover:text-purple-800 font-bold shadow-lg"
            >
              <Wand2 className="h-4 w-4 mr-2" />
              Random Theme
            </Button>
          </div>
          
          <p className="text-sm text-gray-600 mb-4 font-medium">
            Click any example below to auto-fill the form, or use the random button for surprise inspiration!
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {themeExamples.map((example, index) => (
              <button
                key={index}
                type="button"
                onClick={() => fillExample(example)}
                className="text-left p-4 bg-white/70 hover:bg-white border-2 border-purple-200 rounded-xl hover:border-purple-300 hover:shadow-lg transition-all duration-200 transform hover:scale-105 group"
              >
                <div className="font-bold text-gray-900 group-hover:text-purple-700 transition-colors">
                  {example.title}
                </div>
                <div className="text-xs text-gray-500 mt-1 font-medium">
                  {example.sides[0]} vs {example.sides[1]}
                </div>
                <div className="text-xs text-gray-600 mt-2 line-clamp-2">
                  {example.description.substring(0, 80)}...
                </div>
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
            className="text-lg font-medium border-2 border-gray-300 focus:border-purple-500"
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="First Perspective"
              {...register('duality_option_1', {
                required: 'First perspective is required',
              })}
              error={errors.duality_option_1?.message}
              placeholder="e.g., Friend"
              className="font-medium border-2 border-gray-300 focus:border-purple-500"
            />
            <Input
              label="Second Perspective"
              {...register('duality_option_2', {
                required: 'Second perspective is required',
              })}
              error={errors.duality_option_2?.message}
              placeholder="e.g., Foe"
              className="font-medium border-2 border-gray-300 focus:border-purple-500"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-bold text-gray-700">
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
              className="block w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 leading-6"
              placeholder="Describe the theme and inspire poets to participate. What makes this duality interesting and thought-provoking?"
            />
            {errors.description && (
              <p className="text-sm text-red-600 font-medium">{errors.description.message}</p>
            )}
          </div>

          <Input
            label="End Date (Optional)"
            type="datetime-local"
            {...register('end_date')}
            error={errors.end_date?.message}
            className="text-sm border-2 border-gray-300 focus:border-purple-500"
          />

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-6">
            <div className="flex items-center space-x-2 mb-3">
              <Sparkles className="h-5 w-5 text-blue-600" />
              <h3 className="font-bold text-blue-900">Battle Guidelines</h3>
            </div>
            <ul className="text-sm text-blue-800 space-y-2">
              <li className="flex items-start space-x-2">
                <span className="text-blue-500 mt-0.5 font-bold">•</span>
                <span className="font-medium">Poets can choose any perspective or remain neutral</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-blue-500 mt-0.5 font-bold">•</span>
                <span className="font-medium">Neutral poets participate but cannot win the battle</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-blue-500 mt-0.5 font-bold">•</span>
                <span className="font-medium">Community engagement determines the winning side</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-blue-500 mt-0.5 font-bold">•</span>
                <span className="font-medium">All poets earn participation points for contributing</span>
              </li>
            </ul>
          </div>

          <div className="flex justify-end space-x-4 pt-6 border-t-2 border-gray-200">
            <Button type="button" variant="outline" onClick={onClose} size="lg" className="border-2 border-gray-300">
              Cancel
            </Button>
            <Button 
              type="submit" 
              loading={createTheme.isPending} 
              size="lg"
              className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 shadow-xl hover:shadow-2xl transform hover:scale-105 font-bold"
            >
              <Plus className="h-5 w-5 mr-2" />
              Create Battle
              <Sparkles className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}