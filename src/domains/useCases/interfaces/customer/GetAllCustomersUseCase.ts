import { Customer } from '@domain/entities/Lead';

export interface GetAllCustomersUseCase {
  invoke: () => Promise<Customer[]>
}
