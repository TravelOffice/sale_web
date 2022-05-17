import { opportunityRepository } from '@adapter/repositories';
import { Opportunity } from '@domain/entities/opportunity/Opportunity';
import { GetOpportunitiesByLeadUseCase } from '../interfaces/opportunity/GetOpportunitiesByLeadUseCase';

export default class GetOpportunitiesByLeadUseCaseImpl implements GetOpportunitiesByLeadUseCase {
  invoke = async (
    leadPhoneAsId: string,
  ): Promise<Opportunity[]> => opportunityRepository.getOpportunitiesByLead(leadPhoneAsId);
}
