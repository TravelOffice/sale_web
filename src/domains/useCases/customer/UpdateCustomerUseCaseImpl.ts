import { customerRepository } from '@adapter/repositories';
import { UpdateCustomerUseCase } from '@domain/useCases/interfaces/customer/UpdateCustomerUseCase';
import { Customer } from '@domain/entities/Customer';

export default class UpdateCustomerUseCaseImpl implements UpdateCustomerUseCase {
  invoke = async (customer: Customer): Promise<Customer> => customerRepository.update(customer);
}
