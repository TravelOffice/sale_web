import { FormFeedback, Label } from 'reactstrap';
import classnames from 'classnames';
import React from 'react';
import { FormItemProps } from '@components/SidebarForm/FormItemProps';

export interface FormInputProps<T> extends FormItemProps<T> {}

export function FormInput<T>(props: FormInputProps<T>) {
  const {
    fieldError, name, control, label, disabled,
  } = props;
  return (
    <div className="mb-1">
      <Label className="form-label" for="name">
        {label}
        {' '}
        <span className="text-danger">*</span>
      </Label>
      <input
        {...control.register(name)}
        className={classnames('form-control', { 'is-invalid': fieldError })}
        disabled={disabled}
      />
      {fieldError && <FormFeedback>{fieldError.message}</FormFeedback>}
    </div>
  );
}
