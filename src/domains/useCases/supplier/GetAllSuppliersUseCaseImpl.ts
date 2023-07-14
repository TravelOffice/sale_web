import { supplierRepository } from '@adapter/repositories';
import { Supplier } from '@domain/entities/supplier';
import { GetAllSuppliersUseCase } from '../interfaces/supplier/GetAllSuppliersUseCase';

export default class GetAllSuppliersUseCaseImpl implements GetAllSuppliersUseCase {
  invoke = async (): Promise<Supplier[]> => supplierRepository.getAllSuppliers();
}
