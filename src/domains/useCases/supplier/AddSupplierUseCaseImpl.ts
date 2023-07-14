import { supplierRepository } from '@adapter/repositories';
import { AddSupplierUseCase } from '@domain/useCases/interfaces/supplier/AddSupplierUseCase';
import { CreateSupplierFormData, Supplier } from '@domain/entities/supplier';

export default class AddSupplierUseCaseImpl implements AddSupplierUseCase {
  invoke = async (
    supplier: CreateSupplierFormData,
  ) : Promise<Supplier> => supplierRepository.addSupplier(supplier);
}
