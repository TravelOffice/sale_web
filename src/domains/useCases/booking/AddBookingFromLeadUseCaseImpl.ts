import { bookingRepository } from '@adapter/repositories';
import { AddBookingFromLeadUseCase } from '@domain/useCases/interfaces/booking/AddBookingFromLeadUseCase';
import { AddBookingFromLeadFormData } from '@domain/entities/booking/AddBookingFromLeadFormData';

export default class AddBookingFromLeadUseCaseImpl implements AddBookingFromLeadUseCase {
  invoke = async (
    formData: AddBookingFromLeadFormData,
  ) => bookingRepository.addBookingFromLead(formData);
}
