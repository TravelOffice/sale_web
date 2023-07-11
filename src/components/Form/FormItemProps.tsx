import {
  Control, FieldErrors, FieldPath, FieldValues,
} from 'react-hook-form';

export interface FormItemProps<
  TFieldValues extends FieldValues,
  TFieldPath extends FieldPath<TFieldValues>,
> {
  control: Control<TFieldValues>,
  name: TFieldPath,
  errors: FieldErrors,
  placeholder?: string,
  disabled?: boolean,
}
