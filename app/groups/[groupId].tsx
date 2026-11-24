import { GroupDetailsScreen } from '@/components/groups/group-details-screen';
import { useLocalSearchParams } from 'expo-router';

export default function GroupDetailsRoute() {
  const { groupId, created } = useLocalSearchParams<{ groupId: string; created?: string }>();
  return <GroupDetailsScreen groupId={groupId} showCreatedToast={created === '1'} />;
}
