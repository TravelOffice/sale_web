import { FieldPathValue, Path, UnpackNestedValue } from 'react-hook-form';
import { ReactElement } from 'react';
import { ControllerRenderProps } from 'react-hook-form/dist/types/controller';
import { BaseSchema } from 'yup';

export type InputType = 'input' | 'select' | 'date';

export type InputSchema<T, TName extends Path<T>> = {
  required: boolean,
  label: string,
  type: InputType,
  options?: UnpackNestedValue<FieldPathValue<T, TName>>[],
  getOptionLabel?: (option?: UnpackNestedValue<FieldPathValue<T, TName>>) => string,
  editable?: boolean,
  render?: (
    field: ControllerRenderProps<T, Path<T>>,
    schema: InputSchema<T, TName>,
  ) => ReactElement,
  validator?: BaseSchema,
};
