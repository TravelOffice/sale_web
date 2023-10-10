import { Booking, BookingStatus } from '@domain/entities/booking/Booking';
import { AddBookingFormData } from '@domain/entities/booking/AddBookingFormData';
import { AddBookingFromLeadFormData } from '@domain/entities/booking/AddBookingFromLeadFormData';
import { UpdateBookingFormData } from '@domain/entities/booking/UpdateBookingFormData';
import { CreateNoteFormData, Note } from '@domain/entities/note/Note';
import { ConfirmBookingFormData } from '@domain/entities/booking/ConfirmBookingFormData';
import { Customer, UpdateCustomerFormData } from '@domain/entities/customer/Customer';

export interface BookingPresenter {
  getBookings(status?: BookingStatus): Promise<Booking[]>;

  getBookingsByCustomer(customerId: string): Promise<Booking[]>;

  createBooking(data: AddBookingFormData): Promise<Booking>;

  createBookingFromLead(data: AddBookingFromLeadFormData): Promise<Booking>;

  getBooking(bookingId: string): Promise<Booking>;

  updateBooking(bookingId: string, booking: UpdateBookingFormData): Promise<Booking>;

  addNoteToBooking(bookingId: string, formData: CreateNoteFormData): Promise<Note>;

  cancelBooking(bookingId: string, reason: string): Promise<Partial<Booking>>;

  confirmBooking(bookingId: string, formData: ConfirmBookingFormData): Promise<Partial<Booking>>;

  changeToPaymentPending(bookingId: string, waitingExpiredAt: number): Promise<Partial<Booking>>;

  updateCustomerOfBooking(bookingId: string, customer: UpdateCustomerFormData): Promise<Customer>;
}
