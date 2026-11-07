import { Text } from '@/components/ui/text';
import { TodoList } from '@/components/todo-component';
import { EventList } from '@/components/events/event-list';
import { ScrollView, View } from 'react-native';

export default function CalendarScreen() {
  return (
      <ScrollView className="flex-1 bg-background" contentContainerClassName="gap-6 p-6">
        <View className="gap-3">
          <Text className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Events</Text>
          <EventList />
        </View>
        <View className="gap-3">
          <Text className="text-xs font-medium uppercase tracking-widest text-muted-foreground">To do</Text>
          <TodoList />
        </View>
      </ScrollView>
  );
}
