import {
  FormFeedback, Label,
} from 'reactstrap';
import classnames from 'classnames';
import React from 'react';
import { FormItemProps } from '@components/SidebarForm/FormItemProps';
import CurrencyInput from 'react-currency-input-field';
import { convertCurrencyToNumber } from '@utils/CurrencyUtils';
import { Controller } from 'react-hook-form';

export interface FormInputProps<T> extends FormItemProps<T> {}

export function FormCurrencyInput<T>(props: FormInputProps<T>) {
  const {
    fieldError, name, control, label, disabled, required,
  } = props;
  return (
    <div className="mb-1">
      <Label className="form-label" for="name">
        {label}
        {
          required && (
          <span className="text-danger">{' *'}</span>
          )
        }
      </Label>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value, ...rest } }) => (
          <CurrencyInput
            {...rest}
            value={value as number}
            className={classnames('form-control', { 'is-invalid': fieldError })}
            onValueChange={(newValue) => {
              const numericValue = convertCurrencyToNumber(newValue);
              onChange(numericValue);
            }}
            decimalSeparator="."
            groupSeparator=","
            disabled={disabled}
          />
        )}
      />
      {fieldError && <FormFeedback>{fieldError.message}</FormFeedback>}
    </div>
  );
}
