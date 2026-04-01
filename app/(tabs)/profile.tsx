import { View, Text, StyleSheet, ScrollView, Pressable, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS, SHADOWS } from '../../constants/theme';
import { useUserStore } from '../../stores/userStore';
import { usePlannerStore } from '../../stores/plannerStore';
import { CATEGORIES } from '../../constants/categories';

export default function ProfileScreen() {
  const router = useRouter();
  const { profile, resetProfile } = useUserStore();
  const { streak } = usePlannerStore();

  const userCategories = CATEGORIES.filter((c) =>
    profile.categories.includes(c.id)
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Profile & Settings</Text>
        </View>

        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarEmoji}>😊</Text>
          </View>
          <Text style={styles.profileName}>
            {profile.name || 'MotivateMe User'}
          </Text>
          <Text style={styles.profileStat}>
            {streak.totalDaysActive} days on your journey
          </Text>
        </View>

        {/* Your Focus Areas */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Focus Areas</Text>
          <View style={styles.categoryTags}>
            {userCategories.map((cat) => (
              <View
                key={cat.id}
                style={[styles.categoryTag, { backgroundColor: cat.color + '20' }]}
              >
                <Text style={styles.categoryEmoji}>{cat.emoji}</Text>
                <Text style={[styles.categoryLabel, { color: cat.color }]}>
                  {cat.label}
                </Text>
              </View>
            ))}
          </View>
          <Pressable
            style={styles.editButton}
            onPress={() => router.push('/(onboarding)/profile')}
          >
            <Text style={styles.editButtonText}>Edit Focus Areas</Text>
          </Pressable>
        </View>

        {/* Preferences */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>

          <SettingRow
            label="Daily videos"
            value={`${profile.dailyVideoCount} per day`}
          />
          <SettingRow
            label="Morning notification"
            value={profile.notificationTime}
          />
        </View>

        {/* Notifications */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notifications</Text>
          <ToggleRow label="Morning motivation" defaultValue={true} />
          <ToggleRow label="Daily quote reminder" defaultValue={true} />
          <ToggleRow label="Streak reminder" defaultValue={false} />
        </View>

        {/* About */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <SettingRow label="Version" value="1.0.0" />
          <SettingRow label="Made with" value="Love & purpose" />
        </View>

        {/* Reset */}
        <Pressable
          style={styles.resetButton}
          onPress={() => {
            resetProfile();
            router.replace('/(onboarding)/welcome');
          }}
        >
          <Text style={styles.resetButtonText}>Reset & Start Over</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

function SettingRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.settingRow}>
      <Text style={styles.settingLabel}>{label}</Text>
      <Text style={styles.settingValue}>{value}</Text>
    </View>
  );
}

function ToggleRow({
  label,
  defaultValue,
}: {
  label: string;
  defaultValue: boolean;
}) {
  return (
    <View style={styles.settingRow}>
      <Text style={styles.settingLabel}>{label}</Text>
      <Switch
        value={defaultValue}
        trackColor={{ false: COLORS.border, true: COLORS.primaryLight }}
        thumbColor={defaultValue ? COLORS.primary : COLORS.textMuted}
      />
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
  profileCard: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    alignItems: 'center',
    marginBottom: SPACING.lg,
    ...SHADOWS.medium,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: COLORS.primaryLight + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  avatarEmoji: {
    fontSize: 36,
  },
  profileName: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  profileStat: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
  },
  section: {
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },
  categoryTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
    marginBottom: SPACING.md,
  },
  categoryTag: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.full,
    gap: SPACING.xs,
  },
  categoryEmoji: {
    fontSize: 14,
  },
  categoryLabel: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
  },
  editButton: {
    alignSelf: 'flex-start',
  },
  editButtonText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.primary,
    fontWeight: '600',
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    marginBottom: SPACING.sm,
  },
  settingLabel: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textPrimary,
  },
  settingValue: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  resetButton: {
    alignItems: 'center',
    padding: SPACING.md,
    marginTop: SPACING.lg,
  },
  resetButtonText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.error,
    fontWeight: '600',
  },
});
