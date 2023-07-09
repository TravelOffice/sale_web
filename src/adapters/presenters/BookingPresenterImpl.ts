import { BookingPresenter } from '@adapter/presenters/interfaces/BookingPresenter';
import { getBookings, getBookingsOfCustomerUseCase } from '@domain/useCases';
import { BookingStatus } from '@domain/entities/booking/Booking';

export default class BookingPresenterImpl implements BookingPresenter {
  getBookings = async (status?: BookingStatus) => getBookings.invoke(status);

  getBookingsByCustomer = async (
    customerId: string,
  ) => getBookingsOfCustomerUseCase.invoke(customerId);
}
