import React from 'react';
import { FieldError } from 'react-hook-form';
import { FormFeedback } from 'reactstrap';

export interface FormItemErrorProps {
  fieldError: FieldError | undefined,
}

export default function FormItemError(props: FormItemErrorProps) {
  const { fieldError } = props;
  return (
    <>
      {fieldError && <FormFeedback>{fieldError.message}</FormFeedback>}
    </>
  );
}
