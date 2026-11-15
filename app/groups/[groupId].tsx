import { Text } from '@/components/ui/text';
import { useGroupStore } from '@/lib/group-store';
import { Stack, useLocalSearchParams } from 'expo-router';
import { View } from 'react-native';

export default function GroupDetailsPlaceholder() {
  const { groupId } = useLocalSearchParams<{ groupId: string }>();
  const group = useGroupStore((state) => state.groups.find((item) => item.id === groupId));

  return (
    <View className="flex-1 gap-2 bg-background p-5 pt-8">
      <Stack.Screen options={{ title: group?.name ?? 'Group' }} />
      {group ? (
        <>
          <Text className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Group</Text>
          <Text className="text-3xl font-bold">{group.name}</Text>
          <Text className="mt-2 text-sm text-muted-foreground">Group details will be built next.</Text>
        </>
      ) : (
        <Text className="text-sm text-muted-foreground">This group could not be found.</Text>
      )}
    </View>
  );
}
