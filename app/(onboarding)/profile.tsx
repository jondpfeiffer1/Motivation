import { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '../../constants/theme';
import { CATEGORIES } from '../../constants/categories';
import { CategoryPill } from '../../components/CategoryPill';
import { useUserStore } from '../../stores/userStore';
import type { Category } from '../../types';

export default function ProfileScreen() {
  const router = useRouter();
  const setCategories = useUserStore((s) => s.setCategories);
  const [selected, setSelected] = useState<Category[]>([]);

  const toggleCategory = (id: Category) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const handleNext = () => {
    setCategories(selected);
    router.push('/(onboarding)/preferences');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.step}>Step 1 of 2</Text>
          <Text style={styles.title}>What are you{'\n'}working on?</Text>
          <Text style={styles.subtitle}>
            Select the areas where you'd like daily motivation.
            Pick as many as you'd like — we'll personalize your feed.
          </Text>
        </View>

        <View style={styles.categoriesGrid}>
          {CATEGORIES.map((category) => (
            <CategoryPill
              key={category.id}
              category={category}
              selected={selected.includes(category.id)}
              onPress={() => toggleCategory(category.id)}
            />
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Pressable
          style={[
            styles.nextButton,
            selected.length === 0 && styles.nextButtonDisabled,
          ]}
          onPress={handleNext}
          disabled={selected.length === 0}
        >
          <Text style={styles.nextButtonText}>
            {selected.length === 0
              ? 'Select at least one'
              : `Continue (${selected.length} selected)`}
          </Text>
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
  scrollContent: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: 100,
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
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: SPACING.lg,
    backgroundColor: COLORS.background,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  nextButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.full,
    alignItems: 'center',
  },
  nextButtonDisabled: {
    backgroundColor: COLORS.border,
  },
  nextButtonText: {
    color: COLORS.textOnPrimary,
    fontSize: FONT_SIZES.md,
    fontWeight: '700',
  },
});
