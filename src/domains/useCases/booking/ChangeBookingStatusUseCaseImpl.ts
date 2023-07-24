import { BookingStatus } from '@domain/entities/booking/Booking';
import { bookingRepository } from '@adapter/repositories';
import { ChangeBookingStatusUseCase } from '@domain/useCases/booking/interfaces/ChangeBookingStatusUseCase';

export default class ChangeBookingStatusUseCaseImpl implements ChangeBookingStatusUseCase {
  invoke = async (
    bookingId: string,
    newStatus: BookingStatus,
    reason?: string,
  ) => bookingRepository.changeStatus(bookingId, newStatus, reason);
}
