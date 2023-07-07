import { customerRepository } from '@adapter/repositories';
import { Customer } from '@domain/entities/customer/Customer';
import { GetCustomerUseCase } from '@domain/useCases/interfaces/customer/GetCustomerUseCase';

export default class GetCustomerUseCaseImpl implements GetCustomerUseCase {
  invoke = async (customerId: string): Promise<Customer> => customerRepository.get(customerId);
}
