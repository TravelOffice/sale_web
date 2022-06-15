import { Quote } from '@domain/entities/quote/Quote';

export interface GetQuotesByOpportunityUseCase {
  invoke: (leadId: string, opportunityId: string) => Promise<Array<Quote>>;
}
