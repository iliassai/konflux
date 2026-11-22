import { PlanCard, type PlanCardData } from '@/components/plans/plan-card';
import type { PlanListView } from '@/components/plans/plan-view-toggle';
import { Text } from '@/components/ui/text';
import { useGroupStore } from '@/lib/group-store';
import { usePlanStore } from '@/lib/plan-store';
import { FlatList, View } from 'react-native';

function PlanSeparator() {
  return <View className="h-3" />;
}

export function PlanList({ view }: { view: PlanListView }) {
  const plans = usePlanStore((state) => state.plans);
  const responses = usePlanStore((state) => state.responses);
  const groups = useGroupStore((state) => state.groups);

  const planData: PlanCardData[] = plans
    .filter((plan) => view === 'confirmed'
      ? plan.status === 'confirmed'
      : plan.status === 'draft' || plan.status === 'voting')
    .map((plan) => {
      const group = groups.find((item) => item.id === plan.groupId);
      const answeredCount = new Set(
        responses.filter((response) => response.planId === plan.id).map((response) => response.memberId)
      ).size;

      return {
        plan,
        groupName: group?.name ?? 'Group',
        answeredCount,
        memberCount: group?.memberIds.length ?? 0,
      };
    });

  return (
    <FlatList
      data={planData}
      keyExtractor={(item) => item.plan.id}
      renderItem={({ item }) => <PlanCard data={item} />}
      ItemSeparatorComponent={PlanSeparator}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 16 }}
      ListEmptyComponent={
        <View className="items-center gap-1 py-12">
          <Text className="font-semibold">No {view} plans</Text>
          <Text className="text-center text-sm text-muted-foreground">
            New group plans will show up here.
          </Text>
        </View>
      }
    />
  );
}
