import { leadRepository } from '@adapter/repositories';

export default class GetLeadsByCustomerUseCase implements GetLeadsByCustomerUseCase {
  invoke = async (customerId: string) => leadRepository.getLeadsByCustomer(customerId);
}
