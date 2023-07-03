import { Customer } from '@domain/entities/Customer';

export interface AddCustomerUseCase {
  invoke: (customer: Customer) => Promise<Customer>
}
