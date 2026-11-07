import { Checkbox } from '@/components/ui/checkbox';

type TodoCheckboxProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
};

export function TodoCheckbox({ checked, onChange }: TodoCheckboxProps) {
  return (
    <Checkbox checked={checked} onCheckedChange={onChange} />
  );
}
