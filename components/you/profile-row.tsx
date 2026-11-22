import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { View } from 'react-native';

type ProfileRowProps = {
  initials: string;
  name: string;
  email: string;
  onEdit: () => void;
};

export function ProfileRow({ initials, name, email, onEdit }: ProfileRowProps) {
  return (
    <View className="flex-row items-center gap-3 py-1">
      <View className="size-12 items-center justify-center rounded-xl bg-accent-soft">
        <Text className="font-semibold text-primary">{initials}</Text>
      </View>
      <View className="flex-1 gap-0.5">
        <Text className="text-base font-semibold">{name}</Text>
        <Text className="text-sm text-muted-foreground">{email}</Text>
      </View>
      <Button variant="ghost" size="sm" onPress={onEdit}>
        <Text className="text-sm font-semibold text-primary">Edit</Text>
      </Button>
    </View>
  );
}
