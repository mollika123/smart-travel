import { Trip, Message } from '@/types/trip';

const API_BASE_URL = '/api'; // Configured with Next.js rewrites to proxy to backend

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  
  const headers = new Headers(options.headers);
  headers.set('Content-Type', 'application/json');
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const config: RequestInit = {
    ...options,
    headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `API request failed with status ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export const api = {
  // Authentication
  auth: {
    login: (email: string) => 
      request<{ token: string; user: { id: string; name: string } }>('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email }),
      }),
    register: (email: string, name: string) => 
      request<{ token: string; user: { id: string; name: string } }>('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ email, name }),
      }),
  },

  // Trips CRUD
  trips: {
    getAll: () => request<Trip[]>('/trips'),
    getById: (id: string) => request<Trip>(`/trips/${id}`),
    create: (tripData: Omit<Trip, 'id' | 'createdAt' | 'createdBy'>) => 
      request<Trip>('/trips', {
        method: 'POST',
        body: JSON.stringify(tripData),
      }),
    update: (id: string, tripData: Partial<Trip>) => 
      request<Trip>(`/trips/${id}`, {
        method: 'PUT',
        body: JSON.stringify(tripData),
      }),
    delete: (id: string) => 
      request<{ success: boolean }>(`/trips/${id}`, {
        method: 'DELETE',
      }),
  },

  // AI & Chat
  ai: {
    generateItinerary: (params: {
      destination: string;
      startDate: string;
      endDate: string;
      budget: string;
      travelStyle: string;
    }) => request<Trip>('/ai/generate', {
      method: 'POST',
      body: JSON.stringify(params),
    }),
    sendMessage: (tripId: string, messages: Message[], text: string) => 
      request<{ response: string }>('/ai/chat', {
        method: 'POST',
        body: JSON.stringify({ tripId, messages, message: text }),
      }),
  },
};
export default api;
