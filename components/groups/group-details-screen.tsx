import { GroupVisibilityOption, type VisibilityOption } from '@/components/groups/group-visibility-option';
import { MemberAvatarStack } from '@/components/groups/member-avatar-stack';
import { Card } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import { CURRENT_USER_ID, useGroupStore, type AvailabilityVisibility, type GroupMember } from '@/lib/group-store';
import { ChevronLeft } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { Pressable, ScrollView, View } from 'react-native';

const visibilityOptions: VisibilityOption[] = [
  { value: 'hidden', title: 'Hidden', description: 'Nothing at all' },
  { value: 'busy_only', title: 'Busy only', description: 'Blocks marked busy, no details' },
  { value: 'titles', title: 'Titles', description: 'Event names only' },
  { value: 'full', title: 'Full', description: 'Names, notes and location' },
];

const visibilityPreviews: Record<AvailabilityVisibility, string> = {
  hidden: 'They see: Nothing at all. Todos stay private.',
  busy_only: 'They see: Busy · Tue 14:00–16:00. Todos stay private.',
  titles: 'They see: Project meeting · Tue 14:00–16:00. Todos stay private.',
  full: 'They see: Project meeting, notes and location · Tue 14:00–16:00. Todos stay private.',
};

export function GroupDetailsScreen({ groupId }: { groupId: string }) {
  const router = useRouter();
  const group = useGroupStore((state) => state.groups.find((item) => item.id === groupId));
  const members = useGroupStore((state) => state.members);
  const membership = useGroupStore((state) =>
    state.memberships.find((item) => item.groupId === groupId && item.userId === CURRENT_USER_ID)
  );
  const setAvailabilityVisibility = useGroupStore((state) => state.setAvailabilityVisibility);
  const visibility = membership?.availabilityVisibility ?? 'busy_only';

  const groupMembers = group?.memberIds
    .map((id) => members.find((member) => member.id === id))
    .filter((member): member is GroupMember => member !== undefined) ?? [];

  const goBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/groups');
    }
  };

  return (
    <ScrollView
      className="flex-1 bg-background"
      showsVerticalScrollIndicator={false}
      contentContainerClassName="gap-5 px-5 pb-8 pt-10">
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Back to groups"
        onPress={goBack}
        hitSlop={8}
        className="flex-row items-center gap-2 self-start py-1">
        <ChevronLeft size={20} color="#5D6982" />
        <Text className="text-sm text-muted-foreground">Group</Text>
      </Pressable>

      {group ? (
        <>
          <View className="gap-3">
            <Text className="text-3xl font-bold">{group.name}</Text>
            <View className="flex-row items-center gap-3">
              <MemberAvatarStack members={groupMembers} totalMembers={group.memberIds.length} maxVisible={4} />
              <Text className="text-sm text-muted-foreground">{group.memberIds.length} members</Text>
            </View>
          </View>

          <View className="gap-3">
            <Text className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              What this group sees of you
            </Text>
            {visibilityOptions.map((option) => (
              <GroupVisibilityOption
                key={option.value}
                option={option}
                selected={visibility === option.value}
                onSelect={(value) => setAvailabilityVisibility(group.id, CURRENT_USER_ID, value)}
              />
            ))}
          </View>

          <Card className="rounded-xl border border-border bg-background px-3 py-3 shadow-none">
            <Text className="text-xs leading-5 text-muted-foreground">{visibilityPreviews[visibility]}</Text>
          </Card>
        </>
      ) : (
        <Text className="text-sm text-muted-foreground">This group could not be found.</Text>
      )}
    </ScrollView>
  );
}
