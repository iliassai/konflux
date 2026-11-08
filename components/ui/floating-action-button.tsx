import { Plus } from 'lucide-react-native';
import { Pressable } from 'react-native';
import { THEME } from '@/lib/theme';
import { useUniwind } from 'uniwind';

type FloatingActionButtonProps = {
  onPress?: () => void;
  accessibilityLabel?: string;
};

export function FloatingActionButton({
  onPress,
  accessibilityLabel = 'Add',
}: FloatingActionButtonProps) {
  const { theme } = useUniwind();
  const colors = THEME[theme === 'dark' ? 'nord-dark' : 'nord-light'];

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      onPress={onPress}
      className="absolute bottom-5 right-5 size-14 items-center justify-center rounded-full bg-primary shadow-lg shadow-black/20 active:opacity-80">
      <Plus size={26} color={colors.primaryForeground} strokeWidth={2.5} />
    </Pressable>
  );
}
