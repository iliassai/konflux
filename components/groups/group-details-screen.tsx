import {
  GROUP_VISIBILITY_OPTIONS,
  GroupVisibilityOption,
} from '@/components/groups/group-visibility-option';
import { MemberAvatarStack } from '@/components/groups/member-avatar-stack';
import { Card } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import { CURRENT_USER_ID, useGroupStore, type AvailabilityVisibility, type GroupMember } from '@/lib/group-store';
import * as Clipboard from 'expo-clipboard';
import { ChevronLeft } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Pressable, ScrollView, Share, View } from 'react-native';
import { GroupInviteLink } from './group-invite-link';

const visibilityPreviews: Record<AvailabilityVisibility, string> = {
  hidden: 'They see: Nothing at all. Todos stay private.',
  busy_only: 'They see: Busy · Tue 14:00–16:00. Todos stay private.',
  titles: 'They see: Project meeting · Tue 14:00–16:00. Todos stay private.',
  full: 'They see: Project meeting, notes and location · Tue 14:00–16:00. Todos stay private.',
};

export function GroupDetailsScreen({
  groupId,
  showCreatedToast = false,
}: {
  groupId: string;
  showCreatedToast?: boolean;
}) {
  const router = useRouter();
  const [toastMessage, setToastMessage] = useState('');
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const group = useGroupStore((state) => state.groups.find((item) => item.id === groupId));
  const invite = useGroupStore((state) => state.invites.find((item) => item.groupId === groupId));
  const members = useGroupStore((state) => state.members);
  const membership = useGroupStore((state) =>
    state.memberships.find((item) => item.groupId === groupId && item.userId === CURRENT_USER_ID)
  );
  const setAvailabilityVisibility = useGroupStore((state) => state.setAvailabilityVisibility);
  const visibility = membership?.availabilityVisibility ?? 'busy_only';
  const inviteLink = invite ? `https://konflux.app/g/${invite.code}` : '';

  const showToast = useCallback((message: string) => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToastMessage(message);
    toastTimer.current = setTimeout(() => setToastMessage(''), 2400);
  }, []);

  useEffect(() => {
    if (showCreatedToast) showToast('Group created successfully');
    return () => {
      if (toastTimer.current) clearTimeout(toastTimer.current);
    };
  }, [showCreatedToast, showToast]);

  const copyInviteLink = async () => {
    await Clipboard.setStringAsync(inviteLink);
    showToast('Invite link copied');
  };

  const shareInviteLink = async () => {
    await Share.share({ message: inviteLink });
  };

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
            {inviteLink ? (
              <GroupInviteLink link={inviteLink} onCopy={copyInviteLink} onShare={shareInviteLink} />
            ) : null}
          </View>

          <View className="gap-3">
            <Text className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              What this group sees of you
            </Text>
            {GROUP_VISIBILITY_OPTIONS.map((option) => (
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
      {toastMessage ? (
        <View pointerEvents="none" className="absolute bottom-5 left-5 right-5 items-center">
          <View className="rounded-xl bg-foreground px-4 py-3">
            <Text className="text-sm font-medium text-background">{toastMessage}</Text>
          </View>
        </View>
      ) : null}
    </ScrollView>
  );
}
