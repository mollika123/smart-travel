export interface Activity {
  time: string;
  title: string;
  description: string;
  location?: string;
  cost?: string;
}

export interface DayPlan {
  dayNumber: number;
  date?: string;
  activities: Activity[];
}

export interface Trip {
  _id?:string,
  id?: string;
  title: string;
  destination: string;
  startDate: string;
  endDate: string;
  budget: 'budget' | 'moderate' | 'luxury';
  travelStyle: 'adventure' | 'relaxation' | 'culture' | 'family' | 'romantic' | 'nature';
  itinerary: DayPlan[];
  imagePrompt?: string;
  imageUrl?: string;
  status: 'planning' | 'upcoming' | 'completed';
  createdBy: string;
  createdAt: string;
}

export interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
}
