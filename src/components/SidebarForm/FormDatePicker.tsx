import React from 'react';
import { FormItemProps } from '@components/SidebarForm/FormItemProps';
import { Controller, Path } from 'react-hook-form';
import { FormFeedback, Label } from 'reactstrap';
import Flatpickr from 'react-flatpickr';
import classnames from 'classnames';

export interface FormDatePickerProps<T, TName extends Path<T> = Path<T>>
  extends FormItemProps<T, TName> {
  defaultValue?: Date,
}

export default function FormDatePicker<T, TName extends Path<T> = Path<T>>(
  props: FormDatePickerProps<T, TName>,
) {
  const {
    fieldError, name, control, label, defaultValue, disabled, required,
  } = props;
  return (
    <div className="mb-1">
      <Label className="form-label" for="birthday">
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
        render={({ field: { value, ...rest } }) => (
          <Flatpickr
            className={classnames('form-control', { 'is-invalid': fieldError })}
            id={name}
            value={value as Date}
            defaultValue={defaultValue?.toISOString()}
            disabled={disabled}
            {...rest}
          />
        )}
      />
      {fieldError && <FormFeedback>{fieldError.message}</FormFeedback>}
    </div>
  );
}
