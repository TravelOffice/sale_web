import { useQuery } from '@tanstack/react-query';
import { userPresenter } from '@adapter/presenters';
import { RoleEnum } from '@domain/entities/User';
import { useMemo } from 'react';
import { generateUserDisplayName } from '@utils/UserUtils';
import { canUserBeOperator } from '@utils/TousOperationUtils';

// eslint-disable-next-line import/prefer-default-export
export function useAllSales() {
  return useQuery({
    queryKey: ['allSales'],
    queryFn: async () => {
      const users = await userPresenter.getAllUsers();
      return users.filter((user) => user.roles.includes(RoleEnum.SALE));
    },
  });
}

export function useAllSaleOptions() {
  const { data: allSales } = useAllSales();
  return useMemo(() => {
    if (!allSales) return [];
    return allSales.map((sale) => ({
      label: generateUserDisplayName(sale),
      value: sale.username,
    }));
  }, [allSales]);
}

export function useAllOperators() {
  return useQuery({
    queryKey: ['allSales'],
    queryFn: async () => {
      const users = await userPresenter.getAllUsers();
      return users.filter((user) => canUserBeOperator(user));
    },
  });
}

export function useAllOperatorOptions() {
  const { data: allOperators } = useAllOperators();
  return useMemo(() => {
    if (!allOperators) return [];
    return allOperators.map((operator) => ({
      label: generateUserDisplayName(operator),
      value: operator.username,
    }));
  }, [allOperators]);
}
