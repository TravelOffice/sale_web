import { customerRepository } from '@adapter/repositories';
import { Customer, CustomerStatusType } from '@domain/entities/Lead';
import { GetAllCustomersUseCase } from '../interfaces/customer/GetAllCustomersUseCase';

export default class GetAllCustomersUseCaseImpl implements GetAllCustomersUseCase {
  invoke = async (
    status?: CustomerStatusType,
  ): Promise<Customer[]> => customerRepository.getAllCustomers(status);
}
