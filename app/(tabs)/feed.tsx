import { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '../../constants/theme';
import { MorningGreeting } from '../../components/MorningGreeting';
import { VideoCard } from '../../components/VideoCard';
import { QuoteCard } from '../../components/QuoteCard';
import { useUserStore } from '../../stores/userStore';
import { useContentStore } from '../../stores/contentStore';
import type { Mood } from '../../types';

const MOOD_OPTIONS: { mood: Mood; emoji: string; label: string }[] = [
  { mood: 'great', emoji: '😊', label: 'Great' },
  { mood: 'good', emoji: '🙂', label: 'Good' },
  { mood: 'okay', emoji: '😐', label: 'Okay' },
  { mood: 'low', emoji: '😔', label: 'Low' },
  { mood: 'struggling', emoji: '😢', label: 'Struggling' },
];

export default function FeedScreen() {
  const { profile } = useUserStore();
  const {
    dailyVideos,
    dailyQuotes,
    todaysMood,
    setTodaysMood,
    loadDailyContent,
  } = useContentStore();

  useEffect(() => {
    loadDailyContent(profile.categories, profile.dailyVideoCount);
  }, []);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <MorningGreeting name={profile.name} />

        {/* Mood Check-in */}
        {!todaysMood && (
          <View style={styles.moodSection}>
            <Text style={styles.moodTitle}>How are you feeling today?</Text>
            <View style={styles.moodRow}>
              {MOOD_OPTIONS.map((option) => (
                <Pressable
                  key={option.mood}
                  style={styles.moodButton}
                  onPress={() => setTodaysMood(option.mood)}
                >
                  <Text style={styles.moodEmoji}>{option.emoji}</Text>
                  <Text style={styles.moodLabel}>{option.label}</Text>
                </Pressable>
              ))}
            </View>
          </View>
        )}

        {todaysMood && (
          <View style={styles.moodConfirm}>
            <Text style={styles.moodConfirmText}>
              {todaysMood === 'great' || todaysMood === 'good'
                ? "Awesome! Let's keep that energy going 💪"
                : todaysMood === 'okay'
                  ? "Let's make today a good one 🌟"
                  : "We've got you. Here's some extra love today 💙"}
            </Text>
          </View>
        )}

        {/* Featured Quote */}
        {dailyQuotes.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Daily Affirmation</Text>
            <QuoteCard quote={dailyQuotes[0]} featured />
          </View>
        )}

        {/* Today's Videos */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Today's Motivation ({dailyVideos.length} videos)
          </Text>
          {dailyVideos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </View>

        {/* More Quotes */}
        {dailyQuotes.length > 1 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>More Inspiration</Text>
            {dailyQuotes.slice(1).map((quote) => (
              <QuoteCard key={quote.id} quote={quote} />
            ))}
          </View>
        )}

        <View style={styles.endMessage}>
          <Text style={styles.endEmoji}>✨</Text>
          <Text style={styles.endText}>
            That's your motivation for today.{'\n'}
            Come back tomorrow for more!
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
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
  moodSection: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.md,
  },
  moodTitle: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
    textAlign: 'center',
  },
  moodRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  moodButton: {
    alignItems: 'center',
    gap: SPACING.xs,
  },
  moodEmoji: {
    fontSize: 28,
  },
  moodLabel: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textSecondary,
  },
  moodConfirm: {
    backgroundColor: COLORS.primaryLight + '20',
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.md,
  },
  moodConfirmText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.primary,
    fontWeight: '600',
    textAlign: 'center',
  },
  section: {
    marginBottom: SPACING.md,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },
  endMessage: {
    alignItems: 'center',
    paddingVertical: SPACING.xl,
  },
  endEmoji: {
    fontSize: 32,
    marginBottom: SPACING.sm,
  },
  endText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
});
