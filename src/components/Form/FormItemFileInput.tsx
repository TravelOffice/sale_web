import React from 'react';
import { FieldPath, FieldValues } from 'react-hook-form';
import { FormItemProps } from '@components/Form/FormItemProps';
import FormItemError from '@components/Form/FormItemError';

export interface FormItemFileInputProps<
  TFieldValues extends FieldValues,
  TFieldPath extends FieldPath<TFieldValues>,
> extends FormItemProps<TFieldValues, TFieldPath> {
}

export default function FormItemFileInput<
  TFieldValues extends FieldValues,
  TFieldPath extends FieldPath<TFieldValues>,
>(props: FormItemFileInputProps<TFieldValues, TFieldPath>) {
  const {
    control, errors, name, placeholder,
  } = props;
  return (
    <>
      <input
        type="file"
        id={name}
        placeholder={placeholder}
        className="form-control"
        {...control.register(name)}
      />
      <FormItemError fieldError={errors[name]} />
    </>
  );
}
