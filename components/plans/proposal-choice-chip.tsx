import { Text } from '@/components/ui/text';
import { Pressable } from 'react-native';

export function ProposalChoiceChip({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{ selected }}
      onPress={onPress}
      className={`min-h-[48px] items-center justify-center rounded-xl border px-4 ${
        selected ? 'border-primary bg-primary' : 'border-border bg-background'
      }`}>
      <Text className={`text-sm font-semibold ${selected ? 'text-primary-foreground' : ''}`}>{label}</Text>
    </Pressable>
  );
}
