import { Booking } from '@domain/entities/booking/Booking';

export interface CancelBookingUseCase {
  invoke: (bookingId: string, reason: string) => Promise<Partial<Booking>>
}
