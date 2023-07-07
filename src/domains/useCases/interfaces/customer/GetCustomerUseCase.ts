import { Customer } from '@domain/entities/customer/Customer';

export interface GetCustomerUseCase {
  invoke: (customerId: string) => Promise<Customer>
}
