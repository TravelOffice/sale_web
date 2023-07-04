import { bookingRepository } from '@adapter/repositories';
import { GetBookingUseCase } from '@domain/useCases/interfaces/booking/GetBookingUseCase';

export default class GetBookingUseCaseImpl implements GetBookingUseCase {
  invoke = async (bookingId: string) => bookingRepository.getBooking(bookingId);
}
