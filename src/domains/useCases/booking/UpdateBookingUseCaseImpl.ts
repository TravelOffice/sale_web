import { UpdateBookingUseCase } from '@domain/useCases/booking/interfaces/UpdateBookingUseCase';
import { bookingRepository } from '@adapter/repositories';
import { UpdateBookingFormData } from '@domain/entities/booking/UpdateBookingFormData';

export default class UpdateBookingUseCaseImpl implements UpdateBookingUseCase {
  invoke = async (
    bookingId: string,
    booking: UpdateBookingFormData,
  ) => bookingRepository.updateBooking(bookingId, booking);
}
