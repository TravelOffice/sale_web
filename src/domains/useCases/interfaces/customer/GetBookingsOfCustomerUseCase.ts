import { Booking } from '@domain/entities/Booking';

export interface GetBookingsOfCustomerUseCase {
  invoke: (customerId: string) => Promise<Booking[]>
}
