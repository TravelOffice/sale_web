import { Booking } from '@domain/entities/booking/Booking';

export interface UpdateBookingUseCase {
  invoke: (booking: Booking) => Promise<Booking>
}
