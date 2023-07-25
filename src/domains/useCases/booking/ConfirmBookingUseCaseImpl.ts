import { bookingRepository } from '@adapter/repositories';
import { ConfirmBookingUseCase } from '@domain/useCases/booking/interfaces/ConfirmaBookingUseCase';

export default class ConfirmBookingUseCaseImpl implements ConfirmBookingUseCase {
  invoke = async (
    bookingId: string,
    departureTourId: string,
  ) => bookingRepository.confirmBooking(bookingId, departureTourId);
}
