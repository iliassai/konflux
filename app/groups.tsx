import { GroupActions } from '@/components/groups/group-actions';
import { GroupList } from '@/components/groups/group-list';
import { View } from 'react-native';

export default function GroupsScreen() {
  return (
    <View className="flex-1 bg-background">
      <GroupList />
      <GroupActions />
    </View>
  );
}
