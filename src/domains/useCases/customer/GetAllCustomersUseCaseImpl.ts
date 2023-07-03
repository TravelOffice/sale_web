import { customerRepository } from '@adapter/repositories';
import { GetAllCustomersUseCase } from '@domain/useCases/interfaces/customer/GetAllCustomersUseCase';
import { Customer } from '@domain/entities/Customer';

export default class GetAllCustomersUseCaseImpl implements GetAllCustomersUseCase {
  invoke = async (): Promise<Customer[]> => customerRepository.getAll();
}
