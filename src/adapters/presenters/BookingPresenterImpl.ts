import { BookingPresenter } from '@adapter/presenters/interfaces/BookingPresenter';
import { getBookingsUseCase, getBookingsOfCustomerUseCase, addBookingUseCase } from '@domain/useCases';
import { BookingStatus } from '@domain/entities/booking/Booking';
import { AddBookingFormData } from '@domain/entities/booking/AddBookingFormData';

export default class BookingPresenterImpl implements BookingPresenter {
  getBookings = async (status?: BookingStatus) => getBookingsUseCase.invoke(status);

  getBookingsByCustomer = async (
    customerId: string,
  ) => getBookingsOfCustomerUseCase.invoke(customerId);

  createBooking = async (data: AddBookingFormData) => addBookingUseCase.invoke(data);
}
