import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS, SHADOWS } from '../../constants/theme';
import { useContentStore } from '../../stores/contentStore';
import { SAMPLE_VIDEOS } from '../../constants/sampleVideos';
import { getCategoryById } from '../../constants/categories';

export default function VideoPlayerScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { toggleFavorite, isFavorited } = useContentStore();

  const video = SAMPLE_VIDEOS.find((v) => v.id === id);

  if (!video) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Video not found</Text>
      </SafeAreaView>
    );
  }

  const saved = isFavorited(video.id);

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      {/* Video placeholder — in production, this would be expo-av Video or a YouTube WebView */}
      <View style={styles.videoPlayer}>
        <View style={styles.videoPlaceholder}>
          <Text style={styles.playButton}>▶</Text>
          <Text style={styles.videoPlaceholderText}>
            Video Player{'\n'}(YouTube embed in production)
          </Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>{video.title}</Text>
        <Text style={styles.channel}>{video.sourceChannel}</Text>

        {/* Actions */}
        <View style={styles.actions}>
          <Pressable
            style={styles.actionButton}
            onPress={() => toggleFavorite(video)}
          >
            <Text style={styles.actionEmoji}>{saved ? '❤️' : '🤍'}</Text>
            <Text style={styles.actionLabel}>
              {saved ? 'Saved' : 'Save'}
            </Text>
          </Pressable>
          <Pressable style={styles.actionButton}>
            <Text style={styles.actionEmoji}>📤</Text>
            <Text style={styles.actionLabel}>Share</Text>
          </Pressable>
          <Pressable style={styles.actionButton}>
            <Text style={styles.actionEmoji}>📋</Text>
            <Text style={styles.actionLabel}>Add to Plan</Text>
          </Pressable>
        </View>

        {/* Description */}
        <View style={styles.descriptionSection}>
          <Text style={styles.sectionTitle}>About this video</Text>
          <Text style={styles.description}>{video.description}</Text>
        </View>

        {/* Categories */}
        <View style={styles.tagsSection}>
          <Text style={styles.sectionTitle}>Topics</Text>
          <View style={styles.tags}>
            {video.categories.map((catId) => {
              const cat = getCategoryById(catId);
              if (!cat) return null;
              return (
                <View
                  key={cat.id}
                  style={[styles.tag, { backgroundColor: cat.color + '20' }]}
                >
                  <Text style={styles.tagEmoji}>{cat.emoji}</Text>
                  <Text style={[styles.tagLabel, { color: cat.color }]}>
                    {cat.label}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>

        {/* Encouragement */}
        <View style={styles.encouragement}>
          <Text style={styles.encouragementText}>
            Great choice watching this! Every video is a step toward the best version of you. 💪
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  videoPlayer: {
    width: '100%',
    aspectRatio: 16 / 9,
    backgroundColor: '#000',
  },
  videoPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButton: {
    fontSize: 48,
    color: '#fff',
    marginBottom: SPACING.sm,
  },
  videoPlaceholderText: {
    color: '#999',
    textAlign: 'center',
    fontSize: FONT_SIZES.sm,
  },
  content: {
    padding: SPACING.lg,
    paddingBottom: SPACING.xxl,
  },
  title: {
    fontSize: FONT_SIZES.xl,
    fontWeight: '800',
    color: COLORS.textPrimary,
    lineHeight: 28,
  },
  channel: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
    fontWeight: '600',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
    marginBottom: SPACING.lg,
  },
  actionButton: {
    alignItems: 'center',
    gap: SPACING.xs,
  },
  actionEmoji: {
    fontSize: 24,
  },
  actionLabel: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  descriptionSection: {
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.md,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
  },
  description: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
    lineHeight: 24,
  },
  tagsSection: {
    marginBottom: SPACING.lg,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.full,
    gap: SPACING.xs,
  },
  tagEmoji: {
    fontSize: 14,
  },
  tagLabel: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
  },
  encouragement: {
    backgroundColor: COLORS.primaryLight + '15',
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
  },
  encouragementText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.primary,
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 22,
  },
  errorText: {
    fontSize: FONT_SIZES.lg,
    color: COLORS.error,
    textAlign: 'center',
    marginTop: SPACING.xxl,
  },
});
