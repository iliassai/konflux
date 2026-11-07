import { Checkbox, Host } from '@expo/ui';

type TodoCheckboxProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
};

export function TodoCheckbox({ checked, onChange }: TodoCheckboxProps) {
  return (
    <Host matchContents>
      <Checkbox value={checked} onValueChange={onChange} />
    </Host>
  );
}
