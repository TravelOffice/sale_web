import { Lead } from '@domain/entities/lead/Lead';

export interface GetLeadsOfCustomerUseCase {
  invoke: (customerId: string) => Promise<Lead[]>
}
