import { AddBookingFormData } from '@domain/entities/booking/AddBookingFormData';
import { bookingRepository } from '@adapter/repositories';
import { AddBookingUseCase } from '@domain/useCases/booking/interfaces/AddBookingUseCase';

export default class AddBookingUseCaseImpl implements AddBookingUseCase {
  invoke = async (formData: AddBookingFormData) => bookingRepository.addBooking(formData);
}
