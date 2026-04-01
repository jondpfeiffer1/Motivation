import { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS, SHADOWS } from '../../constants/theme';
import { useUserStore } from '../../stores/userStore';

const VIDEO_COUNT_OPTIONS = [3, 5, 7];

const NOTIFICATION_OPTIONS = [
  { label: '6:00 AM', value: '06:00', sublabel: 'Early bird' },
  { label: '7:00 AM', value: '07:00', sublabel: 'Most popular' },
  { label: '8:00 AM', value: '08:00', sublabel: 'Easy morning' },
  { label: '9:00 AM', value: '09:00', sublabel: 'Late start' },
];

export default function PreferencesScreen() {
  const router = useRouter();
  const { setDailyVideoCount, setNotificationTime, completeOnboarding } =
    useUserStore();
  const [videoCount, setVideoCount] = useState(5);
  const [notifTime, setNotifTime] = useState('07:00');

  const handleFinish = () => {
    setDailyVideoCount(videoCount);
    setNotificationTime(notifTime);
    completeOnboarding();
    router.replace('/(tabs)/feed');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.step}>Step 2 of 2</Text>
          <Text style={styles.title}>Customize your{'\n'}daily routine</Text>
          <Text style={styles.subtitle}>
            Choose how much motivation you want each day.
          </Text>
        </View>

        {/* Daily Video Count */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Daily videos</Text>
          <Text style={styles.sectionSubtitle}>
            How many motivational videos do you want per day?
          </Text>
          <View style={styles.optionRow}>
            {VIDEO_COUNT_OPTIONS.map((count) => (
              <Pressable
                key={count}
                style={[
                  styles.countOption,
                  videoCount === count && styles.countOptionSelected,
                ]}
                onPress={() => setVideoCount(count)}
              >
                <Text
                  style={[
                    styles.countOptionText,
                    videoCount === count && styles.countOptionTextSelected,
                  ]}
                >
                  {count}
                </Text>
                <Text
                  style={[
                    styles.countOptionLabel,
                    videoCount === count && styles.countOptionTextSelected,
                  ]}
                >
                  videos
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Notification Time */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Morning motivation</Text>
          <Text style={styles.sectionSubtitle}>
            When should we send your daily motivation?
          </Text>
          <View style={styles.timeOptions}>
            {NOTIFICATION_OPTIONS.map((option) => (
              <Pressable
                key={option.value}
                style={[
                  styles.timeOption,
                  notifTime === option.value && styles.timeOptionSelected,
                ]}
                onPress={() => setNotifTime(option.value)}
              >
                <Text
                  style={[
                    styles.timeOptionLabel,
                    notifTime === option.value && styles.timeOptionLabelSelected,
                  ]}
                >
                  {option.label}
                </Text>
                <Text
                  style={[
                    styles.timeOptionSublabel,
                    notifTime === option.value &&
                      styles.timeOptionSublabelSelected,
                  ]}
                >
                  {option.sublabel}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <Pressable style={styles.finishButton} onPress={handleFinish}>
          <Text style={styles.finishButtonText}>Start My Journey</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: SPACING.lg,
  },
  header: {
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.lg,
  },
  step: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.primary,
    fontWeight: '600',
    marginBottom: SPACING.sm,
  },
  title: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: '800',
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
  },
  subtitle: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
    lineHeight: 24,
  },
  section: {
    marginBottom: SPACING.xl,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  sectionSubtitle: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    marginBottom: SPACING.md,
  },
  optionRow: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  countOption: {
    flex: 1,
    backgroundColor: COLORS.surface,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.border,
    ...SHADOWS.small,
  },
  countOptionSelected: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primaryLight + '15',
  },
  countOptionText: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: '800',
    color: COLORS.textSecondary,
  },
  countOptionTextSelected: {
    color: COLORS.primary,
  },
  countOptionLabel: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  timeOptions: {
    gap: SPACING.sm,
  },
  timeOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 2,
    borderColor: COLORS.border,
  },
  timeOptionSelected: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primaryLight + '15',
  },
  timeOptionLabel: {
    fontSize: FONT_SIZES.md,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  timeOptionLabelSelected: {
    color: COLORS.primary,
  },
  timeOptionSublabel: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textMuted,
  },
  timeOptionSublabelSelected: {
    color: COLORS.primaryDark,
  },
  footer: {
    padding: SPACING.lg,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  finishButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.full,
    alignItems: 'center',
  },
  finishButtonText: {
    color: COLORS.textOnPrimary,
    fontSize: FONT_SIZES.lg,
    fontWeight: '700',
  },
});
