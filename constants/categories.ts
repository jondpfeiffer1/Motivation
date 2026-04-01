import { Category } from '../types';

export interface CategoryInfo {
  id: Category;
  label: string;
  emoji: string;
  description: string;
  color: string;
}

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'anxiety',
    label: 'Anxiety',
    emoji: '🧘',
    description: 'Finding calm and managing anxious thoughts',
    color: '#7CB9E8',
  },
  {
    id: 'depression',
    label: 'Depression',
    emoji: '🌅',
    description: 'Finding light in dark moments',
    color: '#F4A460',
  },
  {
    id: 'career',
    label: 'Career Growth',
    emoji: '🚀',
    description: 'Leveling up professionally and chasing goals',
    color: '#4A90D9',
  },
  {
    id: 'relationships',
    label: 'Relationships',
    emoji: '❤️',
    description: 'Building stronger connections with others',
    color: '#E85D75',
  },
  {
    id: 'self-love',
    label: 'Self-Love',
    emoji: '🦋',
    description: 'Embracing who you are and building confidence',
    color: '#C084FC',
  },
  {
    id: 'fitness',
    label: 'Fitness & Health',
    emoji: '💪',
    description: 'Physical health and wellness motivation',
    color: '#34D399',
  },
  {
    id: 'financial',
    label: 'Financial Goals',
    emoji: '💰',
    description: 'Building wealth and financial freedom',
    color: '#FBBF24',
  },
  {
    id: 'grief',
    label: 'Grief & Loss',
    emoji: '🕊️',
    description: 'Healing and finding peace after loss',
    color: '#94A3B8',
  },
  {
    id: 'addiction-recovery',
    label: 'Recovery',
    emoji: '🌱',
    description: 'Overcoming addiction and building new habits',
    color: '#6EE7B7',
  },
  {
    id: 'student-life',
    label: 'Student Life',
    emoji: '📚',
    description: 'Academic success and student wellness',
    color: '#60A5FA',
  },
  {
    id: 'parenting',
    label: 'Parenting',
    emoji: '👨‍👩‍👧',
    description: 'Being the best parent you can be',
    color: '#FB923C',
  },
  {
    id: 'spirituality',
    label: 'Spirituality',
    emoji: '✨',
    description: 'Connecting with your higher purpose',
    color: '#A78BFA',
  },
];

export const getCategoryById = (id: Category): CategoryInfo | undefined =>
  CATEGORIES.find((cat) => cat.id === id);

export const getCategoryColor = (id: Category): string =>
  getCategoryById(id)?.color ?? '#4A90D9';
