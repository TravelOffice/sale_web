import { useEffect, useMemo, useState } from 'react';
import { Customer, Lead } from '@domain/entities/Lead';
import { customerPresenter, leadPresenter } from '@adapter/presenters';

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

export const useLeadAndCustomers = () : Array<Customer | Lead> => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  useEffect(() => {
    customerPresenter.getAllCustomers().then((data) => setCustomers(data));
    leadPresenter.getAllLeads().then((data) => setLeads(data));
  }, []);
  return useMemo(() => ([...customers, ...leads]), [customers, leads]);
};
