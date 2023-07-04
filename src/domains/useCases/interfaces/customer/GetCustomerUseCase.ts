import { Customer } from '@domain/entities/Customer';

export interface GetCustomerUseCase {
  invoke: (customerId: string) => Promise<Customer>
}
