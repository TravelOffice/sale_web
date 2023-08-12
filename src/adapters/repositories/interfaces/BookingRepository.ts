import { AddBookingFormData } from '@domain/entities/booking/AddBookingFormData';
import { Booking, BookingStatus } from '@domain/entities/booking/Booking';
import { AddBookingFromLeadFormData } from '@domain/entities/booking/AddBookingFromLeadFormData';
import { UpdateBookingFormData } from '@domain/entities/booking/UpdateBookingFormData';
import { CreateNoteFormData, Note } from '@domain/entities/note/Note';

export interface BookingRepository {
  addBooking(bookingFormData: AddBookingFormData): Promise<Booking>;

  addBookingFromLead(bookingFormData: AddBookingFromLeadFormData): Promise<Booking>;

  getBooking(bookingId: string): Promise<Booking>;

  getBookings(status?: BookingStatus): Promise<Booking[]>;

  updateBooking(bookingId: string, booking: UpdateBookingFormData): Promise<Booking>;

  changeStatus(bookingId: string, status: BookingStatus, reason?: string): Promise<Booking>;

  cancelBooking(bookingId: string, reason: string): Promise<Partial<Booking>>;

  confirmBooking(bookingId: string, departureTourId: string): Promise<Partial<Booking>>;

  changeToPaymentPending(bookingId: string, waitingExpiredAt: number): Promise<Booking>;

  addNote(bookingId: string, formData: CreateNoteFormData): Promise<Note>
}
