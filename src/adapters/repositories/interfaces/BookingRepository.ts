import { AddBookingFormData } from '@domain/entities/booking/AddBookingFormData';
import { Booking, BookingStatus } from '@domain/entities/booking/Booking';
import { AddBookingFromLeadFormData } from '@domain/entities/booking/AddBookingFromLeadFormData';

export interface BookingRepository {
  addBooking(bookingFormData: AddBookingFormData): Promise<Booking>;
  addBookingFromLead(bookingFormData: AddBookingFromLeadFormData): Promise<Booking>;
  getBooking(bookingId: string): Promise<Booking>;
  getBookings(status?: BookingStatus): Promise<Booking[]>;
  updateBooking(booking: Booking): Promise<Booking>;
  changeStatus(bookingId: string, status: BookingStatus, reason?: string): Promise<Booking>;
}
