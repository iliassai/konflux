import { Text } from '@/components/ui/text';
import { TodoList } from '@/components/todo-component';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CalendarScreen() {
  return (
      <View className="flex-1 gap-6 p-6">
        <TodoList />
      </View>
  );
}
