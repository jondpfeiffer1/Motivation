import * as Notifications from 'expo-notifications';

/**
 * Notification scheduling for daily motivation reminders.
 *
 * Sends push notifications to remind users to check their daily content.
 */

// Configure how notifications appear when the app is in the foreground
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const MORNING_MESSAGES = [
  "Rise and shine! Your daily motivation is ready. 🔥",
  "Good morning! Start your day with some inspiration. ☀️",
  "New day, new energy! Your motivational videos are waiting. 💪",
  "Today is full of possibilities. Check your daily motivation! ✨",
  "Your morning boost is here. Let's make today count! 🌟",
  "Time to level up! Your personalized motivation awaits. 🚀",
];

/**
 * Request permission to send notifications.
 * Must be called before scheduling any notifications.
 */
export async function requestNotificationPermissions(): Promise<boolean> {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  return finalStatus === 'granted';
}

/**
 * Schedule a daily morning motivation notification.
 * @param hour - Hour to send (0-23)
 * @param minute - Minute to send (0-59)
 */
export async function scheduleDailyNotification(
  hour: number,
  minute: number
): Promise<string | null> {
  const hasPermission = await requestNotificationPermissions();
  if (!hasPermission) {
    console.warn('Notification permissions not granted');
    return null;
  }

  // Cancel any existing scheduled notifications first
  await Notifications.cancelAllScheduledNotificationsAsync();

  const randomMessage =
    MORNING_MESSAGES[Math.floor(Math.random() * MORNING_MESSAGES.length)];

  const id = await Notifications.scheduleNotificationAsync({
    content: {
      title: 'MotivateMe',
      body: randomMessage,
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
      hour,
      minute,
    },
  });

  return id;
}

/**
 * Cancel all scheduled notifications.
 */
export async function cancelAllNotifications(): Promise<void> {
  await Notifications.cancelAllScheduledNotificationsAsync();
}

/**
 * Parse a time string (HH:MM) into hours and minutes.
 */
export function parseTimeString(time: string): { hour: number; minute: number } {
  const [hourStr, minuteStr] = time.split(':');
  return {
    hour: parseInt(hourStr, 10),
    minute: parseInt(minuteStr, 10),
  };
}
