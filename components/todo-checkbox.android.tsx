import { THEME } from '@/lib/theme';
import { Checkbox, Host } from '@expo/ui/jetpack-compose';
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
        onCheckedChange={onChange}
        colors={{
          checkedColor: colors.primary,
          uncheckedColor: colors.border,
          checkmarkColor: colors.primaryForeground,
        }}
      />
    </Host>
  );
}
