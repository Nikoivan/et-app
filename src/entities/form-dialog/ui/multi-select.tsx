import { InputProps } from '@/entities/form-dialog/domain';
import { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover';
import { Button } from '@/shared/ui/button';
import { Badge } from '@/shared/ui/badge';
import { Check, ChevronsUpDown, X } from 'lucide-react';
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList
} from '@/shared/ui/command';

export const MultiSelect = <
  T extends Record<string, unknown> = Record<string, string>
>({
  name,
  options,
  value: values,
  onChange,
  placeHolder
}: InputProps<T, string[]> & { placeHolder?: string; options: string[] }) => {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const filteredOptions = options.filter(option =>
    option.toLowerCase().includes(inputValue.toLowerCase())
  );

  const toggleSelection = (value: string) => {
    if (values?.includes(value)) {
      onChange({ [name]: values.filter(item => item !== value) });
    } else {
      onChange({ [name]: values ? [...values, value] : [value] });
    }
  };

  const removeSelected = (value: string) => {
    onChange({ [name]: values?.filter(item => item !== value) });
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          className='flex justify-between px-2 pb-2 items-center h-full w-full min-w-[200px]'
          variant='outline'
        >
          <div className='flex gap-1 flex-wrap'>
            {!!values && values.length > 0 ? (
              values.map((val, index) => (
                <Badge
                  key={index}
                  className='flex items-center gap-1 px-2 py-1 bg-gray-200 text-black dark:bg-gray-700 dark:text-white rounded-md'
                >
                  {options.find(opt => opt === val)}
                  <div
                    onClick={e => {
                      e.stopPropagation();
                      removeSelected(val);
                    }}
                    onKeyDown={e => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.stopPropagation();
                        removeSelected(val);
                      }
                    }}
                    className='ml-1 text-red-500 hover:text-red-700 cursor-pointer'
                  >
                    <X className='h-3 w-3' />
                  </div>
                </Badge>
              ))
            ) : (
              <span className='text-gray-500'>
                {placeHolder || 'Select options...'}
              </span>
            )}
          </div>
          <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[300px] p-0' align='start'>
        <Command>
          <CommandInput
            placeholder='Поиск...'
            value={inputValue}
            onValueChange={setInputValue}
          />
          <CommandList>
            {filteredOptions.length === 0 ? (
              <CommandEmpty>Нет выбранных значений</CommandEmpty>
            ) : (
              filteredOptions.map(option => {
                const isSelected = values?.includes(option);
                return (
                  <CommandItem
                    key={option}
                    onSelect={() => toggleSelection(option)}
                  >
                    <div className='flex items-center'>
                      <Check
                        className={`mr-2 h-4 w-4 ${
                          isSelected ? 'opacity-100' : 'opacity-0'
                        }`}
                      />
                      {option}
                    </div>
                  </CommandItem>
                );
              })
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
