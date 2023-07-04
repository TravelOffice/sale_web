import { Booking, BookingStatus } from '@domain/entities/booking/Booking';

export interface GetBookingsUseCase {
  invoke: (status?: BookingStatus) => Promise<Booking[]>
}
