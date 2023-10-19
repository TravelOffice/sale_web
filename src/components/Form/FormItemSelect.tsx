import React from 'react';
import Select from 'react-select';
import classNames from 'classnames';
import {
  Controller, FieldValues, FieldPath, UnpackNestedValue, PathValue,
} from 'react-hook-form';
import FormItemError from '@components/Form/FormItemError';
import { FormItemProps } from '@components/Form/FormItemProps';

export interface FormItemSelectControllerProps<
  TFieldValues extends FieldValues,
  TFieldPath extends FieldPath<TFieldValues>,
> extends FormItemProps<TFieldValues, TFieldPath> {
  options: Array<{ label: string, value: UnpackNestedValue<PathValue<TFieldValues, TFieldPath>> }>,
  selectClassName?: string,
  isClearable?: boolean,
  onSelected?: (...event: any[]) => void,
}

export default function FormItemSelect<
  TFieldValues extends FieldValues,
  TFieldPath extends FieldPath<TFieldValues>,
>(props: FormItemSelectControllerProps<TFieldValues, TFieldPath>) {
  const {
    errors, options, control, name, placeholder, isClearable,
    selectClassName, onSelected, disabled,
  } = props;

  /* eslint-disable */
  const colourStyles = {
    control: (styles: any) => ({ ...styles, backgroundColor: 'white' }),
    option: (styles: any, { data, isDisabled, isFocused, isSelected }: any) => {
      return {
        ...styles,
        backgroundColor: isDisabled
          ? undefined
          : isFocused
          ? '#ff9f4350'
          : undefined,
        color: isDisabled
          ? '#ccc'
          : data.color,
        cursor: isDisabled ? 'not-allowed' : 'default',
      };
    },
  };
  /* eslint-enable */

  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({ field: { value, onChange, ...rest } }) => (
          <Select
            className={classNames(selectClassName, { 'is-invalid': errors[name] }, 'dark-form-select')}
            options={options}
            styles={colourStyles}
            theme={(theme) => ({
              ...theme,
              colors: {
                ...theme.colors,
                primary25: '#ff9f43',
                primary: '#ff9f43',
              },
            })}
            placeholder={placeholder}
            value={value ? {
              label: options.find((option) => option.value === value)?.label,
              value,
            } : undefined}
            onChange={(newValue) => {
              onChange(newValue?.value);
              if (onSelected) {
                onSelected(newValue?.value);
              }
            }}
            isDisabled={disabled}
            isClearable={isClearable}
            {...rest}
          />
        )}
      />
      <FormItemError fieldError={errors[name]} />
    </>
  );
}
