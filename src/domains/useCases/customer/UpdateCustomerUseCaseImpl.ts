import { customerRepository } from '@adapter/repositories';
import { UpdateCustomerUseCase } from '@domain/useCases/interfaces/customer/UpdateCustomerUseCase';
import { Customer, UpdateCustomerFormData } from '@domain/entities/customer/Customer';

export default class UpdateCustomerUseCaseImpl implements UpdateCustomerUseCase {
  invoke = async (
    customerId: string, customer: UpdateCustomerFormData,
  ): Promise<Customer> => customerRepository.update(customerId, customer);
}
