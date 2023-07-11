import { Booking, BookingStatus } from '@domain/entities/booking/Booking';
import { AddBookingFormData } from '@domain/entities/booking/AddBookingFormData';

export interface BookingPresenter {
  getBookings(status?: BookingStatus): Promise<Booking[]>;

  getBookingsByCustomer(customerId: string): Promise<Booking[]>;

  createBooking(data: AddBookingFormData): Promise<Booking>;
}
