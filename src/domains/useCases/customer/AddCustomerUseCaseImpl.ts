import { customerRepository } from '@adapter/repositories';
import { Customer } from '@domain/entities/Lead';
import { AddCustomerUseCase } from '../interfaces/customer/AddCustomerUseCase';

export default class AddCustomerUseCaseImpl implements AddCustomerUseCase {
  invoke = async (
    customer: Customer,
  ) : Promise<Customer> => customerRepository.addCustomer(customer);
}
