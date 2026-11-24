import { Text } from '@/components/ui/text';
import type { AvailabilityVisibility } from '@/lib/group-store';
import { Pressable, View } from 'react-native';
import { GROUP_VISIBILITY_OPTIONS } from './group-visibility-option';

export function GroupVisibilitySelector({
  value,
  onChange,
  disabled = false,
}: {
  value: AvailabilityVisibility;
  onChange: (value: AvailabilityVisibility) => void;
  disabled?: boolean;
}) {
  return (
    <View className="flex-row flex-wrap gap-2">
      {GROUP_VISIBILITY_OPTIONS.map((option) => {
        const selected = value === option.value;

        return (
          <Pressable
            key={option.value}
            accessibilityRole="radio"
            accessibilityState={{ selected, disabled }}
            disabled={disabled}
            onPress={() => onChange(option.value)}
            className={`min-h-12 items-center justify-center rounded-xl border px-4 ${
              selected ? 'border-primary bg-primary' : 'border-border bg-background'
            }`}>
            <Text className={`font-semibold ${selected ? 'text-primary-foreground' : ''}`}>
              {option.title}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
