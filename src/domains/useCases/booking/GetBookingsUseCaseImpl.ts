import { bookingRepository } from '@adapter/repositories';
import { GetBookingsUseCase } from '@domain/useCases/interfaces/booking/GetBookingsUseCase';
import { BookingStatus } from '@domain/entities/booking/Booking';

export default class GetBookingsUseCaseImpl implements GetBookingsUseCase {
  invoke = async (status?: BookingStatus) => bookingRepository.getBookings(status);
}
