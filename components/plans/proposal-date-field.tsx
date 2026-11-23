import { Text } from '@/components/ui/text';
import { Pressable, View } from 'react-native';

function formatDate(date: Date) {
  const weekday = new Intl.DateTimeFormat('en-GB', { weekday: 'short' }).format(date);
  const dayAndMonth = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short' }).format(date);
  return `${weekday} ${dayAndMonth}`;
}

export function ProposalDateField({
  label,
  value,
  onPress,
}: {
  label: string;
  value: Date;
  onPress: () => void;
}) {
  return (
    <View className="flex-1 gap-2">
      <Text className="text-sm font-semibold tracking-wider text-muted-foreground">{label}</Text>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`${label === 'FROM' ? 'Start' : 'End'} date, ${formatDate(value)}`}
        onPress={onPress}
        className="h-14 justify-center rounded-2xl border border-border bg-card px-4 active:opacity-80">
        <Text className="text-base font-medium">{formatDate(value)}</Text>
      </Pressable>
    </View>
  );
}
