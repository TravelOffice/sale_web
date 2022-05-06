import { Customer } from '@domain/entities/Lead';

export interface UpdateCustomerUseCase {
  invoke: (lead: Customer) => Promise<Customer>
}
