import { customerRepository } from '@adapter/repositories';
import { Customer } from '@domain/entities/Lead';
import { GetAllCustomersUseCase } from '../interfaces/customer/GetAllCustomersUseCase';

export default class GetAllCustomersUseCaseImpl implements GetAllCustomersUseCase {
  invoke = async () : Promise<Customer[]> => customerRepository.getAllCustomers();
}
