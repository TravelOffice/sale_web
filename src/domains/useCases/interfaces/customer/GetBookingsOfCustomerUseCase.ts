import { Booking } from '@domain/entities/booking/Booking';

export interface GetBookingsOfCustomerUseCase {
  invoke: (customerId: string) => Promise<Booking[]>
}
