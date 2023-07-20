import React from 'react';
import { Controller, FieldPath, FieldValues } from 'react-hook-form';
import { FormItemProps } from '@components/Form/FormItemProps';
import {
  Input, InputGroup, InputGroupText,
} from 'reactstrap';
import FormItemError from '@components/Form/FormItemError';
import { InputType } from 'reactstrap/types/lib/Input';

export interface FormItemInputGroupProps<
  TFieldValues extends FieldValues,
  TFieldPath extends FieldPath<TFieldValues>,
> extends FormItemProps<TFieldValues, TFieldPath> {
  label: string,
  inputType?: InputType,
  inputClassName?: string,
}

export default function FormItemInputGroup<
  TFieldValues extends FieldValues,
  TFieldPath extends FieldPath<TFieldValues>,
>(props: FormItemInputGroupProps<TFieldValues, TFieldPath>) {
  const {
    control, errors, name, label, placeholder, inputType, inputClassName,
  } = props;
  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({ field: { ...rest } }) => (
          <InputGroup>
            <InputGroupText>{label}</InputGroupText>
            <Input
              {...rest}
              placeholder={placeholder}
              invalid={!!errors[name]}
              type={inputType}
              className={inputClassName}
            />
            <FormItemError fieldError={errors[name]} />
          </InputGroup>
        )}
      />
    </>
  );
}
