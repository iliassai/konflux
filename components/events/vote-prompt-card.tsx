import { Card, CardContent } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import { Pressable, View } from 'react-native';

type VotePromptCardProps = {
  title: string;
  message: string;
  hasVoted: boolean;
  onVote: () => void;
};

export function VotePromptCard({ title, message, hasVoted, onVote }: VotePromptCardProps) {
  return (
    <Card className="rounded-2xl border-0 bg-accent-soft py-4 shadow-none">
      <CardContent className="flex-row items-center justify-between gap-3 px-4">
        <View className="flex-1 gap-0.5">
          <Text className="font-semibold">{title}</Text>
          <Text className="text-sm text-muted-foreground">
            {hasVoted ? 'Your vote is recorded' : message}
          </Text>
        </View>
        {hasVoted ? (
          <Text className="px-3 py-2 text-sm font-semibold text-primary">Voted</Text>
        ) : (
          <Pressable
            accessibilityRole="button"
            onPress={onVote}
            className="rounded-md bg-primary/25 px-4 py-3 active:opacity-70">
            <Text className="font-semibold text-foreground">Vote</Text>
          </Pressable>
        )}
      </CardContent>
    </Card>
  );
}
