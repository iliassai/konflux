import { Text } from '@/components/ui/text';
import { TodoList } from '@/components/todo-component';
import { View } from 'react-native';

export default function CalendarScreen() {
  return (
      <View className="flex-1 gap-4 bg-background p-6">
        <Text className="text-xs font-medium uppercase tracking-widest text-muted-foreground">To do</Text>
        <TodoList />
      </View>
  );
}
