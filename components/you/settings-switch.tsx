import { Pressable, View } from 'react-native';

type SettingsSwitchProps = {
  value: boolean;
  onValueChange: (value: boolean) => void;
  label: string;
};

export function SettingsSwitch({ value, onValueChange, label }: SettingsSwitchProps) {
  return (
    <Pressable
      accessibilityRole="switch"
      accessibilityLabel={label}
      accessibilityState={{ checked: value }}
      onPress={() => onValueChange(!value)}
      className={`h-8 w-14 flex-row items-center rounded-full px-1 ${value ? 'justify-end bg-primary' : 'justify-start bg-muted'}`}>
      <View className="size-6 rounded-full bg-white" />
    </Pressable>
  );
}
