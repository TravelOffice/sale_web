import { customerRepository } from '@adapter/repositories';
import { Customer } from '@domain/entities/Customer';
import { AddCustomerUseCase } from '@domain/useCases/interfaces/customer/AddCustomerUseCase';

export default class AddCustomerUseCaseImpl implements AddCustomerUseCase {
  invoke = async (customer: Customer): Promise<Customer> => customerRepository.add(customer);
}
