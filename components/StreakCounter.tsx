import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS, SHADOWS } from '../constants/theme';

interface Props {
  currentStreak: number;
  longestStreak: number;
  totalDays: number;
}

export function StreakCounter({ currentStreak, longestStreak, totalDays }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.mainStreak}>
        <Text style={styles.fireEmoji}>🔥</Text>
        <Text style={styles.streakNumber}>{currentStreak}</Text>
        <Text style={styles.streakLabel}>day streak</Text>
      </View>
      <View style={styles.statsRow}>
        <StatItem label="Longest" value={`${longestStreak} days`} />
        <View style={styles.divider} />
        <StatItem label="Total Active" value={`${totalDays} days`} />
      </View>
    </View>
  );
}

function StatItem({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.statItem}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    ...SHADOWS.medium,
  },
  mainStreak: {
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  fireEmoji: {
    fontSize: 48,
    marginBottom: SPACING.sm,
  },
  streakNumber: {
    fontSize: 56,
    fontWeight: '900',
    color: COLORS.primary,
    lineHeight: 60,
  },
  streakLabel: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderTopColor: COLORS.divider,
    paddingTop: SPACING.md,
  },
  divider: {
    width: 1,
    height: 32,
    backgroundColor: COLORS.divider,
    marginHorizontal: SPACING.lg,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: FONT_SIZES.md,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  statLabel: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textMuted,
    marginTop: 2,
  },
});
