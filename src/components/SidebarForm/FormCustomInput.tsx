import { FormItemProps } from '@components/SidebarForm/FormItemProps';
import { FormFeedback, Label } from 'reactstrap';
import React from 'react';
import {
  Control, Controller, FieldErrors, Path,
} from 'react-hook-form';
import { ControllerRenderProps } from 'react-hook-form/dist/types/controller';
import { InputSchema } from '@components/SidebarForm/FormSchema';

export interface FormCustomInputProps<T, TName extends Path<T>> extends FormItemProps<T> {
  schema: InputSchema<T, TName>,
  errors: FieldErrors<T>,
  render: (
    field: ControllerRenderProps<T, Path<T>>,
    schema: InputSchema<T, TName>,
    control: Control<T>,
    errors: FieldErrors<T>
  ) => React.ReactElement,
}

function FormCustomInput<T, TName extends Path<T>>(props: FormCustomInputProps<T, TName>) {
  const {
    fieldError, name, control, label, render, schema, required, errors,
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
        render={({ field }) => render(field, schema, control, errors)}
      />
      {fieldError && <FormFeedback>{fieldError.message}</FormFeedback>}
    </div>
  );
}

export default FormCustomInput;
