import { customerRepository } from '@adapter/repositories';
import { GetLeadsOfCustomerUseCase } from '@domain/useCases/interfaces/customer/GetLeadsOfCustomerUseCase';
import { Lead } from '@domain/entities/Lead';

export default class GetLeadsOfCustomerUseCaseImpl implements GetLeadsOfCustomerUseCase {
  invoke = async (customerId: string): Promise<Lead[]> => customerRepository.getLeads(customerId);
}
