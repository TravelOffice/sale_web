import { Booking, BookingStatus } from '@domain/entities/booking/Booking';
import { AddBookingFormData } from '@domain/entities/booking/AddBookingFormData';
import { AddBookingFromLeadFormData } from '@domain/entities/booking/AddBookingFromLeadFormData';
import { UpdateBookingFormData } from '@domain/entities/booking/UpdateBookingFormData';

export interface BookingPresenter {
  getBookings(status?: BookingStatus): Promise<Booking[]>;

  getBookingsByCustomer(customerId: string): Promise<Booking[]>;

  createBooking(data: AddBookingFormData): Promise<Booking>;

  createBookingFromLead(data: AddBookingFromLeadFormData): Promise<Booking>;

  getBooking(bookingId: string): Promise<Booking>;

  updateBooking(bookingId: string, booking: UpdateBookingFormData): Promise<Booking>;
}
