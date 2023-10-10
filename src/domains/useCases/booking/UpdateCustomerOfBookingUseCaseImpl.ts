import { bookingRepository } from '@adapter/repositories';
import { UpdateCustomerFormData } from '@domain/entities/customer/Customer';
import { UpdateCustomerOfBookingUseCase } from '@domain/useCases/booking/interfaces/UpdateCustomerOfBookingUseCase';

export default class UpdateCustomerOfBookingUseCaseImpl
implements UpdateCustomerOfBookingUseCase {
  invoke = async (
    bookingId: string,
    customer: UpdateCustomerFormData,
  ) => bookingRepository.updateCustomerOfBooking(bookingId, customer);
}
