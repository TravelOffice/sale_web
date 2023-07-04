import { Booking } from '@domain/entities/booking/Booking';
import { UpdateBookingUseCase } from '@domain/useCases/interfaces/booking/UpdateBookingUseCase';
import { bookingRepository } from '@adapter/repositories';

export default class UpdateBookingUseCaseImpl implements UpdateBookingUseCase {
  invoke = async (booking: Booking) => bookingRepository.updateBooking(booking);
}
