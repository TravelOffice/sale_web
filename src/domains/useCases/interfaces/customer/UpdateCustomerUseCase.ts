import { Customer, UpdateCustomerFormData } from '@domain/entities/customer/Customer';

export interface UpdateCustomerUseCase {
  invoke: (customerId: string, customer: UpdateCustomerFormData) => Promise<Customer>
}
