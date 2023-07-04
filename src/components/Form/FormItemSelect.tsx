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
  options: Array<{ label: string, value: UnpackNestedValue<PathValue<TFieldValues, TFieldPath>> }>
}

export default function FormItemSelect<
  TFieldValues extends FieldValues,
  TFieldPath extends FieldPath<TFieldValues>,
>(props: FormItemSelectControllerProps<TFieldValues, TFieldPath>) {
  const {
    errors, options, control, name, placeholder,
  } = props;
  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({ field: { value, onChange, ...rest } }) => (
          <Select
            className={classNames({ 'is-invalid': errors[name] })}
            options={options}
            styles={{
              control: (provided) => (errors[name] ? { ...provided, borderColor: '#ea5455 !important' } : provided),
            }}
            placeholder={placeholder}
            value={value ? {
              label: options.find((option) => option.value === value)?.label,
              value,
            } : undefined}
            onChange={(newValue) => onChange(newValue?.value)}
            {...rest}
          />
        )}
      />
      <FormItemError fieldError={errors[name]} />
    </>
  );
}
