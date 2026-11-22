import { Card } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import type { AvailabilityVisibility } from '@/lib/group-store';
import { ChevronRight } from 'lucide-react-native';
import { Pressable, View } from 'react-native';

const labels: Record<AvailabilityVisibility, string> = {
  hidden: 'Hidden',
  busy_only: 'Busy only',
  titles: 'Titles',
  full: 'Full',
};

type DefaultSharingRowProps = {
  value: AvailabilityVisibility;
  onPress: () => void;
};

export function DefaultSharingRow({ value, onPress }: DefaultSharingRowProps) {
  return (
    <Pressable accessibilityRole="button" onPress={onPress}>
      <Card className="flex-row items-center justify-between gap-3 rounded-xl border border-border bg-card px-4 py-4 shadow-none">
        <View className="flex-1 gap-0.5">
          <Text className="text-base font-semibold">Default group visibility</Text>
          <Text className="text-sm text-muted-foreground">What new groups can see</Text>
        </View>
        <View className="flex-row items-center gap-1">
          <Text className="text-sm font-medium text-muted-foreground">{labels[value]}</Text>
          <ChevronRight size={18} color="#5D6982" />
        </View>
      </Card>
    </Pressable>
  );
}
