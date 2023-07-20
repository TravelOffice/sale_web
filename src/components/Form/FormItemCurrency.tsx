import React from 'react';
import {
  Controller, FieldPath, FieldValues, get,
} from 'react-hook-form';
import { FormItemProps } from '@components/Form/FormItemProps';
import { InputGroup, InputGroupText } from 'reactstrap';
import CurrencyInput from 'react-currency-input-field';
import { convertCurrencyToNumber } from '@utils/CurrencyUtils';
import FormItemError from '@components/Form/FormItemError';
import classNames from 'classnames';

export interface FormItemCurrencyProps<
  TFieldValues extends FieldValues,
  TFieldPath extends FieldPath<TFieldValues>,
> extends FormItemProps<TFieldValues, TFieldPath> {
  label: string,
}

export default function FormItemCurrency<
  TFieldValues extends FieldValues,
  TFieldPath extends FieldPath<TFieldValues>,
>(props: FormItemCurrencyProps<TFieldValues, TFieldPath>) {
  const {
    control, errors, name, label, placeholder,
  } = props;
  const fieldError = get(errors, name);
  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, ...rest } }) => (
          <InputGroup className={classNames({ 'is-invalid': fieldError })}>
            <InputGroupText className="w-15">{label}</InputGroupText>
            <CurrencyInput
              {...rest}
              className="form-control text-end"
              onValueChange={(newValue) => {
                const numericValue = convertCurrencyToNumber(newValue);
                onChange(numericValue);
              }}
              decimalSeparator="."
              groupSeparator=","
              placeholder={placeholder}
            />
            <InputGroupText>VND</InputGroupText>
          </InputGroup>
        )}
      />
      <FormItemError fieldError={get(errors, name)} />
    </>
  );
}
