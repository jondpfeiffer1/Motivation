import { create } from 'zustand';
import type { Category, UserProfile } from '../types';

interface UserState {
  profile: UserProfile;
  setCategories: (categories: Category[]) => void;
  setDailyVideoCount: (count: number) => void;
  setNotificationTime: (time: string) => void;
  setName: (name: string) => void;
  completeOnboarding: () => void;
  resetProfile: () => void;
}

const DEFAULT_PROFILE: UserProfile = {
  id: '',
  name: '',
  email: '',
  categories: [],
  dailyVideoCount: 5,
  notificationTime: '07:00',
  onboardingCompleted: false,
  createdAt: new Date().toISOString(),
};

export const useUserStore = create<UserState>((set) => ({
  profile: DEFAULT_PROFILE,

  setCategories: (categories) =>
    set((state) => ({
      profile: { ...state.profile, categories },
    })),

  setDailyVideoCount: (dailyVideoCount) =>
    set((state) => ({
      profile: { ...state.profile, dailyVideoCount },
    })),

  setNotificationTime: (notificationTime) =>
    set((state) => ({
      profile: { ...state.profile, notificationTime },
    })),

  setName: (name) =>
    set((state) => ({
      profile: { ...state.profile, name },
    })),

  completeOnboarding: () =>
    set((state) => ({
      profile: { ...state.profile, onboardingCompleted: true },
    })),

  resetProfile: () => set({ profile: DEFAULT_PROFILE }),
}));
