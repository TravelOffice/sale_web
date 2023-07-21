import { BookingPresenter } from '@adapter/presenters/interfaces/BookingPresenter';
import {
  addBookingFromLeadUseCase,
  addBookingUseCase,
  getBookingsOfCustomerUseCase,
  getBookingsUseCase,
  getBookingUseCase,
  updateBookingUseCase,
} from '@domain/useCases';
import { BookingStatus } from '@domain/entities/booking/Booking';
import { AddBookingFormData } from '@domain/entities/booking/AddBookingFormData';
import { AddBookingFromLeadFormData } from '@domain/entities/booking/AddBookingFromLeadFormData';
import { UpdateBookingFormData } from '@domain/entities/booking/UpdateBookingFormData';

export default class BookingPresenterImpl implements BookingPresenter {
  getBookings = async (status?: BookingStatus) => getBookingsUseCase.invoke(status);

  getBookingsByCustomer = async (
    customerId: string,
  ) => getBookingsOfCustomerUseCase.invoke(customerId);

  createBooking = async (data: AddBookingFormData) => addBookingUseCase.invoke(data);

  createBookingFromLead = async (
    data: AddBookingFromLeadFormData,
  ) => addBookingFromLeadUseCase.invoke(data);

  getBooking = async (bookingId: string) => getBookingUseCase.invoke(bookingId);

  updateBooking = async (
    bookingId: string,
    booking: UpdateBookingFormData,
  ) => updateBookingUseCase.invoke(bookingId, booking);
}
