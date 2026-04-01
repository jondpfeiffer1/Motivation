import type { VideoContent, Category } from '../types';

// YouTube Data API v3 integration
// In production, API calls should go through your backend to protect the API key.

const YOUTUBE_API_KEY = process.env.EXPO_PUBLIC_YOUTUBE_API_KEY ?? '';

// Curated motivational YouTube channels (whitelisted for quality)
export const MOTIVATIONAL_CHANNELS = [
  { id: 'UCGwu0nbY2wSkW8N-cghnLpA', name: 'Jaiden Animations' },
  { id: 'UCfbLDMh6uGOZePAfqqjVZ-g', name: 'Motiversity' },
  { id: 'UCsT0YIqwnpJCM-mx7-gSA4Q', name: 'TEDx Talks' },
  { id: 'UC-lHJZR3Gqxm24_Vd_AJ5Yw', name: 'Goalcast' },
  { id: 'UCVjlpEjEY9GpksqbEesJnNA', name: 'Jay Shetty' },
  { id: 'UCG-KntY7aVnIGXYEBQvmBAQ', name: 'Thomas Frank' },
] as const;

// Category-to-search-query mapping for the YouTube API
const CATEGORY_QUERIES: Record<Category, string[]> = {
  anxiety: ['overcoming anxiety motivation', 'calm anxiety tips', 'mental health motivation'],
  depression: ['overcoming depression', 'finding hope motivation', 'mental health inspiration'],
  career: ['career motivation', 'success mindset', 'entrepreneurship inspiration'],
  relationships: ['healthy relationships', 'love motivation', 'connection inspiration'],
  'self-love': ['self love motivation', 'confidence building', 'self worth inspiration'],
  fitness: ['fitness motivation', 'workout inspiration', 'health transformation'],
  financial: ['financial freedom motivation', 'wealth mindset', 'money motivation'],
  grief: ['healing from loss', 'grief support', 'finding peace after loss'],
  'addiction-recovery': ['addiction recovery motivation', 'sobriety inspiration', 'recovery stories'],
  'student-life': ['student motivation', 'study inspiration', 'academic success'],
  parenting: ['parenting motivation', 'being a great parent', 'family inspiration'],
  spirituality: ['spiritual growth', 'mindfulness motivation', 'purpose and meaning'],
};

/**
 * Search YouTube for motivational videos by category.
 * Returns formatted VideoContent objects ready for the app.
 *
 * Note: This requires a valid YouTube Data API v3 key.
 * For MVP/demo, the app uses sample data from constants/sampleVideos.ts.
 */
export async function searchMotivationalVideos(
  category: Category,
  maxResults: number = 5
): Promise<VideoContent[]> {
  if (!YOUTUBE_API_KEY) {
    console.warn('YouTube API key not configured. Using sample data.');
    return [];
  }

  const queries = CATEGORY_QUERIES[category];
  const query = queries[Math.floor(Math.random() * queries.length)];

  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?` +
        `part=snippet&type=video&maxResults=${maxResults}` +
        `&q=${encodeURIComponent(query)}` +
        `&videoDuration=medium` +
        `&key=${YOUTUBE_API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`YouTube API error: ${response.status}`);
    }

    const data = await response.json();

    return data.items.map((item: any) => ({
      id: item.id.videoId,
      type: 'video' as const,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnailUrl: item.snippet.thumbnails.high.url,
      videoUrl: `https://www.youtube.com/watch?v=${item.id.videoId}`,
      sourceChannel: item.snippet.channelTitle,
      categories: [category],
      durationSeconds: 0, // Would need a separate API call for duration
      createdAt: item.snippet.publishedAt,
    }));
  } catch (error) {
    console.error('Failed to fetch YouTube videos:', error);
    return [];
  }
}

/**
 * Get the search queries associated with a content category.
 */
export function getQueriesForCategory(category: Category): string[] {
  return CATEGORY_QUERIES[category] ?? [];
}
