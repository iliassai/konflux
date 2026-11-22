import { Text } from '@/components/ui/text';
import { Pressable, View } from 'react-native';

export type PlanListView = 'open' | 'confirmed';

type PlanViewToggleProps = {
  value: PlanListView;
  onChange: (view: PlanListView) => void;
};

export function PlanViewToggle({ value, onChange }: PlanViewToggleProps) {
  return (
    <View className="flex-row">
      {(['open', 'confirmed'] as const).map((view) => {
        const selected = value === view;

        return (
          <Pressable
            key={view}
            accessibilityRole="button"
            accessibilityState={{ selected }}
            onPress={() => onChange(view)}
            className={`flex-1 items-center justify-center rounded-xl py-3 ${selected ? 'bg-accent-soft' : ''}`}>
            <Text className={`font-semibold capitalize ${selected ? 'text-primary' : 'text-muted-foreground'}`}>
              {view}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
