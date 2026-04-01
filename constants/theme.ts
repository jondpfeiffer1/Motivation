// MotivateMe — Design tokens and theme constants

export const COLORS = {
  // Primary brand colors
  primary: '#4A90D9',
  primaryLight: '#7CB9E8',
  primaryDark: '#2D6BB0',

  // Accent colors
  accent: '#FF6B6B',
  accentGold: '#FFD700',
  accentGreen: '#34D399',

  // Backgrounds
  background: '#F8FAFC',
  surface: '#FFFFFF',
  surfaceElevated: '#FFFFFF',

  // Text
  textPrimary: '#1E293B',
  textSecondary: '#64748B',
  textMuted: '#94A3B8',
  textOnPrimary: '#FFFFFF',

  // Borders & Dividers
  border: '#E2E8F0',
  divider: '#F1F5F9',

  // Status colors
  success: '#34D399',
  warning: '#FBBF24',
  error: '#EF4444',

  // Mood colors
  moodGreat: '#34D399',
  moodGood: '#60A5FA',
  moodOkay: '#FBBF24',
  moodLow: '#FB923C',
  moodStruggling: '#EF4444',
} as const;

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const FONT_SIZES = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 22,
  xxl: 28,
  hero: 36,
} as const;

export const BORDER_RADIUS = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
} as const;

export const SHADOWS = {
  small: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5,
  },
} as const;
