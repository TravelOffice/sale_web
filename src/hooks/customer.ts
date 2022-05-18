import { useEffect, useState } from 'react';
import { Customer } from '@domain/entities/Lead';
import { customerPresenter } from '@adapter/presenters';

// eslint-disable-next-line import/prefer-default-export
export const useCustomers = () : [Customer[], boolean] => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    customerPresenter.getAllCustomers()
      .then((data) => setCustomers(data))
      .catch()
      .finally(() => setLoading(false));
  }, []);
  return [customers, loading];
};
