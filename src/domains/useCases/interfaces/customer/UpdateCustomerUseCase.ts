import { Customer } from '@domain/entities/Customer';

export interface UpdateCustomerUseCase {
  invoke: (customer: Customer) => Promise<Customer>
}
