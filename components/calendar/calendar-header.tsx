import { Text } from '@/components/ui/text';
import { Pressable, View } from 'react-native';

export type CalendarView = 'week' | 'month';

type CalendarHeaderProps = {
  date: Date;
  view: CalendarView;
  onViewChange: (view: CalendarView) => void;
};

export function CalendarHeader({ date, view, onViewChange }: CalendarHeaderProps) {
  const monthLabel = new Intl.DateTimeFormat(undefined, {
    month: 'long',
    year: 'numeric',
  }).format(date);
  const isToday = date.toDateString() === new Date().toDateString();
  const title = isToday
    ? 'Today'
    : `${new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date)}, ${date.getDate()}`;

  return (
    <View className="gap-3">
      {view === 'week' && <Text className="text-base text-muted-foreground">{monthLabel}</Text>}
      <View className="flex-row items-center justify-between">
        <Text className="text-3xl font-bold">{title}</Text>
        <View className="flex-row rounded-md bg-card p-1">
          {(['week', 'month'] as const).map((option) => {
            const selected = view === option;

            return (
              <Pressable
                key={option}
                accessibilityRole="button"
                accessibilityState={{ selected }}
                onPress={() => onViewChange(option)}
                className={`rounded-md px-4 py-2 ${selected ? 'bg-primary/15' : ''}`}>
                <Text className={`font-semibold capitalize ${selected ? 'text-primary' : 'text-muted-foreground'}`}>
                  {option}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>
    </View>
  );
}
