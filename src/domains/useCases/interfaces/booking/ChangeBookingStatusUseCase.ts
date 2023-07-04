import { Booking, BookingStatus } from '@domain/entities/booking/Booking';

export interface ChangeBookingStatusUseCase {
  invoke: (bookingId: string, newStatus: BookingStatus, reason?: string) => Promise<Booking>
}
