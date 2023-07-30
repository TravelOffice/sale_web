import { useQuery } from '@tanstack/react-query';
import { supplierPresenter } from '@adapter/presenters';
import { useMemo } from 'react';

export function useSupplier() {
  return useQuery(['suppliers'], async () => supplierPresenter.getAllSuppliers());
}

export function useSupplierOptions() {
  const { data: suppliers } = useSupplier();
  return useMemo(() => {
    if (!suppliers) return [];
    return suppliers.map((supplier) => ({
      label: supplier.name,
      value: supplier.code,
    }));
  }, [suppliers]);
}
