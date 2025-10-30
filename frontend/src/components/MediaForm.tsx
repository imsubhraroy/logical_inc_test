import { useForm } from 'react-hook-form';
import { Media, MediaFormData } from '../types';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ImageUpload } from './ImageUpload';
import React from 'react';

interface MediaFormProps {
  initialData?: Media;
  onSubmit: (data: MediaFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export function MediaForm({ initialData, onSubmit, onCancel, isLoading }: MediaFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<MediaFormData>({
    defaultValues: initialData || {
      type: 'MOVIE',
      year: new Date().getFullYear(),
      imageUrl: '',
    },
  });

  const selectedType = watch('type');
  const imageUrl = watch('imageUrl');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <Label htmlFor="title">Title *</Label>
          <Input
            id="title"
            {...register('title', { required: 'Title is required' })}
            placeholder="Enter title"
            className='mt-2'
          />
          {errors.title && (
            <p className="text-sm text-red-500 mt-1">{errors.title.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="type">Type *</Label>
          <div className='mt-2'></div>
          <Select
            value={selectedType}
            onValueChange={(value) => setValue('type', value as 'MOVIE' | 'TV_SHOW')}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="MOVIE">Movie</SelectItem>
              <SelectItem value="TV_SHOW">TV Show</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="director">Director *</Label>
          <Input
            id="director"
            {...register('director', { required: 'Director is required' })}
            placeholder="Enter director name"
            className='mt-2'
          />
          {errors.director && (
            <p className="text-sm text-red-500 mt-1">{errors.director.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="budget">Budget (INR) *</Label>
          <Input
            id="budget"
            type="number"
            {...register('budget', {
              required: 'Budget is required',
              valueAsNumber: true,
              min: { value: 0, message: 'Budget must be positive' },
            })}
            placeholder="Enter budget"
            className='mt-2'
          />
          {errors.budget && (
            <p className="text-sm text-red-500 mt-1">{errors.budget.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="location">Location *</Label>
          <Input
            id="location"
            {...register('location', { required: 'Location is required' })}
            placeholder="Enter filming location"
            className='mt-2'
          />
          {errors.location && (
            <p className="text-sm text-red-500 mt-1">{errors.location.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="duration">Duration (minutes) *</Label>
          <Input
            id="duration"
            type="number"
            {...register('duration', {
              required: 'Duration is required',
              valueAsNumber: true,
              min: { value: 1, message: 'Duration must be at least 1 minute' },
            })}
            placeholder="Enter duration"
            className='mt-2'
          />
          {errors.duration && (
            <p className="text-sm text-red-500 mt-1">{errors.duration.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="year">Year *</Label>
          <Input
            id="year"
            type="number"
            {...register('year', {
              required: 'Year is required',
              valueAsNumber: true,
              min: { value: 1888, message: 'Year must be 1888 or later' },
              max: {
                value: new Date().getFullYear() + 5,
                message: 'Year cannot be too far in the future',
              },
            })}
            placeholder="Enter year"
            className='mt-2'
          />
          {errors.year && (
            <p className="text-sm text-red-500 mt-1">{errors.year.message}</p>
          )}
        </div>

        <div className="col-span-2">
          <ImageUpload
            value={imageUrl}
            onChange={(url) => setValue('imageUrl', url)}
            onClear={() => setValue('imageUrl', '')}
          />
        </div>

        <div className="col-span-2">
          <Label htmlFor="description">Description</Label>
          <textarea
            id="description"
            {...register('description')}
            className="flex mt-2 min-h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Enter description"
          />
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading} className='bg-blue-700 text-white border rounded items-center text-center'>
          {isLoading ? 'Saving...' : initialData ? 'Update' : 'Create'}
        </Button>
      </div>
    </form>
  );
}