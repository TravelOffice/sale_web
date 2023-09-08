import { bookingRepository } from '@adapter/repositories';
import { ConfirmBookingUseCase } from '@domain/useCases/booking/interfaces/ConfirmBookingUseCase';
import { ConfirmBookingFormData } from '@domain/entities/booking/ConfirmBookingFormData';

export default class ConfirmBookingUseCaseImpl implements ConfirmBookingUseCase {
  invoke = async (
    bookingId: string,
    formData: ConfirmBookingFormData,
  ) => bookingRepository.confirmBooking(bookingId, formData);
}
