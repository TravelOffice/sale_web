import { Lead } from '@domain/entities/Lead';

export interface GetLeadsOfCustomerUseCase {
  invoke: (customerId: string) => Promise<Lead[]>
}
