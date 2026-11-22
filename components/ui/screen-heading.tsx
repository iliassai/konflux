import { Text } from '@/components/ui/text';
import { View } from 'react-native';

type ScreenHeadingProps = {
  eyebrow: string;
  title: string;
};

export function ScreenHeading({ eyebrow, title }: ScreenHeadingProps) {
  return (
    <View className="gap-1">
      <Text className="text-xs text-muted-foreground">{eyebrow}</Text>
      <Text className="text-3xl font-bold">{title}</Text>
    </View>
  );
}
