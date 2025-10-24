import { InputProps } from '@/entities/form-dialog/domain';
import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger
} from '@/shared/ui/multi-selector';
import { useState } from 'react';
import { mergeOptions } from '@/entities/form-dialog/lib/multi-select-utils';

export const MultiSelect = <
  T extends Record<string, unknown> = Record<string, string>
>({
  name,
  options: defaultOptions,
  value: values,
  onChange,
  placeHolder
}: InputProps<T, string[]> & { placeHolder?: string; options: string[] }) => {
  const [value, setValue] = useState<string[]>(values || []);

  const options = mergeOptions(defaultOptions, values);

  const toggleSelection = (values: string[]) => {
    setValue(values);
    onChange({ [name]: values });
  };

  return (
    <MultiSelector
      values={value}
      onValuesChange={toggleSelection}
      loop
      className='max-w-xs'
    >
      <MultiSelectorTrigger>
        <MultiSelectorInput placeholder={placeHolder} />
      </MultiSelectorTrigger>
      <MultiSelectorContent>
        <MultiSelectorList>
          {options.map((option, idx) => (
            <MultiSelectorItem value={option} key={idx}>
              {option}
            </MultiSelectorItem>
          ))}
        </MultiSelectorList>
      </MultiSelectorContent>
    </MultiSelector>
  );
};
