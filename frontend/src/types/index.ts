export type MediaType = 'MOVIE' | 'TV_SHOW';

export interface Media {
  id: number;
  title: string;
  type: MediaType;
  director: string;
  budget: number;
  location: string;
  duration: number;
  year: number;
  description?: string;
  imageUrl?: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
}

export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasMore: boolean;
}

export interface MediaResponse {
  data: Media[];
  pagination: PaginationInfo;
}

export interface MediaFormData {
  title: string;
  type: MediaType;
  director: string;
  budget: number;
  location: string;
  duration: number;
  year: number;
  description?: string;
  imageUrl?: string;
}

export interface User {
  id: number;
  email: string;
  name: string;
  createdAt: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface SignupData {
  email: string;
  password: string;
  name: string;
}

export interface LoginData {
  email: string;
  password: string;
}