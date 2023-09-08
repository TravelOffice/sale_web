import { Booking } from '@domain/entities/booking/Booking';
import { ConfirmBookingFormData } from '@domain/entities/booking/ConfirmBookingFormData';

export interface ConfirmBookingUseCase {
  invoke: (bookingId: string, formData: ConfirmBookingFormData) => Promise<Partial<Booking>>
}
