import { Select, SelectItem } from '@nextui-org/react';
import React from 'react';
import { Controller } from 'react-hook-form';

const CustomSelect = (props) => {
  const { label = '', name, required = false, control, options = [], ...restProps } = props;

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: required }}
      render={({ field }) => (
        <Select
          label={label}
          name={name}
          required={required}
          selectedKeys={field.value ? [field.value] : []}
          className="max-w-xs"
          onChange={(e) => {
            field.onChange(e);
          }}
          {...restProps}
          defaultSelectedKeys="all"
          {...field}
          disabled
        >
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </Select>
      )}
    />
  );
};

export default CustomSelect;
