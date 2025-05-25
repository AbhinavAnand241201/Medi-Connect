import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  id: string;
  name: string;
  email: string;
  subscription: 'free' | 'premium' | 'enterprise';
  healthData: {
    weight: number[];
    bloodPressure: { systolic: number[]; diastolic: number[] };
    heartRate: number[];
    dates: string[];
  };
  appointments: Appointment[];
  aiDiagnoses: AIDiagnosis[];
}

export interface Appointment {
  id: string;
  doctorId: string;
  doctorName: string;
  date: string;
  time: string;
  type: 'video' | 'in-person';
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
}

export interface AIDiagnosis {
  id: string;
  date: string;
  symptoms: string[];
  diagnosis: string;
  confidence: number;
  recommendations: string[];
  paid: boolean;
}

interface AppState {
  user: User | null;
  isAuthenticated: boolean;
  currentScreen: string;
  setUser: (user: User | null) => void;
  setAuthenticated: (isAuthenticated: boolean) => void;
  setCurrentScreen: (screen: string) => void;
  addAppointment: (appointment: Appointment) => void;
  updateAppointment: (id: string, updates: Partial<Appointment>) => void;
  addHealthData: (data: Partial<User['healthData']>) => void;
  addAIDiagnosis: (diagnosis: AIDiagnosis) => void;
  updateSubscription: (subscription: User['subscription']) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      currentScreen: 'home',
      setUser: (user) => set({ user }),
      setAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
      setCurrentScreen: (currentScreen) => set({ currentScreen }),
      addAppointment: (appointment) =>
        set((state) => ({
          user: state.user
            ? { ...state.user, appointments: [...state.user.appointments, appointment] }
            : null,
        })),
      updateAppointment: (id, updates) =>
        set((state) => ({
          user: state.user
            ? {
                ...state.user,
                appointments: state.user.appointments.map((apt) =>
                  apt.id === id ? { ...apt, ...updates } : apt
                ),
              }
            : null,
        })),
      addHealthData: (data) =>
        set((state) => ({
          user: state.user
            ? {
                ...state.user,
                healthData: {
                  ...state.user.healthData,
                  ...data,
                },
              }
            : null,
        })),
      addAIDiagnosis: (diagnosis) =>
        set((state) => ({
          user: state.user
            ? {
                ...state.user,
                aiDiagnoses: [...state.user.aiDiagnoses, diagnosis],
              }
            : null,
        })),
      updateSubscription: (subscription) =>
        set((state) => ({
          user: state.user ? { ...state.user, subscription } : null,
        })),
    }),
    {
      name: 'mediconnect-storage',
    }
  )
); 