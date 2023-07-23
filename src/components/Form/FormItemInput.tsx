import React from 'react';
import { Input } from 'reactstrap';
import { Controller, FieldPath, FieldValues } from 'react-hook-form';
import { FormItemProps } from '@components/Form/FormItemProps';
import { InputType } from 'reactstrap/types/lib/Input';
import FormItemError from '@components/Form/FormItemError';

export interface FormItemInputProps<
  TFieldValues extends FieldValues,
  TFieldPath extends FieldPath<TFieldValues>,
> extends FormItemProps<TFieldValues, TFieldPath> {
  inputType?: InputType,
}

export default function FormItemInput<
  TFieldValues extends FieldValues,
  TFieldPath extends FieldPath<TFieldValues>,
>(props: FormItemInputProps<TFieldValues, TFieldPath>) {
  const {
    control, errors, name, inputType, placeholder, disabled,
  } = props;
  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Input
            type={inputType}
            id={name}
            placeholder={placeholder}
            invalid={!!errors[name]}
            disabled={disabled}
            {...field}
          />
        )}
      />
      <FormItemError fieldError={errors[name]} />
    </>
  );
}
