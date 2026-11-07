import { THEME } from '@/lib/theme';
import { Checkbox, Host } from '@expo/ui';
import { tint } from '@expo/ui/swift-ui/modifiers';
import { useUniwind } from 'uniwind';

type TodoCheckboxProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
};

export function TodoCheckbox({ checked, onChange }: TodoCheckboxProps) {
  const { theme } = useUniwind();
  const colors = THEME[theme === 'dark' ? 'nord-dark' : 'nord-light'];

  return (
    <Host matchContents>
      <Checkbox
        value={checked}
        onValueChange={onChange}
        modifiers={[tint(colors.primary)]}
      />
    </Host>
  );
}
