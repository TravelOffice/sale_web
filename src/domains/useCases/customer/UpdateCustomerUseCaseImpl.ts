import { customerRepository } from '@adapter/repositories';
import { Customer } from '@domain/entities/Lead';
import { UpdateCustomerUseCase } from '../interfaces/customer/UpdateCustomerUseCase';

export default class UpdateCustomerUseCaseImpl implements UpdateCustomerUseCase {
  invoke = async (
    customer: Customer,
  ) : Promise<Customer> => customerRepository.updateCustomer(customer);
}
