import { create } from 'zustand';
import type { DailyPlan, PlanTask, Streak } from '../types';

interface PlannerState {
  todaysPlan: DailyPlan;
  streak: Streak;

  addTask: (title: string, type: PlanTask['type']) => void;
  toggleTask: (taskId: string) => void;
  removeTask: (taskId: string) => void;
  incrementStreak: () => void;
  resetTodaysPlan: () => void;
}

const today = () => new Date().toISOString().split('T')[0];

const DEFAULT_TASKS: PlanTask[] = [
  { id: 'default-1', title: 'Watch morning motivation video', completed: false, type: 'video' },
  { id: 'default-2', title: 'Read daily affirmation', completed: false, type: 'quote' },
  { id: 'default-3', title: 'Write 3 things you are grateful for', completed: false, type: 'journal' },
  { id: 'default-4', title: 'Set one intention for today', completed: false, type: 'custom' },
];

export const usePlannerStore = create<PlannerState>((set) => ({
  todaysPlan: {
    id: `plan-${today()}`,
    date: today(),
    tasks: DEFAULT_TASKS,
    completed: false,
  },
  streak: {
    currentStreak: 0,
    longestStreak: 0,
    lastActiveDate: '',
    totalDaysActive: 0,
  },

  addTask: (title, type) =>
    set((state) => ({
      todaysPlan: {
        ...state.todaysPlan,
        tasks: [
          ...state.todaysPlan.tasks,
          {
            id: `task-${Date.now()}`,
            title,
            completed: false,
            type,
          },
        ],
      },
    })),

  toggleTask: (taskId) =>
    set((state) => {
      const tasks = state.todaysPlan.tasks.map((t) =>
        t.id === taskId ? { ...t, completed: !t.completed } : t
      );
      const allCompleted = tasks.every((t) => t.completed);
      return {
        todaysPlan: { ...state.todaysPlan, tasks, completed: allCompleted },
      };
    }),

  removeTask: (taskId) =>
    set((state) => ({
      todaysPlan: {
        ...state.todaysPlan,
        tasks: state.todaysPlan.tasks.filter((t) => t.id !== taskId),
      },
    })),

  incrementStreak: () =>
    set((state) => {
      const newStreak = state.streak.currentStreak + 1;
      return {
        streak: {
          currentStreak: newStreak,
          longestStreak: Math.max(newStreak, state.streak.longestStreak),
          lastActiveDate: today(),
          totalDaysActive: state.streak.totalDaysActive + 1,
        },
      };
    }),

  resetTodaysPlan: () =>
    set({
      todaysPlan: {
        id: `plan-${today()}`,
        date: today(),
        tasks: DEFAULT_TASKS.map((t) => ({ ...t, completed: false })),
        completed: false,
      },
    }),
}));
