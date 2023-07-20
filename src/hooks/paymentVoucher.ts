import { useQuery } from '@tanstack/react-query';
import { paymentVoucherPresenter } from '@adapter/presenters';

// eslint-disable-next-line import/prefer-default-export
export function usePaymentVouchers() {
  return useQuery(['paymentVoucher'], paymentVoucherPresenter.getAllPaymentVouchers);
}
