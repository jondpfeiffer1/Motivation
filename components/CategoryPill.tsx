import { Pressable, Text, StyleSheet } from 'react-native';
import { CategoryInfo } from '../constants/categories';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '../constants/theme';

interface Props {
  category: CategoryInfo;
  selected: boolean;
  onPress: () => void;
}

export function CategoryPill({ category, selected, onPress }: Props) {
  return (
    <Pressable
      style={[
        styles.pill,
        selected && { borderColor: category.color, backgroundColor: category.color + '18' },
      ]}
      onPress={onPress}
    >
      <Text style={styles.emoji}>{category.emoji}</Text>
      <Text
        style={[
          styles.label,
          selected && { color: category.color, fontWeight: '700' },
        ]}
      >
        {category.label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.sm + 2,
    paddingHorizontal: SPACING.md,
    borderRadius: BORDER_RADIUS.full,
    backgroundColor: COLORS.surface,
    borderWidth: 2,
    borderColor: COLORS.border,
    gap: SPACING.sm,
  },
  emoji: {
    fontSize: 18,
  },
  label: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
});
