import axios from "axios";
import {
  Media,
  MediaResponse,
  MediaFormData,
  MediaType,
  AuthResponse,
  SignupData,
  LoginData,
  User,
} from "../types";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to all requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 errors (unauthorized)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export const authApi = {
  signup: async (data: SignupData): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>("/auth/signup", data);
    return response.data;
  },

  login: async (data: LoginData): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>("/auth/login", data);
    return response.data;
  },

  getMe: async (): Promise<User> => {
    const response = await api.get<User>("/auth/me");
    return response.data;
  },
};

export const uploadApi = {
  uploadImage: async (file: File): Promise<{ imageUrl: string }> => {
    const formData = new FormData();
    formData.append("image", file);

    const response = await api.post<{ imageUrl: string }>("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    // Convert relative URL to absolute URL
    const baseUrl = API_URL.replace("/api", "");
    return { imageUrl: `${baseUrl}${response.data.imageUrl}` };
  },

  deleteImage: async (filename: string): Promise<void> => {
    await api.delete(`/upload/${filename}`);
  },
};

export const mediaApi = {
  getAll: async (
    page: number = 1,
    limit: number = 20,
    search?: string,
    type?: MediaType
  ): Promise<MediaResponse> => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const params: any = { page, limit };
    if (search) params.search = search;
    if (type) params.type = type;

    const response = await api.get<MediaResponse>("/media", { params });
    return response.data;
  },

  getById: async (id: number): Promise<Media> => {
    const response = await api.get<Media>(`/media/${id}`);
    return response.data;
  },

  create: async (data: MediaFormData): Promise<Media> => {
    const response = await api.post<Media>("/media", data);
    return response.data;
  },

  update: async (id: number, data: Partial<MediaFormData>): Promise<Media> => {
    const response = await api.put<Media>(`/media/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/media/${id}`);
  },
};
