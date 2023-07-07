import { Customer } from '@domain/entities/customer/Customer';

export interface GetAllCustomersUseCase {
  invoke: () => Promise<Customer[]>
}
