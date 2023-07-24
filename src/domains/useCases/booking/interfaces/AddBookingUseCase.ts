import { Booking } from '@domain/entities/booking/Booking';
import { AddBookingFormData } from '@domain/entities/booking/AddBookingFormData';

export interface AddBookingUseCase {
  invoke: (formData: AddBookingFormData) => Promise<Booking>
}
