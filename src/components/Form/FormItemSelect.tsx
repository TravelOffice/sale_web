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
  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({ field: { value, onChange, ...rest } }) => (
          <Select
            className={classNames(selectClassName, { 'is-invalid': errors[name] })}
            options={options}
            styles={{
              control: (provided) => (errors[name] ? { ...provided, borderColor: '#ea5455 !important' } : provided),
            }}
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
