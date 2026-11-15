import { GroupDetailsScreen } from '@/components/groups/group-details-screen';
import { useLocalSearchParams } from 'expo-router';

export default function GroupDetailsRoute() {
  const { groupId } = useLocalSearchParams<{ groupId: string }>();
  return <GroupDetailsScreen groupId={groupId} />;
}
