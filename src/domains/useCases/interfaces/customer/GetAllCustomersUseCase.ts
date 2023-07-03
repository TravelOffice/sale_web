import { Customer } from '@domain/entities/Customer';

export interface GetAllCustomersUseCase {
  invoke: () => Promise<Customer[]>
}
