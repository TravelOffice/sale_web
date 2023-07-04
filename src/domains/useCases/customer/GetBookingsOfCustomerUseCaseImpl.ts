import { customerRepository } from '@adapter/repositories';
import { Booking } from '@domain/entities/Booking';
import { GetBookingsOfCustomerUseCase } from '@domain/useCases/interfaces/customer/GetBookingsOfCustomerUseCase';

export default class GetBookingsOfCustomerUseCaseImpl implements GetBookingsOfCustomerUseCase {
  invoke = async (
    customerId: string,
  ): Promise<Booking[]> => customerRepository.getBookings(customerId);
}
