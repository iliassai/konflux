import { GroupCard, type GroupCardData } from '@/components/groups/group-card';
import { Text } from '@/components/ui/text';
import {
  CURRENT_USER_ID,
  useGroupStore,
  type GroupMember,
} from '@/lib/group-store';
import { FlatList, View } from 'react-native';
import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useRef, useState } from 'react';

function formatNextPlan(startsAt: string) {
  const date = new Date(startsAt);
  const weekday = new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(date);
  const time = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit' }).format(date);
  return `Next: ${weekday} ${time}`;
}

function GroupSeparator() {
  return <View className="h-3" />;
}

export function GroupList() {
  const router = useRouter();
  const navigationLock = useRef(false);
  const [isOpeningGroup, setIsOpeningGroup] = useState(false);

  useFocusEffect(
    useCallback(() => {
      navigationLock.current = false;
      setIsOpeningGroup(false);
    }, [])
  );

  const groups = useGroupStore((state) => state.groups);
  const members = useGroupStore((state) => state.members);
  const memberships = useGroupStore((state) => state.memberships);
  const plans = useGroupStore((state) => state.plans);
  const votes = useGroupStore((state) => state.votes);

  const memberById = new Map(members.map((member) => [member.id, member]));

  const cardData: GroupCardData[] = groups.map((group) => {
    const groupPlans = plans.filter((plan) => plan.groupId === group.id);
    const pendingVoteCount = groupPlans.filter((plan) =>
      plan.status === 'voting' &&
      !votes.some((vote) => vote.planId === plan.id && vote.userId === CURRENT_USER_ID)
    ).length;
    const nextPlan = groupPlans
      .filter((plan) => plan.status === 'confirmed' && plan.startsAt && new Date(plan.startsAt) >= new Date())
      .sort((a, b) => new Date(a.startsAt!).getTime() - new Date(b.startsAt!).getTime())[0];
    const membership = memberships.find((item) =>
      item.groupId === group.id && item.userId === CURRENT_USER_ID
    );
    const groupMembers = group.memberIds
      .map((id) => memberById.get(id))
      .filter((member): member is GroupMember => member !== undefined);

    return {
      group,
      members: groupMembers,
      totalMembers: group.memberIds.length,
      visibility: membership?.availabilityVisibility ?? 'busy_only',
      pendingVoteCount,
      nextPlanLabel: nextPlan?.startsAt ? formatNextPlan(nextPlan.startsAt) : null,
    };
  });

  return (
    <FlatList
      data={cardData}
      keyExtractor={(item) => item.group.id}
      renderItem={({ item }) => (
        <GroupCard
          data={item}
          disabled={isOpeningGroup}
          onPress={() => {
            if (navigationLock.current) return;
            navigationLock.current = true;
            setIsOpeningGroup(true);
            router.push({ pathname: '/groups/[groupId]', params: { groupId: item.group.id } });
          }}
        />
      )}
      ItemSeparatorComponent={GroupSeparator}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 40, paddingBottom: 16 }}
      ListHeaderComponent={
        <View className="mb-4 gap-1">
          <Text className="text-xs text-muted-foreground">{groups.length} groups</Text>
          <Text className="text-3xl font-bold">Groups</Text>
        </View>
      }
      ListEmptyComponent={
        <View className="items-center py-12">
          <Text className="font-semibold">No groups yet</Text>
          <Text className="mt-1 text-center text-sm text-muted-foreground">
            Create a group or join one with an invite code.
          </Text>
        </View>
      }
    />
  );
}
