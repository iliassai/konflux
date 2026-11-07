import { EventCard } from '@/components/events/event-card';
import { useEventStore } from '@/lib/event-store';
import { View } from 'react-native';

export function EventList() {
  const events = useEventStore((state) => state.events);

  return (
    <View className="w-full gap-3">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </View>
  );
}
