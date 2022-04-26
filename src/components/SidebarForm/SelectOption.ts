import { FieldPathValue, Path, UnpackNestedValue } from 'react-hook-form';

export type SelectOption<T, TName extends Path<T>> = {
  label: string,
  value: UnpackNestedValue<FieldPathValue<T, TName>>
};
