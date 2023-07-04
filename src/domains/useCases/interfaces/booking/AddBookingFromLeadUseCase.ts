import { Booking } from '@domain/entities/booking/Booking';
import { AddBookingFromLeadFormData } from '@domain/entities/booking/AddBookingFromLeadFormData';

export interface AddBookingFromLeadUseCase {
  invoke: (formData: AddBookingFromLeadFormData) => Promise<Booking>
}
