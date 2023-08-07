import { tourRepository } from '@adapter/repositories';
import { GetPaymentVouchersOfTourUseCase } from '@domain/useCases/interfaces/tour/GetPaymentVouchersOfTourUseCase';
import { PaymentVoucher } from '@domain/entities/paymentVoucher/PaymentVoucher';

export default class GetPaymentVouchersOfTourUseCaseImpl
implements GetPaymentVouchersOfTourUseCase {
  invoke = async (
    departureTourId: string,
  ): Promise<PaymentVoucher[]> => tourRepository.getPaymentVouchersByTour(departureTourId);
}
