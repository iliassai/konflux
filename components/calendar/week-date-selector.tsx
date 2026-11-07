import { Text } from '@/components/ui/text';
import { addDays, startOfWeek } from '@/lib/calendar-dates';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import { Pressable, View } from 'react-native';

type WeekDateSelectorProps = {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
};

const weekdayLetters = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

export function WeekDateSelector({ selectedDate, onDateChange }: WeekDateSelectorProps) {
  const weekStart = startOfWeek(selectedDate);
  const dates = Array.from({ length: 7 }, (_, index) => addDays(weekStart, index));

  return (
    <View className="w-full flex-row items-center justify-center gap-1">
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Previous week"
        hitSlop={8}
        onPress={() => onDateChange(addDays(selectedDate, -7))}
        className="size-8 items-center justify-center">
        <ChevronLeft size={18} color="#5D6982" />
      </Pressable>
      {dates.map((date) => {
        const selected = date.toDateString() === selectedDate.toDateString();

        return (
          <Pressable
            key={date.toISOString()}
            accessibilityRole="button"
            accessibilityLabel={new Intl.DateTimeFormat(undefined, {
              dateStyle: 'full',
            }).format(date)}
            accessibilityState={{ selected }}
            onPress={() => onDateChange(date)}
            className={`min-w-9 items-center gap-1 rounded-md px-2 py-2 ${selected ? 'bg-primary/20' : ''}`}>
            <Text className={`text-sm ${selected ? 'text-primary' : 'text-muted-foreground'}`}>
              {weekdayLetters[date.getDay()]}
            </Text>
            <Text className={`text-lg font-semibold ${selected ? 'text-primary' : ''}`}>
              {date.getDate()}
            </Text>
          </Pressable>
        );
      })}
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Next week"
        hitSlop={8}
        onPress={() => onDateChange(addDays(selectedDate, 7))}
        className="size-8 items-center justify-center">
        <ChevronRight size={18} color="#5D6982" />
      </Pressable>
    </View>
  );
}
