import { Text } from '@/components/ui/text';
import { Copy, Share2 } from 'lucide-react-native';
import { Pressable, View } from 'react-native';

export function GroupInviteLink({
  link,
  onCopy,
  onShare,
}: {
  link: string;
  onCopy: () => void;
  onShare: () => void;
}) {
  return (
    <View className="flex-row items-center gap-2 rounded-xl border border-border bg-card px-3 py-2">
      <View className="min-w-0 flex-1 gap-0.5">
        <Text className="text-[10px] font-semibold tracking-wider text-muted-foreground">INVITE LINK</Text>
        <Text className="text-sm font-semibold" numberOfLines={1} ellipsizeMode="middle">
          {link.replace(/^https:\/\//, '')}
        </Text>
      </View>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Copy group invite link"
        hitSlop={4}
        onPress={onCopy}
        className="size-10 items-center justify-center rounded-lg active:bg-accent">
        <Copy size={18} color="#5D6982" />
      </Pressable>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Share group invite link"
        hitSlop={4}
        onPress={onShare}
        className="size-10 items-center justify-center rounded-lg active:bg-accent">
        <Share2 size={18} color="#5D6982" />
      </Pressable>
    </View>
  );
}
