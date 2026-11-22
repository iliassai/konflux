import { PlanList } from '@/components/plans/plan-list';
import { PlanViewToggle, type PlanListView } from '@/components/plans/plan-view-toggle';
import { Button } from '@/components/ui/button';
import { ScreenHeading } from '@/components/ui/screen-heading';
import { Text } from '@/components/ui/text';
import { usePlanStore } from '@/lib/plan-store';
import { useState } from 'react';
import { Alert, View } from 'react-native';

export default function PlansScreen() {
  const [view, setView] = useState<PlanListView>('open');
  const plans = usePlanStore((state) => state.plans);
  const openPlanCount = plans.filter((plan) => plan.status === 'draft' || plan.status === 'voting').length;

  return (
    <View className="flex-1 bg-background">
      <View className="gap-5 px-5 pb-3 pt-10">
        <ScreenHeading eyebrow={`${openPlanCount} open`} title="Plans" />
        <PlanViewToggle value={view} onChange={setView} />
      </View>
      <PlanList view={view} />
      <View className="px-5 pb-4 pt-2">
        <Button
          size="lg"
          className="h-14 w-full rounded-2xl"
          onPress={() => Alert.alert('New plan', 'Plan creation will be added later.')}>
          <Text className="text-base font-semibold">+ New plan</Text>
        </Button>
      </View>
    </View>
  );
}
