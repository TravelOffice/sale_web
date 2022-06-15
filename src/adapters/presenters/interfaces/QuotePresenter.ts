import { Quote } from '@domain/entities/quote/Quote';

export interface QuotePresenter {
  getListByOpportunity: (leadId: string, opportunity: string) => Promise<Array<Quote>>
}
