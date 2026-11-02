import { Text } from '@/components/ui/text';
import { View } from 'react-native';

export default function YouScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-background">
      <Text className="text-2xl text-foreground">You</Text>
    </View>
  );
}
