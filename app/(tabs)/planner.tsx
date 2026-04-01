import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS, SHADOWS } from '../../constants/theme';
import { DailyChecklist } from '../../components/DailyChecklist';
import { usePlannerStore } from '../../stores/plannerStore';

export default function PlannerScreen() {
  const { todaysPlan, addTask, toggleTask } = usePlannerStore();
  const [newTaskText, setNewTaskText] = useState('');
  const [showAddTask, setShowAddTask] = useState(false);

  const handleAddTask = () => {
    if (newTaskText.trim()) {
      addTask(newTaskText.trim(), 'custom');
      setNewTaskText('');
      setShowAddTask(false);
    }
  };

  const completedCount = todaysPlan.tasks.filter((t) => t.completed).length;
  const totalCount = todaysPlan.tasks.length;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Daily Planner</Text>
          <Text style={styles.date}>
            {new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              month: 'long',
              day: 'numeric',
            })}
          </Text>
        </View>

        {/* Completion summary */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryLeft}>
            <Text style={styles.summaryEmoji}>
              {completedCount === totalCount && totalCount > 0
                ? '🎉'
                : completedCount > 0
                  ? '💪'
                  : '🌅'}
            </Text>
            <View>
              <Text style={styles.summaryTitle}>
                {completedCount === totalCount && totalCount > 0
                  ? 'All done! Amazing!'
                  : completedCount > 0
                    ? 'Keep going!'
                    : 'Start your day right'}
              </Text>
              <Text style={styles.summarySubtitle}>
                {completedCount}/{totalCount} tasks completed
              </Text>
            </View>
          </View>
        </View>

        {/* Daily checklist */}
        <DailyChecklist tasks={todaysPlan.tasks} onToggle={toggleTask} />

        {/* Add task section */}
        {showAddTask ? (
          <View style={styles.addTaskForm}>
            <TextInput
              style={styles.addTaskInput}
              placeholder="What do you want to accomplish?"
              placeholderTextColor={COLORS.textMuted}
              value={newTaskText}
              onChangeText={setNewTaskText}
              autoFocus
              onSubmitEditing={handleAddTask}
            />
            <View style={styles.addTaskActions}>
              <Pressable
                style={styles.cancelButton}
                onPress={() => {
                  setShowAddTask(false);
                  setNewTaskText('');
                }}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </Pressable>
              <Pressable style={styles.saveButton} onPress={handleAddTask}>
                <Text style={styles.saveButtonText}>Add Task</Text>
              </Pressable>
            </View>
          </View>
        ) : (
          <Pressable
            style={styles.addTaskButton}
            onPress={() => setShowAddTask(true)}
          >
            <Text style={styles.addTaskIcon}>+</Text>
            <Text style={styles.addTaskLabel}>Add a personal goal</Text>
          </Pressable>
        )}

        {/* Daily routine suggestions */}
        <View style={styles.suggestionsSection}>
          <Text style={styles.suggestionsTitle}>Suggested Routines</Text>
          <SuggestionCard
            emoji="🌅"
            title="Morning Mindset"
            description="Start your day with a video, an affirmation, and 5 minutes of gratitude journaling."
          />
          <SuggestionCard
            emoji="🏋️"
            title="Afternoon Reset"
            description="Take a break to watch a motivational video and reset your energy for the second half of the day."
          />
          <SuggestionCard
            emoji="🌙"
            title="Evening Reflection"
            description="End your day by reviewing what you accomplished and reading an inspiring quote."
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function SuggestionCard({
  emoji,
  title,
  description,
}: {
  emoji: string;
  title: string;
  description: string;
}) {
  return (
    <View style={styles.suggestionCard}>
      <Text style={styles.suggestionEmoji}>{emoji}</Text>
      <View style={styles.suggestionText}>
        <Text style={styles.suggestionTitle}>{title}</Text>
        <Text style={styles.suggestionDescription}>{description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.xxl,
  },
  header: {
    paddingTop: SPACING.md,
    paddingBottom: SPACING.md,
  },
  title: {
    fontSize: FONT_SIZES.xl,
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
  date: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
  },
  summaryCard: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    ...SHADOWS.small,
  },
  summaryLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  summaryEmoji: {
    fontSize: 36,
  },
  summaryTitle: {
    fontSize: FONT_SIZES.md,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  summarySubtitle: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  addTaskButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.md,
    marginTop: SPACING.md,
    borderWidth: 2,
    borderColor: COLORS.border,
    borderStyle: 'dashed',
    borderRadius: BORDER_RADIUS.md,
    gap: SPACING.sm,
  },
  addTaskIcon: {
    fontSize: FONT_SIZES.xl,
    color: COLORS.primary,
    fontWeight: '700',
  },
  addTaskLabel: {
    fontSize: FONT_SIZES.md,
    color: COLORS.primary,
    fontWeight: '600',
  },
  addTaskForm: {
    marginTop: SPACING.md,
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    ...SHADOWS.small,
  },
  addTaskInput: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textPrimary,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingBottom: SPACING.sm,
    marginBottom: SPACING.md,
  },
  addTaskActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: SPACING.sm,
  },
  cancelButton: {
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
  },
  cancelButtonText: {
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  saveButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: BORDER_RADIUS.sm,
  },
  saveButtonText: {
    color: COLORS.textOnPrimary,
    fontWeight: '600',
  },
  suggestionsSection: {
    marginTop: SPACING.xl,
  },
  suggestionsTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },
  suggestionCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    gap: SPACING.md,
    ...SHADOWS.small,
  },
  suggestionEmoji: {
    fontSize: 28,
  },
  suggestionText: {
    flex: 1,
  },
  suggestionTitle: {
    fontSize: FONT_SIZES.md,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  suggestionDescription: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
});
