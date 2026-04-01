import { View, Text, StyleSheet, Pressable } from 'react-native';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS, SHADOWS } from '../constants/theme';
import { useContentStore } from '../stores/contentStore';
import type { QuoteContent } from '../types';

interface Props {
  quote: QuoteContent;
  featured?: boolean;
}

export function QuoteCard({ quote, featured = false }: Props) {
  const { toggleFavorite, isFavorited } = useContentStore();
  const saved = isFavorited(quote.id);

  return (
    <View style={[styles.card, featured && styles.featured]}>
      <Text style={styles.openQuote}>"</Text>
      <Text style={[styles.text, featured && styles.featuredText]}>
        {quote.text}
      </Text>
      <Text style={styles.author}>— {quote.author}</Text>
      <View style={styles.actions}>
        <Pressable
          style={styles.actionButton}
          onPress={() => toggleFavorite(quote)}
        >
          <Text style={styles.actionIcon}>{saved ? '❤️' : '🤍'}</Text>
          <Text style={styles.actionLabel}>{saved ? 'Saved' : 'Save'}</Text>
        </Pressable>
        <Pressable style={styles.actionButton}>
          <Text style={styles.actionIcon}>📤</Text>
          <Text style={styles.actionLabel}>Share</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
    ...SHADOWS.medium,
  },
  featured: {
    backgroundColor: COLORS.primary,
  },
  openQuote: {
    fontSize: 48,
    color: COLORS.primaryLight,
    lineHeight: 48,
    marginBottom: -SPACING.sm,
  },
  text: {
    fontSize: FONT_SIZES.lg,
    color: COLORS.textPrimary,
    lineHeight: 28,
    fontWeight: '500',
    marginBottom: SPACING.md,
  },
  featuredText: {
    color: COLORS.textOnPrimary,
  },
  author: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    fontWeight: '600',
    marginBottom: SPACING.md,
  },
  actions: {
    flexDirection: 'row',
    gap: SPACING.lg,
    borderTopWidth: 1,
    borderTopColor: COLORS.divider,
    paddingTop: SPACING.sm,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  actionIcon: {
    fontSize: 16,
  },
  actionLabel: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
  },
});
