import { Booking } from '@domain/entities/booking/Booking';

export interface GetBookingsOfDepartureTourUseCase {
  invoke: (departureTourId: string) => Promise<Booking[]>
}
