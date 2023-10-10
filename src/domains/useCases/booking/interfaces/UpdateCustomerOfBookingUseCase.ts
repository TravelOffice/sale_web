import { Customer, UpdateCustomerFormData } from '@domain/entities/customer/Customer';

export interface UpdateCustomerOfBookingUseCase {
  invoke: (bookingId: string, customer: UpdateCustomerFormData) => Promise<Customer>
}
