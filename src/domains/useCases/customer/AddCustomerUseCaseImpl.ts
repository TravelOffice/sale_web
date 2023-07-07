import { customerRepository } from '@adapter/repositories';
import { CreateCustomerFormData, Customer } from '@domain/entities/customer/Customer';
import { AddCustomerUseCase } from '@domain/useCases/interfaces/customer/AddCustomerUseCase';

export default class AddCustomerUseCaseImpl implements AddCustomerUseCase {
  invoke = async (
    customer: CreateCustomerFormData,
  ): Promise<Customer> => customerRepository.add(customer);
}
