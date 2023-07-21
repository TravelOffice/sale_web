import { Booking } from '@domain/entities/booking/Booking';
import { UpdateBookingFormData } from '@domain/entities/booking/UpdateBookingFormData';

export interface UpdateBookingUseCase {
  invoke: (bookingId: string, booking: UpdateBookingFormData) => Promise<Booking>
}
