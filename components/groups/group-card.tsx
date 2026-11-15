import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import type { AvailabilityVisibility, Group, GroupMember } from '@/lib/group-store';
import { MemberAvatarStack } from '@/components/groups/member-avatar-stack';
import { View } from 'react-native';

export type GroupCardData = {
  group: Group;
  members: GroupMember[];
  totalMembers: number;
  visibility: AvailabilityVisibility;
  pendingVoteCount: number;
  nextPlanLabel: string | null;
};

const visibilityLabels: Record<AvailabilityVisibility, string> = {
  busy_only: 'Busy only',
  titles: 'Titles',
  full: 'Full',
};

export function GroupCard({ data }: { data: GroupCardData }) {
  const { group, members, totalMembers, visibility, pendingVoteCount, nextPlanLabel } = data;
  const summary = pendingVoteCount > 0
    ? `${pendingVoteCount} ${pendingVoteCount === 1 ? 'plan' : 'plans'} to vote`
    : nextPlanLabel ?? 'No open plans';

  return (
    <Card className="gap-3 rounded-xl border border-border bg-card px-3 py-3 shadow-none">
      <View className="flex-row items-center justify-between gap-2">
        <Text className="flex-1 text-base font-semibold" numberOfLines={1}>{group.name}</Text>
        {pendingVoteCount > 0 && (
          <Badge variant="outline" className="rounded-md border-border px-3 py-1">
            <Text className="text-xs font-semibold">Voting</Text>
          </Badge>
        )}
      </View>
      <View className="flex-row items-center justify-between gap-2">
        <MemberAvatarStack members={members} totalMembers={totalMembers} />
        <Text className="text-xs text-muted-foreground" numberOfLines={1}>{summary}</Text>
      </View>
      <Text className="text-xs text-muted-foreground">
        You show: <Text className="font-semibold text-foreground">{visibilityLabels[visibility]}</Text>
      </Text>
    </Card>
  );
}
