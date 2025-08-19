import { InputProps } from '@/entities/form-dialog/domain';
import { Select as SelectUI, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select';
import { cn } from '@/shared/lib/css';

export const Select = <
  T extends Record<string, unknown> = Record<string, string>
>(
  props: InputProps<T> & { placeHolder?: string; options: string[] }
) => {
  const { name, type, options, onChange, placeHolder } = props;

  const onSelectChange = (value: string) => {
    if (type !== 'select') return;

    onChange({ [name]: value });
  };

  return (
    <SelectUI onValueChange={onSelectChange}>
      <SelectTrigger className={cn('w-full')}>
        <SelectValue placeholder={placeHolder || 'Выберите значение'} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option, idx) => (
          <SelectItem value={option} key={idx}>
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectUI>
  );
};
