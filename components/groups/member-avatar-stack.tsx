import { Text } from '@/components/ui/text';
import type { GroupMember } from '@/lib/group-store';
import { View } from 'react-native';

type MemberAvatarStackProps = {
  members: GroupMember[];
  totalMembers: number;
  maxVisible?: number;
};

export function MemberAvatarStack({ members, totalMembers, maxVisible = 3 }: MemberAvatarStackProps) {
  const visibleMembers = members.slice(0, maxVisible);
  const remaining = Math.max(0, totalMembers - visibleMembers.length);

  return (
    <View className="flex-row items-center pl-2">
      {visibleMembers.map((member, index) => (
        <View
          key={member.id}
          accessible
          accessibilityLabel={member.name}
          className={`size-8 items-center justify-center rounded-full border-2 border-card bg-accent-soft ${index > 0 ? '-ml-2' : ''}`}>
          <Text className="text-[10px] font-semibold text-primary">{member.initials}</Text>
        </View>
      ))}
      {remaining > 0 && (
        <View className="-ml-2 size-8 items-center justify-center rounded-full border-2 border-card bg-accent-soft">
          <Text className="text-[10px] font-semibold text-primary">+{remaining}</Text>
        </View>
      )}
    </View>
  );
}
