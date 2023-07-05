import { Booking, BookingStatus } from '@domain/entities/booking/Booking';

export interface BookingPresenter {
  getBookings(status?: BookingStatus): Promise<Booking[]>;
}
