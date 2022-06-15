import { GetQuotesByOpportunityUseCase } from '@domain/useCases/interfaces/quote/GetQuotesByOpportunityUseCase';
import { Quote } from '@domain/entities/quote/Quote';

export default class GetQuotesByOpportunityUseCaseImpl implements GetQuotesByOpportunityUseCase {
    invoke = async (
      leadId: string,
      opportunityId: string,
    ): Promise<Array<Quote>> => [];
}
