import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '../../constants/theme';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.heroSection}>
          <Text style={styles.logoEmoji}>🔥</Text>
          <Text style={styles.appName}>MotivateMe</Text>
          <Text style={styles.tagline}>
            Your daily dose of motivation,{'\n'}not distraction.
          </Text>
        </View>

        <View style={styles.features}>
          <FeatureItem
            icon="🎬"
            title="Curated Videos"
            description="Motivational videos hand-picked for you every day"
          />
          <FeatureItem
            icon="💬"
            title="Daily Quotes"
            description="Inspiring words matched to what you're going through"
          />
          <FeatureItem
            icon="📋"
            title="Daily Planner"
            description="Structure your day for success with guided routines"
          />
          <FeatureItem
            icon="📈"
            title="Track Growth"
            description="Watch your progress and celebrate milestones"
          />
        </View>

        <View style={styles.bottomSection}>
          <Pressable
            style={styles.primaryButton}
            onPress={() => router.push('/(onboarding)/profile')}
          >
            <Text style={styles.primaryButtonText}>Get Started</Text>
          </Pressable>
          <Text style={styles.subtitle}>
            Replace doomscrolling with daily inspiration
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

function FeatureItem({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <View style={styles.featureItem}>
      <Text style={styles.featureIcon}>{icon}</Text>
      <View style={styles.featureText}>
        <Text style={styles.featureTitle}>{title}</Text>
        <Text style={styles.featureDescription}>{description}</Text>
      </View>
    </View>
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
    justifyContent: 'space-between',
  },
  heroSection: {
    alignItems: 'center',
    paddingTop: SPACING.xxl,
  },
  logoEmoji: {
    fontSize: 64,
    marginBottom: SPACING.md,
  },
  appName: {
    fontSize: FONT_SIZES.hero,
    fontWeight: '800',
    color: COLORS.primary,
    marginBottom: SPACING.sm,
  },
  tagline: {
    fontSize: FONT_SIZES.lg,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 26,
  },
  features: {
    gap: SPACING.md,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    gap: SPACING.md,
  },
  featureIcon: {
    fontSize: 28,
  },
  featureText: {
    flex: 1,
  },
  featureTitle: {
    fontSize: FONT_SIZES.md,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  featureDescription: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
  },
  bottomSection: {
    paddingBottom: SPACING.lg,
    alignItems: 'center',
    gap: SPACING.md,
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.xxl,
    borderRadius: BORDER_RADIUS.full,
    width: '100%',
    alignItems: 'center',
  },
  primaryButtonText: {
    color: COLORS.textOnPrimary,
    fontSize: FONT_SIZES.lg,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textMuted,
  },
});
