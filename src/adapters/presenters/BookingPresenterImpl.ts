import { BookingPresenter } from '@adapter/presenters/interfaces/BookingPresenter';
import {
  getBookingsUseCase,
  getBookingsOfCustomerUseCase,
  addBookingUseCase,
  addBookingFromLeadUseCase,
} from '@domain/useCases';
import { BookingStatus } from '@domain/entities/booking/Booking';
import { AddBookingFormData } from '@domain/entities/booking/AddBookingFormData';
import { AddBookingFromLeadFormData } from '@domain/entities/booking/AddBookingFromLeadFormData';

export default class BookingPresenterImpl implements BookingPresenter {
  getBookings = async (status?: BookingStatus) => getBookingsUseCase.invoke(status);

  getBookingsByCustomer = async (
    customerId: string,
  ) => getBookingsOfCustomerUseCase.invoke(customerId);

  createBooking = async (data: AddBookingFormData) => addBookingUseCase.invoke(data);

  createBookingFromLead = async (
    data: AddBookingFromLeadFormData,
  ) => addBookingFromLeadUseCase.invoke(data);
}
