import {
  Control, FieldErrors, FieldPathValue, Path, UnpackNestedValue,
} from 'react-hook-form';
import { ReactElement } from 'react';
import { ControllerRenderProps } from 'react-hook-form/dist/types/controller';
import { BaseSchema } from 'yup';
import { InputType as ReactstrapInputType } from 'reactstrap/types/lib/Input';
import { SelectOption } from '@components/SidebarForm/SelectOption';

type InputType = ReactstrapInputType | 'creatable-select';

export type InputSchema<T, TName extends Path<T>> = {
  required: boolean,
  label: string,
  type: InputType,
  options?: { label: string, value: UnpackNestedValue<FieldPathValue<T, TName>> }[],
  getOptions?: (formData: UnpackNestedValue<T>) => SelectOption<T, TName>[],
  getOptionLabel?: (option?: UnpackNestedValue<FieldPathValue<T, TName>>) => string,
  editable?: boolean,
  render?: (
    field: ControllerRenderProps<T, Path<T>>,
    schema: InputSchema<T, TName>,
    control: Control<T>,
    errors: FieldErrors<T>
  ) => ReactElement,
  validator?: BaseSchema,
  isMulti?: boolean
};
