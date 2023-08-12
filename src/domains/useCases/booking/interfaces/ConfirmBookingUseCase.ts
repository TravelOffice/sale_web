import { Booking } from '@domain/entities/booking/Booking';

export interface ConfirmBookingUseCase {
  invoke: (bookingId: string, departureTourId: string) => Promise<Partial<Booking>>
}
