import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { User, Mail, FileText, Camera } from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { supabase } from '../../lib/supabase';
import toast from 'react-hot-toast';

interface ProfileFormData {
  username: string;
  full_name: string;
  bio: string;
}

export default function ProfileForm() {
  const { user, updateProfile } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ProfileFormData>({
    defaultValues: {
      username: user?.username || '',
      full_name: user?.full_name || '',
      bio: user?.bio || '',
    },
  });

  // Watch for changes to update form when user data changes
  React.useEffect(() => {
    if (user) {
      setValue('username', user.username || '');
      setValue('full_name', user.full_name || '');
      setValue('bio', user.bio || '');
    }
  }, [user, setValue]);

  const onSubmit = async (data: ProfileFormData) => {
    if (!user) return;
    
    setLoading(true);
    try {
      // Check if username is taken by another user
      if (data.username !== user.username) {
        const { data: existingUser } = await supabase
          .from('profiles')
          .select('id')
          .eq('username', data.username)
          .neq('id', user.id)
          .single();

        if (existingUser) {
          toast.error('Username is already taken by another user');
          setLoading(false);
          return;
        }
      }

      await updateProfile(data);
    } catch (error: any) {
      console.error('Profile update error:', error);
      toast.error(error.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !user) return;

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      await updateProfile({ avatar_url: data.publicUrl });
    } catch (error: any) {
      toast.error(error.message || 'Error uploading avatar');
    } finally {
      setUploading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="text-center">
        <div className="relative inline-block">
          <div className="h-24 w-24 rounded-full bg-indigo-600 flex items-center justify-center mx-auto mb-4 overflow-hidden">
            {user.avatar_url ? (
              <img
                src={user.avatar_url}
                alt={user.username}
                className="h-full w-full object-cover"
              />
            ) : (
              <User className="h-12 w-12 text-white" />
            )}
          </div>
          <label className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg cursor-pointer hover:bg-gray-50">
            <Camera className="h-4 w-4 text-gray-600" />
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarUpload}
              className="hidden"
              disabled={uploading}
            />
          </label>
        </div>
        {uploading && <p className="text-sm text-gray-500">Uploading...</p>}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Username"
          icon={<User className="h-5 w-5 text-gray-400" />}
          {...register('username', {
            required: 'Username is required',
            minLength: {
              value: 3,
              message: 'Username must be at least 3 characters',
            },
            maxLength: {
              value: 30,
              message: 'Username must be less than 30 characters',
            },
            pattern: {
              value: /^[a-zA-Z0-9_]+$/,
              message: 'Username can only contain letters, numbers, and underscores',
            },
          })}
          error={errors.username?.message}
          placeholder="Enter your username"
        />

        <Input
          label="Full Name"
          icon={<User className="h-5 w-5 text-gray-400" />}
          {...register('full_name', {
            maxLength: {
              value: 100,
              message: 'Full name must be less than 100 characters',
            },
          })}
          error={errors.full_name?.message}
          placeholder="Enter your full name (optional)"
        />

        <Input
          label="Email"
          type="email"
          value={user.email}
          disabled
          icon={<Mail className="h-5 w-5 text-gray-400" />}
          className="bg-gray-50"
        />

        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            Bio
          </label>
          <div className="relative">
            <FileText className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <textarea
              {...register('bio', {
                maxLength: {
                  value: 500,
                  message: 'Bio must be less than 500 characters',
                },
              })}
              rows={4}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              placeholder="Tell us about yourself..."
            />
          </div>
          {errors.bio && (
            <p className="text-sm text-red-600">{errors.bio.message}</p>
          )}
        </div>

        <div className="flex justify-end">
          <Button 
            type="submit" 
            loading={loading}
            disabled={loading || uploading}
          >
            Update Profile
          </Button>
        </div>
      </form>

      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="font-medium text-gray-900 mb-2">Your Stats</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-600">Points:</span>
            <span className="ml-2 font-semibold">{user.points}</span>
          </div>
          <div>
            <span className="text-gray-600">Level:</span>
            <span className="ml-2 font-semibold">{user.level}</span>
          </div>
        </div>
      </div>
    </div>
  );
}