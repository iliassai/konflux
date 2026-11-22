import { Card } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import type { Plan, PlanSlot } from '@/lib/plan-store';
import { View } from 'react-native';

export type PlanCardData = {
  plan: Plan;
  groupName: string;
  answeredCount: number;
  memberCount: number;
};

function formatDuration(durationMinutes: number) {
  const hours = durationMinutes / 60;
  return `${Number.isInteger(hours) ? hours : hours.toFixed(1)} h`;
}

function formatSlot(slot: PlanSlot) {
  const date = new Date(slot.startsAt);
  const weekday = new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(date);
  const time = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit' }).format(date);
  return `${weekday} ${time}`;
}

export function PlanCard({ data }: { data: PlanCardData }) {
  const { plan, groupName, answeredCount, memberCount } = data;
  const confirmedSlot = plan.slots.find((slot) => slot.id === plan.confirmedSlotId);
  const statusLabel = plan.status === 'voting'
    ? 'Voting'
    : plan.status === 'draft'
      ? 'Pick slots'
      : 'Confirmed';
  const summary = plan.status === 'voting'
    ? `${answeredCount} of ${memberCount} answered · ${plan.slots.length} slots`
    : plan.status === 'draft'
      ? 'Draft, nothing sent yet'
      : confirmedSlot
        ? `Scheduled · ${formatSlot(confirmedSlot)}`
        : 'Confirmed';

  return (
    <View className="gap-1.5">
      <Card className="flex-row items-center justify-between gap-3 rounded-2xl border border-border bg-card px-4 py-3 shadow-none">
        <View className="flex-1 gap-0.5">
          <Text className="text-base font-semibold" numberOfLines={1}>{plan.title}</Text>
          <Text className="text-sm text-muted-foreground" numberOfLines={1}>
            {groupName} · {formatDuration(plan.durationMinutes)}
          </Text>
        </View>
        <Text className="font-semibold text-muted-foreground">{statusLabel}</Text>
      </Card>
      <Text className="px-1 text-sm text-muted-foreground">{summary}</Text>
    </View>
  );
}
