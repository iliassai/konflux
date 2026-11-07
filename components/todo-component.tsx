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
        <Card key={todo.id} className="rounded-2x1 border border-border bg-card py-3 shadow-none">
          <CardContent className="flex-row items-center gap-3 px-4">
            <TodoCheckbox
              checked={todo.done}
              onChange={() => toggleTodo(todo.id)}
            />
            <Text className={`flex-1 font-medium ${todo.done ? 'text-muted-foreground line-through' : ''}`}>
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
