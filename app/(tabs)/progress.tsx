import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS, SHADOWS } from '../../constants/theme';
import { StreakCounter } from '../../components/StreakCounter';
import { usePlannerStore } from '../../stores/plannerStore';
import { useContentStore } from '../../stores/contentStore';

export default function ProgressScreen() {
  const { streak } = usePlannerStore();
  const { favorites } = useContentStore();

  const savedVideos = favorites.filter((f) => f.type === 'video').length;
  const savedQuotes = favorites.filter((f) => f.type === 'quote').length;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Your Growth</Text>
          <Text style={styles.subtitle}>
            Every day you show up is a win
          </Text>
        </View>

        {/* Streak Counter */}
        <StreakCounter
          currentStreak={streak.currentStreak}
          longestStreak={streak.longestStreak}
          totalDays={streak.totalDaysActive}
        />

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <StatCard emoji="🎬" value={savedVideos} label="Videos Saved" color={COLORS.primary} />
          <StatCard emoji="💬" value={savedQuotes} label="Quotes Saved" color={COLORS.accentGold} />
          <StatCard
            emoji="✅"
            value={streak.totalDaysActive}
            label="Tasks Done"
            color={COLORS.accentGreen}
          />
          <StatCard emoji="📅" value={streak.totalDaysActive} label="Days Active" color="#C084FC" />
        </View>

        {/* Milestones */}
        <View style={styles.milestonesSection}>
          <Text style={styles.sectionTitle}>Milestones</Text>
          <MilestoneItem
            emoji="🌱"
            title="First Step"
            description="Complete your first day"
            achieved={streak.totalDaysActive >= 1}
          />
          <MilestoneItem
            emoji="🔥"
            title="On Fire"
            description="7-day streak"
            achieved={streak.longestStreak >= 7}
          />
          <MilestoneItem
            emoji="💎"
            title="Committed"
            description="30-day streak"
            achieved={streak.longestStreak >= 30}
          />
          <MilestoneItem
            emoji="👑"
            title="Unstoppable"
            description="100-day streak"
            achieved={streak.longestStreak >= 100}
          />
          <MilestoneItem
            emoji="⭐"
            title="Quote Collector"
            description="Save 10 quotes"
            achieved={savedQuotes >= 10}
          />
          <MilestoneItem
            emoji="🎬"
            title="Video Enthusiast"
            description="Save 20 videos"
            achieved={savedVideos >= 20}
          />
        </View>

        {/* Encouragement */}
        <View style={styles.encouragement}>
          <Text style={styles.encouragementEmoji}>🌟</Text>
          <Text style={styles.encouragementText}>
            Remember: progress, not perfection.{'\n'}
            Every day you show up for yourself counts.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function StatCard({
  emoji,
  value,
  label,
  color,
}: {
  emoji: string;
  value: number;
  label: string;
  color: string;
}) {
  return (
    <View style={styles.statCard}>
      <Text style={styles.statEmoji}>{emoji}</Text>
      <Text style={[styles.statValue, { color }]}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function MilestoneItem({
  emoji,
  title,
  description,
  achieved,
}: {
  emoji: string;
  title: string;
  description: string;
  achieved: boolean;
}) {
  return (
    <View style={[styles.milestoneItem, !achieved && styles.milestoneItemLocked]}>
      <Text style={[styles.milestoneEmoji, !achieved && styles.milestoneLocked]}>
        {achieved ? emoji : '🔒'}
      </Text>
      <View style={styles.milestoneText}>
        <Text
          style={[
            styles.milestoneTitle,
            !achieved && styles.milestoneTitleLocked,
          ]}
        >
          {title}
        </Text>
        <Text style={styles.milestoneDescription}>{description}</Text>
      </View>
      {achieved && <Text style={styles.achievedBadge}>Earned!</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.xxl,
  },
  header: {
    paddingTop: SPACING.md,
    paddingBottom: SPACING.md,
  },
  title: {
    fontSize: FONT_SIZES.xl,
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
  subtitle: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
    marginTop: SPACING.lg,
  },
  statCard: {
    width: '48%',
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    alignItems: 'center',
    ...SHADOWS.small,
  },
  statEmoji: {
    fontSize: 24,
    marginBottom: SPACING.xs,
  },
  statValue: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: '800',
  },
  statLabel: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  milestonesSection: {
    marginTop: SPACING.xl,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },
  milestoneItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    marginBottom: SPACING.sm,
    gap: SPACING.md,
    ...SHADOWS.small,
  },
  milestoneItemLocked: {
    opacity: 0.6,
  },
  milestoneEmoji: {
    fontSize: 28,
  },
  milestoneLocked: {
    opacity: 0.5,
  },
  milestoneText: {
    flex: 1,
  },
  milestoneTitle: {
    fontSize: FONT_SIZES.md,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  milestoneTitleLocked: {
    color: COLORS.textMuted,
  },
  milestoneDescription: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  achievedBadge: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.accentGreen,
    fontWeight: '700',
  },
  encouragement: {
    alignItems: 'center',
    paddingVertical: SPACING.xl,
  },
  encouragementEmoji: {
    fontSize: 32,
    marginBottom: SPACING.sm,
  },
  encouragementText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
});
