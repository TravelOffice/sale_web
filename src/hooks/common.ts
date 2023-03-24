import React, { useCallback, useState } from 'react';
import * as yup from 'yup';
import { ValidationError } from 'yup';
import { FieldPath } from 'react-hook-form';

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
