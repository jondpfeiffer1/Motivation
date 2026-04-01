// MotivateMe - Type Definitions

export type Category =
  | 'anxiety'
  | 'depression'
  | 'career'
  | 'relationships'
  | 'self-love'
  | 'fitness'
  | 'financial'
  | 'grief'
  | 'addiction-recovery'
  | 'student-life'
  | 'parenting'
  | 'spirituality';

export type Mood = 'great' | 'good' | 'okay' | 'low' | 'struggling';

export type ContentType = 'video' | 'quote';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  categories: Category[];
  dailyVideoCount: number;
  notificationTime: string; // HH:MM format
  onboardingCompleted: boolean;
  createdAt: string;
}

export interface VideoContent {
  id: string;
  type: 'video';
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
  sourceChannel: string;
  categories: Category[];
  durationSeconds: number;
  createdAt: string;
}

export interface QuoteContent {
  id: string;
  type: 'quote';
  text: string;
  author: string;
  categories: Category[];
  createdAt: string;
}

export type Content = VideoContent | QuoteContent;

export interface DailyPlan {
  id: string;
  date: string; // YYYY-MM-DD
  tasks: PlanTask[];
  moodCheckIn?: Mood;
  completed: boolean;
}

export interface PlanTask {
  id: string;
  title: string;
  completed: boolean;
  type: 'video' | 'quote' | 'custom' | 'journal';
}

export interface Streak {
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string;
  totalDaysActive: number;
}

export interface DailyStats {
  videosWatched: number;
  quotesSaved: number;
  tasksCompleted: number;
  date: string;
}
