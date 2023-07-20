import { PaymentVoucher } from '@domain/entities/paymentVoucher/PaymentVoucher';
import { PaymentVoucherFilterParams } from '@features/PaymentVoucher/components/PaymentVoucherFilter';
import { isDateInRange } from '@utils/DateUtils';

/**
 * Filters an array of payment vouchers based on the provided filter parameters.
 *
 * @param paymentVouchers - The array of payment vouchers to be filtered.
 * @param params - The filter parameters used to determine which payment vouchers to include.
 * @returns An array of filtered payment vouchers.
 */
export default function filterPaymentVouchers(
  paymentVouchers: PaymentVoucher[],
  params: PaymentVoucherFilterParams,
): PaymentVoucher[] {
  const {
    code, status, createdDateRange, dueDateRange,
  } = params;

  return paymentVouchers.filter((item: PaymentVoucher) => {
    // Filter by code
    if (code && item.code?.toLowerCase().includes(code.toLowerCase())) {
      return false;
    }

    // Filter by status
    if (status && item.status?.includes(status)) {
      return false;
    }

    // Filter by createdDateRange
    if (createdDateRange && createdDateRange.length === 2) {
      return isDateInRange(item.createdAt, createdDateRange);
    }

    // Filter by dueDateRange
    if (dueDateRange && dueDateRange.length === 2) {
      return isDateInRange(item.deadline, dueDateRange);
    }

    // Include the item if it doesn't match any of the filters
    return true;
  });
}
