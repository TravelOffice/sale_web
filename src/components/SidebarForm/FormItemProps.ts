import { Control, FieldError, Path } from 'react-hook-form';

export interface FormItemProps<T, TName extends Path<T> = Path<T>> {
  name: TName,
  label: string,
  control: Control<T>,
  fieldError?: FieldError,
  disabled?: boolean,
  required?: boolean,
}
