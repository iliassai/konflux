import { GroupActions } from '@/components/groups/group-actions';
import { GroupList } from '@/components/groups/group-list';
import { ScreenHeading } from '@/components/ui/screen-heading';
import { useGroupStore } from '@/lib/group-store';
import { View } from 'react-native';

export default function GroupsScreen() {
  const groupCount = useGroupStore((state) => state.groups.length);

  return (
    <View className="flex-1 bg-background">
      <View className="px-5 pb-3 pt-10">
        <ScreenHeading eyebrow={`${groupCount} groups`} title="Groups" />
      </View>
      <GroupList />
      <GroupActions />
    </View>
  );
}
