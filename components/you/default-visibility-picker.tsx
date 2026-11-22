import { Text } from '@/components/ui/text';
import type { AvailabilityVisibility } from '@/lib/group-store';
import { THEME } from '@/lib/theme';
import { Check } from 'lucide-react-native';
import { Modal, Pressable, View } from 'react-native';
import { useUniwind } from 'uniwind';

const options: { value: AvailabilityVisibility; title: string; description: string }[] = [
  { value: 'hidden', title: 'Hidden', description: 'Nothing at all' },
  { value: 'busy_only', title: 'Busy only', description: 'Blocks marked busy, no details' },
  { value: 'titles', title: 'Titles', description: 'Event names only' },
  { value: 'full', title: 'Full', description: 'Names, notes and location' },
];

type DefaultVisibilityPickerProps = {
  visible: boolean;
  value: AvailabilityVisibility;
  onSelect: (value: AvailabilityVisibility) => void;
  onClose: () => void;
};

export function DefaultVisibilityPicker({ visible, value, onSelect, onClose }: DefaultVisibilityPickerProps) {
  const { theme } = useUniwind();
  const colors = THEME[theme === 'dark' ? 'nord-dark' : 'nord-light'];

  return (
    <Modal transparent animationType="fade" visible={visible} onRequestClose={onClose}>
      <View className="flex-1 justify-end bg-black/40">
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Close visibility options"
          onPress={onClose}
          className="flex-1"
        />
        <View className="gap-3 rounded-t-2xl bg-background px-5 pb-8 pt-5">
          <Text className="text-lg font-semibold">Default group visibility</Text>
          <Text className="text-sm text-muted-foreground">Choose what new groups can see.</Text>
          {options.map((option) => {
            const selected = option.value === value;

            return (
              <Pressable
                key={option.value}
                accessibilityRole="radio"
                accessibilityState={{ selected }}
                onPress={() => onSelect(option.value)}
                className={`flex-row items-center justify-between rounded-xl border px-4 py-3 ${selected ? 'border-primary bg-accent-soft' : 'border-border bg-card'}`}>
                <View className="gap-0.5">
                  <Text className="font-semibold">{option.title}</Text>
                  <Text className="text-sm text-muted-foreground">{option.description}</Text>
                </View>
                {selected && <Check size={18} color={colors.primary} />}
              </Pressable>
            );
          })}
          <Pressable accessibilityRole="button" onPress={onClose} className="items-center py-2">
            <Text className="font-semibold text-primary">Cancel</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}
