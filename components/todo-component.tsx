import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { TodoCheckbox } from '@/components/todo-checkbox';
import { Text } from '@/components/ui/text';
import { useTodoStore } from '@/lib/todo-store';
import { View } from 'react-native';

export function TodoList() {
  const todos = useTodoStore((state) => state.todos);
  const toggleTodo = useTodoStore((state) => state.toggleTodo);

  return (
    <View className="w-full gap-3">
      {todos.map((todo) => (
        <Card key={todo.id} className="py-3">
          <CardContent className="flex-row items-center gap-1">
            <TodoCheckbox
              checked={todo.done}
              onChange={() => toggleTodo(todo.id)}
            />
            <Text className={`flex-1 ${todo.done ? 'text-muted-foreground' : ''}`}>
              {todo.title}
            </Text>
            <Badge variant="secondary">
              <Text className="text-xs">{todo.privacy}</Text>
            </Badge>
          </CardContent>
        </Card>
      ))}
    </View>
  );
}
