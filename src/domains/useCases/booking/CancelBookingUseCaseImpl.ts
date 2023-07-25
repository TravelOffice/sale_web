import { bookingRepository } from '@adapter/repositories';
import { CancelBookingUseCase } from '@domain/useCases/booking/interfaces/CancelBookingUseCase';

export default class CancelBookingUseCaseImpl implements CancelBookingUseCase {
  invoke = async (
    bookingId: string,
    reason: string,
  ) => bookingRepository.cancelBooking(bookingId, reason);
}
