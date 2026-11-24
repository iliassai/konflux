import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { useGroupStore, type AvailabilityVisibility } from '@/lib/group-store';
import { router } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import { useRef, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  TextInput,
  View,
} from 'react-native';
import { GroupVisibilitySelector } from './group-visibility-selector';

function SectionLabel({ children }: { children: string }) {
  return <Text className="text-sm font-semibold tracking-wider text-muted-foreground">{children}</Text>;
}

export function CreateGroupScreen() {
  const createGroup = useGroupStore((state) => state.createGroup);
  const [name, setName] = useState('');
  const [visibility, setVisibility] = useState<AvailabilityVisibility>('busy_only');
  const creationLock = useRef(false);

  const goBack = () => {
    if (router.canGoBack()) router.back();
    else router.replace('/groups');
  };

  const handleCreateGroup = () => {
    const trimmedName = name.trim();
    if (!trimmedName) {
      Alert.alert('Add a group name', 'Enter a name before creating the group.');
      return;
    }

    if (creationLock.current) return;
    creationLock.current = true;
    const { group } = createGroup(trimmedName, visibility);
    router.replace({ pathname: '/groups/[groupId]', params: { groupId: group.id, created: '1' } });
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-background"
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerClassName="gap-5 px-5 pb-6 pt-10">
        <View className="gap-2">
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Back to groups"
            onPress={goBack}
            hitSlop={8}
            className="-ml-1 flex-row items-center gap-1 self-start py-1">
            <ChevronLeft size={20} color="#5D6982" />
            <Text className="text-sm text-muted-foreground">Group</Text>
          </Pressable>
          <Text className="text-3xl font-bold">Create</Text>
        </View>

        <View className="gap-2">
          <SectionLabel>GROUP NAME</SectionLabel>
          <TextInput
            accessibilityLabel="Group name"
            value={name}
            onChangeText={setName}
            placeholder="e.g. Gaming crew"
            maxLength={40}
            returnKeyType="done"
            className="h-14 rounded-2xl border border-border bg-card px-4 text-base font-medium text-foreground"
          />
        </View>

        <View className="gap-2">
          <SectionLabel>WHAT THIS GROUP SEES OF YOU</SectionLabel>
          <GroupVisibilitySelector value={visibility} onChange={setVisibility} />
        </View>
      </ScrollView>

      <View className="px-5 pb-4 pt-2">
        <Button
          size="lg"
          className="h-14 w-full rounded-2xl"
          disabled={!name.trim()}
          onPress={handleCreateGroup}>
          <Text className="text-base font-semibold">Create group</Text>
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
}
