import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '../../constants/theme';
import { QuoteCard } from '../../components/QuoteCard';
import { SEED_QUOTES } from '../../constants/quotes';
import { CATEGORIES } from '../../constants/categories';
import { useUserStore } from '../../stores/userStore';
import type { Category } from '../../types';

export default function QuotesScreen() {
  const { profile } = useUserStore();
  const [activeFilter, setActiveFilter] = useState<Category | 'all'>('all');

  // Filter quotes based on user categories and active filter
  const relevantQuotes = SEED_QUOTES.filter((q) => {
    if (activeFilter === 'all') {
      return q.categories.some((c) => profile.categories.includes(c));
    }
    return q.categories.includes(activeFilter);
  });

  const filterCategories = CATEGORIES.filter((c) =>
    profile.categories.includes(c.id)
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Quotes & Affirmations</Text>
        <Text style={styles.subtitle}>
          Words to carry with you throughout the day
        </Text>
      </View>

      {/* Category filters */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filtersContainer}
      >
        <Pressable
          style={[
            styles.filterPill,
            activeFilter === 'all' && styles.filterPillActive,
          ]}
          onPress={() => setActiveFilter('all')}
        >
          <Text
            style={[
              styles.filterLabel,
              activeFilter === 'all' && styles.filterLabelActive,
            ]}
          >
            All
          </Text>
        </Pressable>
        {filterCategories.map((cat) => (
          <Pressable
            key={cat.id}
            style={[
              styles.filterPill,
              activeFilter === cat.id && styles.filterPillActive,
            ]}
            onPress={() => setActiveFilter(cat.id)}
          >
            <Text style={styles.filterEmoji}>{cat.emoji}</Text>
            <Text
              style={[
                styles.filterLabel,
                activeFilter === cat.id && styles.filterLabelActive,
              ]}
            >
              {cat.label}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      {/* Quotes list */}
      <ScrollView
        contentContainerStyle={styles.quotesList}
        showsVerticalScrollIndicator={false}
      >
        {/* Speak it out loud prompt */}
        <View style={styles.speakPrompt}>
          <Text style={styles.speakEmoji}>🗣️</Text>
          <Text style={styles.speakText}>
            Try reading these out loud — affirmations are more powerful when spoken.
          </Text>
        </View>

        {relevantQuotes.map((quote) => (
          <QuoteCard key={quote.id} quote={quote} />
        ))}

        {relevantQuotes.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyEmoji}>📭</Text>
            <Text style={styles.emptyText}>
              No quotes for this category yet.{'\n'}
              Check back tomorrow!
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.sm,
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
  filtersContainer: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    gap: SPACING.sm,
  },
  filterPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.full,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: SPACING.xs,
  },
  filterPillActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  filterEmoji: {
    fontSize: 14,
  },
  filterLabel: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  filterLabelActive: {
    color: COLORS.textOnPrimary,
  },
  quotesList: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.xxl,
  },
  speakPrompt: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.accentGold + '15',
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    marginBottom: SPACING.md,
    gap: SPACING.sm,
  },
  speakEmoji: {
    fontSize: 20,
  },
  speakText: {
    flex: 1,
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: SPACING.xxl,
  },
  emptyEmoji: {
    fontSize: 48,
    marginBottom: SPACING.md,
  },
  emptyText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
});
