import { Card } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import { SettingsSwitch } from '@/components/you/settings-switch';
import { View } from 'react-native';

type PreferenceCardProps = {
  title: string;
  description: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
};

export function PreferenceCard({ title, description, value, onValueChange }: PreferenceCardProps) {
  return (
    <Card className="flex-row items-center justify-between gap-3 rounded-xl border border-border bg-card px-4 py-4 shadow-none">
      <View className="flex-1 gap-0.5">
        <Text className="text-base font-semibold">{title}</Text>
        <Text className="text-sm text-muted-foreground">{description}</Text>
      </View>
      <SettingsSwitch value={value} onValueChange={onValueChange} label={title} />
    </Card>
  );
}
