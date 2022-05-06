import {
  Controller, FieldPathValue, Path, UnpackNestedValue, UseFormSetValue,
} from 'react-hook-form';
import { FormItemProps } from '@components/SidebarForm/FormItemProps';
import { FormFeedback, Label } from 'reactstrap';
import Select, { OnChangeValue } from 'react-select';
import { selectThemeColors } from '@utils/Utils';
import classnames from 'classnames';
import React from 'react';
import { SelectOption } from '@components/SidebarForm/SelectOption';

export interface FormSelectProps<T, TName extends Path<T>>
  extends FormItemProps<T, TName> {
  setValue: UseFormSetValue<T>,
  options: SelectOption<T, TName>[],
  getOptionLabel: (option?: UnpackNestedValue<FieldPathValue<T, TName>>) => string,
  filteredOptions?: () => SelectOption<T, TName>[]
}

function getOption<T, TName extends Path<T>>(
  options: SelectOption<T, TName>[],
  value: UnpackNestedValue<FieldPathValue<T, TName>>,
) {
  return options.find((option) => option.value === value);
}

export default function FormSelect<T, TName extends Path<T>>(
  props: FormSelectProps<T, TName>,
) {
  const {
    name, fieldError, control, options = [], label, disabled, required,
  } = props;
  return (
    <div className="mb-1">
      <Label className="form-label" for="vocative">
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
        render={({ field: { value, onChange, ...rest } }) => {
          type TType = typeof value;
          type Option = { label: string, value: TType };
          return (
            <Select<Option>
              isClearable={false}
              classNamePrefix="select"
              options={options}
              theme={selectThemeColors}
              className={classnames('react-select', { 'is-invalid': fieldError })}
              isDisabled={disabled}
              value={getOption(options, value)}
              getOptionLabel={(option) => option.label}
              onChange={(newValue: OnChangeValue<Option, false>) => onChange(newValue?.value)}
              {...rest}
            />
          );
        }}
      />
      {fieldError && <FormFeedback>{fieldError.message}</FormFeedback>}
    </div>
  );
}
