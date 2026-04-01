import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SPACING, FONT_SIZES } from '../constants/theme';

interface Props {
  name?: string;
}

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

function getDailyMessage(): string {
  const messages = [
    "Today is your day to shine.",
    "You have the power to create change.",
    "One step at a time — you've got this.",
    "Your potential is limitless.",
    "Today's effort builds tomorrow's success.",
    "Be proud of how far you've come.",
    "Every day is a fresh start.",
  ];
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000
  );
  return messages[dayOfYear % messages.length];
}

export function MorningGreeting({ name }: Props) {
  const greeting = getGreeting();
  const message = getDailyMessage();

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>
        {greeting}
        {name ? `, ${name}` : ''} 👋
      </Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: SPACING.md,
  },
  greeting: {
    fontSize: FONT_SIZES.xl,
    fontWeight: '800',
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  message: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
    lineHeight: 22,
  },
});
