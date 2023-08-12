import { bookingRepository } from '@adapter/repositories';
import { ChangeToPaymentPendingUseCase } from '@domain/useCases/booking/interfaces/ChangeToPaymentPendingUseCase';

export default class ChangeToPaymentPendingUseCaseImpl implements ChangeToPaymentPendingUseCase {
  invoke = async (
    bookingId: string,
    waitingExpiredAt: number,
  ) => bookingRepository.changeToPaymentPending(bookingId, waitingExpiredAt);
}
