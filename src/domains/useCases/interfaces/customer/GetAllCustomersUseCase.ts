import { Customer, CustomerStatusType } from '@domain/entities/Lead';

export interface GetAllCustomersUseCase {
  invoke: (status?: CustomerStatusType) => Promise<Customer[]>
}
