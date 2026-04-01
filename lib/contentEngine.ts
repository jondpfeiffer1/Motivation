import type { Content, Category, Mood, VideoContent, QuoteContent } from '../types';

/**
 * Content recommendation engine.
 *
 * Filters and ranks content based on user profile, mood, and history.
 * In production, this would be backed by a server-side recommendation system.
 * For MVP, it runs client-side with simple heuristic matching.
 */

// Weight multipliers for mood-based content boosting
const MOOD_CATEGORY_BOOST: Record<Mood, Category[]> = {
  great: ['career', 'fitness', 'financial', 'student-life'],
  good: ['career', 'self-love', 'relationships', 'fitness'],
  okay: ['self-love', 'career', 'spirituality'],
  low: ['self-love', 'depression', 'spirituality', 'anxiety'],
  struggling: ['depression', 'anxiety', 'self-love', 'grief', 'addiction-recovery'],
};

/**
 * Score content based on how well it matches user preferences and current mood.
 */
function scoreContent(
  content: Content,
  userCategories: Category[],
  mood: Mood | null
): number {
  let score = 0;

  // Base score: how many of the content's categories match the user's interests
  const matchingCategories = content.categories.filter((c) =>
    userCategories.includes(c)
  );
  score += matchingCategories.length * 10;

  // Mood boost: if the content matches mood-appropriate categories
  if (mood) {
    const boostedCategories = MOOD_CATEGORY_BOOST[mood];
    const moodMatches = content.categories.filter((c) =>
      boostedCategories.includes(c)
    );
    score += moodMatches.length * 5;
  }

  // Add slight randomness so content doesn't feel repetitive
  score += Math.random() * 3;

  return score;
}

/**
 * Select the best content for today based on user profile and mood.
 */
export function selectDailyContent(
  allVideos: VideoContent[],
  allQuotes: QuoteContent[],
  userCategories: Category[],
  mood: Mood | null,
  videoCount: number = 5,
  quoteCount: number = 3
): { videos: VideoContent[]; quotes: QuoteContent[] } {
  // Score and sort videos
  const scoredVideos = allVideos
    .map((video) => ({
      video,
      score: scoreContent(video, userCategories, mood),
    }))
    .sort((a, b) => b.score - a.score);

  // Score and sort quotes
  const scoredQuotes = allQuotes
    .map((quote) => ({
      quote,
      score: scoreContent(quote, userCategories, mood),
    }))
    .sort((a, b) => b.score - a.score);

  return {
    videos: scoredVideos.slice(0, videoCount).map((s) => s.video),
    quotes: scoredQuotes.slice(0, quoteCount).map((s) => s.quote),
  };
}

/**
 * Get a motivational message based on the user's current mood.
 */
export function getMoodMessage(mood: Mood): string {
  const messages: Record<Mood, string[]> = {
    great: [
      "You're radiating positivity! Let's channel that energy.",
      "Amazing energy today! Keep that momentum going.",
    ],
    good: [
      "Solid vibes today. Let's make it even better.",
      "Good energy! Here's your daily boost.",
    ],
    okay: [
      "Every day is a new opportunity. Let's find your spark.",
      "You showed up — that's already a win. Let's go.",
    ],
    low: [
      "It's okay to have tough days. We've got you.",
      "Sending you extra love today. You're not alone in this.",
    ],
    struggling: [
      "You're braver than you know for being honest. Let's take this one step at a time.",
      "Even on the hardest days, you matter. Here's some extra care for you.",
    ],
  };

  const options = messages[mood];
  return options[Math.floor(Math.random() * options.length)];
}
