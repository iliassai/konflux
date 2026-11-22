import { Pressable } from 'react-native';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useEffect } from 'react';

type SettingsSwitchProps = {
  value: boolean;
  onValueChange: (value: boolean) => void;
  label: string;
};

export function SettingsSwitch({ value, onValueChange, label }: SettingsSwitchProps) {
  const position = useSharedValue(value ? 24 : 0);

  useEffect(() => {
    position.value = withTiming(value ? 24 : 0, {
      duration: 160,
      easing: Easing.out(Easing.quad),
    });
  }, [position, value]);

  const thumbStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: position.value }],
  }));

  return (
    <Pressable
      accessibilityRole="switch"
      accessibilityLabel={label}
      accessibilityState={{ checked: value }}
      onPress={() => onValueChange(!value)}
      className={`relative h-8 w-14 justify-center rounded-full px-1 ${value ? 'bg-primary' : 'bg-muted'}`}>
      <Animated.View className="size-6 rounded-full bg-white" style={thumbStyle} />
    </Pressable>
  );
}
