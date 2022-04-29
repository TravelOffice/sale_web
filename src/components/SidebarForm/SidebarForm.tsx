/**
 * Base form which is used in RightSideBar to create/update a model.
 *
 * Usage:
 * type LeadFormData = Pick<Lead, 'name' | 'country' | 'birthday'>;
 *
 * const schema : FormSchema<LeadFormData> = {
 *   name: {
 *     type: 'input',
 *     label: 'Name',
 *     required: true,
 *     validator: yup.string().required(),
 *   },
 *   country: {
 *     type: 'select',
 *     label: 'Country',
 *     required: true,
 *     options: ['Vietnam', 'US'],
 *     getOptionLabel: (option) => (option || ''),
 *   },
 *   birthday: {
 *     type: 'date',
 *     label: 'Birthday',
 *     required: false,
 *   },
 * };
 *
 * <Form<LeadFormData>
 *   defaultValues={defaultValues}
 *   schema={schema}
 * />
 *
 * */
import React, { useEffect, useMemo } from 'react';
import {
  Button,
  Form as ReactstrapForm, Spinner,
} from 'reactstrap';
import {
  Control,
  FieldError,
  Path, UnpackNestedValue,
  useForm, UseFormSetValue,
} from 'react-hook-form';
import FormSelect from '@components/SidebarForm/FormSelect';
import { FormInput } from '@components/SidebarForm/FormInput';
import FormDatePicker from '@components/SidebarForm/FormDatePicker';
import { InputSchema } from '@components/SidebarForm/FormSchema';
import FormCustomInput from '@components/SidebarForm/FormCustomInput';
import i18n from '@config/i18n';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

export type FormSchema<T> = Record<keyof T, InputSchema<T, Path<T>>>;

export interface FormProps<T> {
  schema: FormSchema<T>,
  defaultValues?: UnpackNestedValue<T>,
  submitting?: boolean,
  onSubmit?: (formData: UnpackNestedValue<T>) => void,
  onCancel?: () => void,
}

function prop<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}

function renderInput<T, TName extends Path<T>>(
  name: TName, schema: InputSchema<T, TName>, control: Control<T>,
  setValue: UseFormSetValue<T>, fieldError?: FieldError,
) {
  // Render custom component
  if (schema.render) {
    return (
      <FormCustomInput
        schema={schema}
        render={schema.render}
        name={name}
        control={control}
        {...schema}
      />
    );
  }

  // Render select component
  if (schema.type === 'select') {
    return (
      <FormSelect<T, TName>
        key={name}
        name={name}
        setValue={setValue}
        options={schema.options!}
        getOptionLabel={schema.getOptionLabel!}
        control={control}
        fieldError={fieldError}
        {...schema}
      />
    );
  }

  // Render datepicker component
  if (schema.type === 'date') {
    return (
      <FormDatePicker<T, TName>
        key={name}
        name={name}
        control={control}
        {...schema}
      />
    );
  }

  // Render input component
  return (
    <FormInput
      key={name}
      name={name}
      control={control}
      fieldError={fieldError}
      {...schema}
    />
  );
}

export default function SidebarForm<T>(props: FormProps<T>) {
  const {
    schema, defaultValues, submitting, onSubmit, onCancel,
  } = props;
  const yupSchema = useMemo(() => {
    const entries = Object.entries(schema) as [keyof T, InputSchema<T, Path<T>>][];
    const validators = entries.reduce((a, v) => ({ ...a, [v[0]]: v[1].validator }), {});
    return yup.object().shape({ ...validators });
  }, [schema]);
  const {
    control, formState: { errors }, setValue, reset, handleSubmit,
  } = useForm<T>({ resolver: yupResolver(yupSchema) });
  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues]);

  return (
    <ReactstrapForm onSubmit={onSubmit && handleSubmit(onSubmit)}>
      {
        Object.keys(schema).map((item) => {
          type TKeys = keyof T;
          const fieldName = item as TKeys;
          const name = item as Path<T>;
          const inputSchema = prop(schema, fieldName);
          const fieldError = prop(errors, item as any);
          return renderInput<T, Path<T>>(
            name, inputSchema!, control, setValue, fieldError,
          );
        })
      }
      <Button type="submit" className="me-1" color="primary">
        { !submitting ? i18n.t('COMMON.SUBMIT') : i18n.t('COMMON.LOADING')}
        { submitting ? (
          <Spinner
            style={{ width: '0.7rem', height: '0.7rem' }}
            type="grow"
            color="light"
          />
        ) : null }
      </Button>
      <Button type="reset" color="secondary" outline onClick={onCancel}>
        {i18n.t('COMMON.CANCEL')}
      </Button>
    </ReactstrapForm>
  );
}

SidebarForm.defaultValues = {
  submitting: false,
};
