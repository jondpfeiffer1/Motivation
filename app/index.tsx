import { useEffect } from 'react';
import { Redirect } from 'expo-router';
import { useUserStore } from '../stores/userStore';

export default function Index() {
  const onboardingCompleted = useUserStore((s) => s.profile.onboardingCompleted);

  if (!onboardingCompleted) {
    return <Redirect href="/(onboarding)/welcome" />;
  }

  return <Redirect href="/(tabs)/feed" />;
}
