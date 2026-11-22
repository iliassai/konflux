import { Text } from '@/components/ui/text';
import { Pressable, View } from 'react-native';

export type AppTheme = 'system' | 'light' | 'dark';

type ThemeSelectorProps = {
  value: AppTheme;
  onChange: (theme: AppTheme) => void;
};

const options: AppTheme[] = ['system', 'light', 'dark'];

export function ThemeSelector({ value, onChange }: ThemeSelectorProps) {
  return (
    <View className="flex-row gap-2">
      {options.map((option) => {
        const selected = option === value;

        return (
          <Pressable
            key={option}
            accessibilityRole="button"
            accessibilityState={{ selected }}
            onPress={() => onChange(option)}
            className={`h-12 flex-1 items-center justify-center rounded-xl border ${selected ? 'border-primary bg-primary' : 'border-border bg-background'}`}>
            <Text className={`font-semibold capitalize ${selected ? 'text-primary-foreground' : 'text-muted-foreground'}`}>
              {option}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
