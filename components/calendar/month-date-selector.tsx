import { Text } from '@/components/ui/text';
import { addDays, addMonths, startOfWeek } from '@/lib/calendar-dates';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import { Pressable, View } from 'react-native';

type MonthDateSelectorProps = {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
};

const weekdayLetters = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

export function MonthDateSelector({ selectedDate, onDateChange }: MonthDateSelectorProps) {
  const firstOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
  const gridStart = startOfWeek(firstOfMonth);
  const dates = Array.from({ length: 42 }, (_, index) => addDays(gridStart, index));

  const changeMonth = (amount: number) => onDateChange(addMonths(selectedDate, amount));

  return (
    <View className="gap-3">
      <View className="flex-row items-center justify-between">
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Previous month"
          hitSlop={8}
          onPress={() => changeMonth(-1)}
          className="size-9 items-center justify-center rounded-md">
          <ChevronLeft size={20} color="#5D6982" />
        </Pressable>
        <Text className="font-semibold">
          {new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(selectedDate)}
        </Text>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Next month"
          hitSlop={8}
          onPress={() => changeMonth(1)}
          className="size-9 items-center justify-center rounded-md">
          <ChevronRight size={20} color="#5D6982" />
        </Pressable>
      </View>

      <View className="flex-row">
        {weekdayLetters.map((letter, index) => (
          <View key={`${letter}-${index}`} className="flex-1 items-center py-1">
            <Text className="text-sm font-medium text-muted-foreground">{letter}</Text>
          </View>
        ))}
      </View>

      <View className="gap-1">
        {Array.from({ length: 6 }, (_, weekIndex) => (
          <View key={weekIndex} className="flex-row">
            {dates.slice(weekIndex * 7, weekIndex * 7 + 7).map((date) => {
              const selected = date.toDateString() === selectedDate.toDateString();
              const inCurrentMonth = date.getMonth() === selectedDate.getMonth();
              const isToday = date.toDateString() === new Date().toDateString();

              return (
                <Pressable
                  key={date.toISOString()}
                  accessibilityRole="button"
                  accessibilityLabel={new Intl.DateTimeFormat('en-US', { dateStyle: 'full' }).format(date)}
                  accessibilityState={{ selected }}
                  onPress={() => onDateChange(date)}
                  className="flex-1 items-center py-1">
                  <View
                    className={`size-10 items-center justify-center rounded-lg ${selected ? 'bg-primary/20' : ''}`}>
                    <Text
                      className={`text-base ${selected ? 'font-bold text-primary' : ''} ${inCurrentMonth ? '' : 'text-muted-foreground/50'} ${isToday && !selected ? 'font-semibold text-primary' : ''}`}>
                      {date.getDate()}
                    </Text>
                  </View>
                </Pressable>
              );
            })}
          </View>
        ))}
      </View>
    </View>
  );
}
