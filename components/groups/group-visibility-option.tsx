import { Card } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import type { AvailabilityVisibility } from '@/lib/group-store';
import { Pressable, View } from 'react-native';

export type VisibilityOption = {
  value: AvailabilityVisibility;
  title: string;
  description: string;
};

export const GROUP_VISIBILITY_OPTIONS: VisibilityOption[] = [
  { value: 'hidden', title: 'Hidden', description: 'Nothing at all' },
  { value: 'busy_only', title: 'Busy only', description: 'Blocks marked busy, no details' },
  { value: 'titles', title: 'Titles', description: 'Event names only' },
  { value: 'full', title: 'Full', description: 'Names, notes and location' },
];

type GroupVisibilityOptionProps = {
  option: VisibilityOption;
  selected: boolean;
  onSelect: (value: AvailabilityVisibility) => void;
};

export function GroupVisibilityOption({ option, selected, onSelect }: GroupVisibilityOptionProps) {
  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{ selected }}
      onPress={() => onSelect(option.value)}>
      <Card
        className={`flex-row items-center gap-3 rounded-xl border px-3 py-3 shadow-none ${
          selected ? 'border-primary bg-accent-soft' : 'border-border bg-card'
        }`}>
        <View className={`size-5 items-center justify-center rounded-full border-2 ${selected ? 'border-primary' : 'border-muted-foreground'}`}>
          {selected && <View className="size-2.5 rounded-full bg-primary" />}
        </View>
        <View className="flex-1 gap-0.5">
          <Text className="font-semibold">{option.title}</Text>
          <Text className="text-xs text-muted-foreground">{option.description}</Text>
        </View>
      </Card>
    </Pressable>
  );
}
