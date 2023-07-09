import { Lead } from '@domain/entities/lead/Lead';

export interface GetLeadsByCustomerUseCase {
  invoke: (customerId: string) => Promise<Lead[]>
}
