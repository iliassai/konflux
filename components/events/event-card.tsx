import { Card, CardContent } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import type { CalendarEvent } from '@/lib/event-store';
import { View } from 'react-native';

type EventCardProps = {
  event: CalendarEvent;
};

export function EventCard({ event }: EventCardProps) {
  return (
    <Card className="rounded-2xl border border-border bg-card py-3 shadow-none">
      <CardContent className="flex-row items-center gap-3 px-4">
        <View className="h-11 w-1 rounded-full" style={{ backgroundColor: event.color }} />
        <View className="flex-1 gap-0.5">
          <Text className="font-semibold">{event.title}</Text>
          <Text className="text-sm text-muted-foreground">{event.detail}</Text>
        </View>
        <Text className="text-sm text-muted-foreground">{event.time}</Text>
      </CardContent>
    </Card>
  );
}
