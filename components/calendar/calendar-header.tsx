import { Text } from '@/components/ui/text';
import { Pressable, View } from 'react-native';
import { RotateCcw } from 'lucide-react-native';
import Animated, {
  LinearTransition,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useEffect } from 'react';

export type CalendarView = 'week' | 'month';

type CalendarHeaderProps = {
  date: Date;
  view: CalendarView;
  onViewChange: (view: CalendarView) => void;
  onTodayPress: () => void;
};

export function CalendarHeader({ date, view, onViewChange, onTodayPress }: CalendarHeaderProps) {
  const togglePosition = useSharedValue(view === 'week' ? 0 : 1);

  useEffect(() => {
    togglePosition.value = withTiming(view === 'week' ? 0 : 1, { duration: 220 });
  }, [togglePosition, view]);

  const toggleIndicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: togglePosition.value * 70 }],
  }));

  const monthLabel = new Intl.DateTimeFormat(undefined, {
    month: 'long',
    year: 'numeric',
  }).format(date);
  const isToday = date.toDateString() === new Date().toDateString();
  const title = isToday
    ? 'Today'
    : `${new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date)}, ${date.getDate()}`;

  return (
    <Animated.View layout={LinearTransition.duration(220)} className="gap-3">
      {(view === 'week' || !isToday) && (
        <Animated.View layout={LinearTransition.duration(220)} className="h-8 flex-row items-center justify-between">
          {view === 'week' ? (
            <Text className="text-base text-muted-foreground">{monthLabel}</Text>
          ) : (
            <View />
          )}
          {!isToday && (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Go to today"
              onPress={onTodayPress}
              hitSlop={8}
              className="size-8 items-center justify-center rounded-md">
              <RotateCcw size={18} color="#5D6982" />
            </Pressable>
          )}
        </Animated.View>
      )}
      <View className="flex-row items-center justify-between">
        <Text className="flex-1 text-2xl font-bold" numberOfLines={1}>
          {title}
        </Text>
        <View className="relative h-10 w-[148px] flex-row rounded-md bg-card p-1">
          <Animated.View
            pointerEvents="none"
            className="absolute bottom-1 left-1 top-1 w-[70px] rounded-md bg-primary/15"
            style={toggleIndicatorStyle}
          />
          {(['week', 'month'] as const).map((option) => {
            const selected = view === option;

            return (
              <Pressable
                key={option}
                accessibilityRole="button"
                accessibilityState={{ selected }}
                onPress={() => onViewChange(option)}
                className="z-10 flex-1 items-center justify-center rounded-md">
                <Text className={`font-semibold capitalize ${selected ? 'text-primary' : 'text-muted-foreground'}`}>
                  {option}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>
    </Animated.View>
  );
}
