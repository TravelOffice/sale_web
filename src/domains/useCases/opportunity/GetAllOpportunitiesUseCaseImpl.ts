import { opportunityRepository } from '@adapter/repositories';
import { Opportunity } from '@domain/entities/opportunity/Opportunity';
import { GetAllOpportunitiesUseCase } from '../interfaces/opportunity/GetAllOpportunitiesUseCase';

export default class GetAllOpportunitiesUseCaseImpl implements GetAllOpportunitiesUseCase {
  invoke = async () : Promise<Opportunity[]> => opportunityRepository.getAllOpportunities();
}
