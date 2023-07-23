import React from 'react';
import Flatpickr from 'react-flatpickr';
import classNames from 'classnames';
import { Controller, FieldPath, FieldValues } from 'react-hook-form';
import { FormItemProps } from '@components/Form/FormItemProps';
import FormItemError from '@components/Form/FormItemError';
import moment from 'moment';

export interface FormItemDatePickerProps<
  TFieldValues extends FieldValues,
  TFieldPath extends FieldPath<TFieldValues>,
> extends FormItemProps<TFieldValues, TFieldPath> {

}

export default function FormItemDatePicker<
  TFieldValues extends FieldValues,
  TFieldPath extends FieldPath<TFieldValues>,
>(props: FormItemDatePickerProps<TFieldValues, TFieldPath>) {
  const {
    control, errors, name, placeholder, disabled,
  } = props;

  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value, ...rest } }) => (
          <Flatpickr
            className={classNames('form-control', { 'is-invalid': errors[name] })}
            id="startDate"
            placeholder={placeholder}
            options={{
              formatDate: (date) => moment(date).format('DD/MM/YYYY'),
            }}
            value={value}
            onChange={(dates) => onChange(dates[0])}
            disabled={disabled}
            {...rest}
          />
        )}
      />
      <FormItemError fieldError={errors[name]} />
    </>
  );
}
