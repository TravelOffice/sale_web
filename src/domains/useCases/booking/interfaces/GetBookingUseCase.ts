import { Booking } from '@domain/entities/booking/Booking';

export interface GetBookingUseCase {
  invoke: (bookingId: string) => Promise<Booking>
}
