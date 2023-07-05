import { BookingPresenter } from '@adapter/presenters/interfaces/BookingPresenter';
import { getBookings } from '@domain/useCases';
import { BookingStatus } from '@domain/entities/booking/Booking';

export default class BookingPresenterImpl implements BookingPresenter {
  getBookings = async (status?: BookingStatus) => getBookings.invoke(status);
}
