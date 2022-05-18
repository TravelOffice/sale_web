import { Opportunity } from '@domain/entities/opportunity/Opportunity';

export interface GetOpportunitiesByLeadUseCase {
  invoke: (leadPhoneAsId: string) => Promise<Opportunity[]>
}
