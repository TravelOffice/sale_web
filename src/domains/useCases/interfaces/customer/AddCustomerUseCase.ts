import { Customer } from '@domain/entities/Lead';

export interface AddCustomerUseCase {
  invoke: (customer: Customer) => Promise<Customer>
}
