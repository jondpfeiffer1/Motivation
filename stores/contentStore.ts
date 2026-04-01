import { create } from 'zustand';
import type { Content, VideoContent, QuoteContent, Mood } from '../types';
import { SEED_QUOTES } from '../constants/quotes';
import { SAMPLE_VIDEOS } from '../constants/sampleVideos';

interface ContentState {
  dailyVideos: VideoContent[];
  dailyQuotes: QuoteContent[];
  favorites: Content[];
  todaysMood: Mood | null;
  isLoading: boolean;

  setDailyVideos: (videos: VideoContent[]) => void;
  setDailyQuotes: (quotes: QuoteContent[]) => void;
  setTodaysMood: (mood: Mood) => void;
  toggleFavorite: (content: Content) => void;
  isFavorited: (id: string) => boolean;
  loadDailyContent: (categories: string[], videoCount: number) => void;
}

export const useContentStore = create<ContentState>((set, get) => ({
  dailyVideos: [],
  dailyQuotes: [],
  favorites: [],
  todaysMood: null,
  isLoading: false,

  setDailyVideos: (dailyVideos) => set({ dailyVideos }),
  setDailyQuotes: (dailyQuotes) => set({ dailyQuotes }),

  setTodaysMood: (todaysMood) => set({ todaysMood }),

  toggleFavorite: (content) =>
    set((state) => {
      const exists = state.favorites.find((f) => f.id === content.id);
      return {
        favorites: exists
          ? state.favorites.filter((f) => f.id !== content.id)
          : [...state.favorites, content],
      };
    }),

  isFavorited: (id) => get().favorites.some((f) => f.id === id),

  loadDailyContent: (categories, videoCount) => {
    set({ isLoading: true });

    // Filter content by user's categories
    const matchingVideos = SAMPLE_VIDEOS.filter((v) =>
      v.categories.some((c) => categories.includes(c))
    );
    const matchingQuotes = SEED_QUOTES.filter((q) =>
      q.categories.some((c) => categories.includes(c))
    );

    // Shuffle and pick the daily amount
    const shuffledVideos = matchingVideos.sort(() => Math.random() - 0.5);
    const shuffledQuotes = matchingQuotes.sort(() => Math.random() - 0.5);

    set({
      dailyVideos: shuffledVideos.slice(0, videoCount),
      dailyQuotes: shuffledQuotes.slice(0, 3),
      isLoading: false,
    });
  },
}));
