import React, { useCallback, useState } from 'react';
import * as yup from 'yup';
import { ValidationError } from 'yup';
import { FieldPath } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { UseMutationOptions } from '@tanstack/react-query/src/types';
import toasty from '@components/Toasty/Toasty';
import { useTranslation } from 'react-i18next';

export function useDebounce(value: string, delay: number = 500) {
  const [debouncedValue, setDebouncedValue] = React.useState(value);

  React.useEffect(() => {
    const handler: NodeJS.Timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cancel the timeout if value changes (also on delay change or unmount)
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

/**
 * Hook to validate from by schema using yup
 * @return an object contains:
 *      - An errors array which represents validation failure on each field
 *      - A validate function which take schema and data to validate
 */
export function useYupValidation<T>() {
  const [errors, setErrors] = useState<Partial<Record<FieldPath<T>, string>>>({});
  const validate = useCallback((schema: yup.AnyObjectSchema, data: Object) => {
    try {
      schema.validateSync(data, { abortEarly: false });
      return true;
    } catch (error) {
      if (error instanceof ValidationError) {
        setErrors(error.inner.reduce((a, v) => ({ ...a, [v.path!]: v.message }), {}));
      }
      return false;
    }
  }, []);
  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);
  return { errors, validate, clearErrors };
}

export type UseMutationWithNotificationOptions<
  TData = unknown,
  TError = unknown,
  TVariables = void,
  TContext = unknown,
> = UseMutationOptions<TData, TError, TVariables, TContext> & {
  successTitle?: string | ((data: TData, variables: TVariables) => string),
  successMessage: string | ((data: TData, variables: TVariables) => string),
  errorTitle?: string | ((error: TError, variables: TVariables) => string),
  errorMessage?: string | ((error: TError, variables: TVariables) => string),
};

export function useMutationWithNotification<
  TData = unknown,
  TError = unknown,
  TVariables = void,
  TContext = unknown,
>(options: UseMutationWithNotificationOptions<TData, TError, TVariables, TContext>) {
  const { t } = useTranslation();
  const {
    successTitle, successMessage, errorTitle, errorMessage,
  } = options;
  return useMutation({
    onSuccess: (data: TData, variables: TVariables) => {
      toasty.show({
        type: 'success',
        title: (typeof successTitle === 'string' ? successTitle : successTitle?.(data, variables)) || t('COMMON.SUCCESS'),
        message: typeof successMessage === 'string' ? successMessage : successMessage(data, variables),
      });
    },
    onError: (error: TError, variables: TVariables) => {
      toasty.show({
        type: 'error',
        title: (typeof errorTitle === 'string' ? errorTitle : errorTitle?.(error, variables)) || t('COMMON.ERROR'),
        message: (typeof errorMessage === 'string' ? errorMessage : errorMessage?.(error, variables)) || (error instanceof Error ? error.message : t('COMMON.ERROR')),
      });
    },
    ...options,
  });
}
