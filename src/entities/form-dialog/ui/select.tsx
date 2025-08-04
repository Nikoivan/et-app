import { InputProps } from '@/entities/form-dialog/domain';
import {
  Select as SelectUI,
  SelectContent,
  SelectTrigger,
  SelectValue
} from '@/shared/ui/select';

export const Select = <
  T extends Record<string, unknown> = Record<string, string>
>(
  props: InputProps<T, string[]> & { placeHolder: string }
) => {
  const { placeHolder } = props;

  return (
    <SelectUI>
      <SelectTrigger>
        <SelectValue placeholder={placeHolder} />
      </SelectTrigger>
      <SelectContent>Select</SelectContent>
    </SelectUI>
  );
};
