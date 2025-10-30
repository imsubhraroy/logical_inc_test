import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Film } from 'lucide-react';
import React from 'react';

type FormMode = 'login' | 'signup';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface LoginFormData {
    email: string;
    password: string;
}

interface SignupFormData {
    name: string;
    email: string;
    password: string;
}

export function AuthForm() {
    const [mode, setMode] = useState<FormMode>('login');
    const [error, setError] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);
    const { login, signup } = useAuth();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<SignupFormData>();

    const toggleMode = () => {
        setMode(mode === 'login' ? 'signup' : 'login');
        setError('');
        reset();
    };

    const onSubmit = async (data: SignupFormData) => {
        setIsLoading(true);
        setError('');

        try {
            if (mode === 'login') {
                await login({ email: data.email, password: data.password });
            } else {
                await signup(data);
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            setError(err.response?.data?.error || 'An error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100 px-4">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-lg shadow-xl p-8">
                    <div className="flex items-center justify-center mb-8">
                        <Film className="h-12 w-12 text-indigo-600 mr-3" />
                        <h1 className="text-3xl font-bold text-gray-900">
                            Movies Manager
                        </h1>
                    </div>

                    <div className="mb-6">
                        <h2 className="text-2xl font-semibold text-center text-gray-800">
                            {mode === 'login' ? 'Welcome Back' : 'Create Account'}
                        </h2>
                        <p className="text-center text-gray-600 mt-2">
                            {mode === 'login'
                                ? 'Sign in to manage your favorite movies'
                                : 'Sign up to start building your collection'}
                        </p>
                    </div>

                    {error && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                            <p className="text-sm text-red-800">{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        {mode === 'signup' && (
                            <div>
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    {...register('name', {
                                        required: mode === 'signup' ? 'Name is required' : false,
                                        minLength: {
                                            value: 2,
                                            message: 'Name must be at least 2 characters',
                                        },
                                    })}
                                    placeholder="John Doe"
                                    disabled={isLoading}
                                />
                                {errors.name && (
                                    <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
                                )}
                            </div>
                        )}

                        <div>
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                {...register('email', {
                                    required: 'Email is required',
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: 'Invalid email address',
                                    },
                                })}
                                placeholder="john@example.com"
                                disabled={isLoading}
                            />
                            {errors.email && (
                                <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
                            )}
                        </div>

                        <div>
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                {...register('password', {
                                    required: 'Password is required',
                                    minLength: {
                                        value: 6,
                                        message: 'Password must be at least 6 characters',
                                    },
                                })}
                                placeholder="••••••••"
                                disabled={isLoading}
                            />
                            {errors.password && (
                                <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
                            )}
                        </div>

                        <Button type="submit" className="w-full bg-blue-600 text-white rounded" disabled={isLoading}>
                            {isLoading
                                ? 'Please wait...'
                                : mode === 'login'
                                    ? 'Sign In'
                                    : 'Create Account'}
                        </Button>
                    </form>

                    <div className="mt-6 text-center">
                        <button
                            onClick={toggleMode}
                            className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
                            disabled={isLoading}
                        >
                            {mode === 'login'
                                ? "Don't have an account? Sign up"
                                : 'Already have an account? Sign in'}
                        </button>
                    </div>
                </div>

                <p className="text-center text-gray-600 text-sm mt-6">
                    Manage your favorite movies and TV shows in one place
                </p>
            </div>
        </div>
    );
}