import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { Alert, View } from 'react-native';

export function GroupActions() {
  return (
    <View className="gap-3 px-5 pb-4 pt-2">
      <Button
        size="lg"
        className="h-14 w-full rounded-2xl"
        onPress={() => Alert.alert('New group', 'Group creation will be added later.')}>
        <Text className="text-base font-semibold">+ New group</Text>
      </Button>
      <Button
        variant="outline"
        size="lg"
        className="h-12 w-full rounded-xl"
        onPress={() => Alert.alert('Join group', 'Joining with an invite code will be added later.')}>
        <Text>Join with invite code</Text>
      </Button>
    </View>
  );
}
