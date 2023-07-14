import { supplierRepository } from '@adapter/repositories';
import { UpdateSupplierUseCase } from '@domain/useCases/interfaces/supplier/UpdateSupplierUseCase';
import { Supplier, UpdateSupplierFormData } from '@domain/entities/supplier';

export default class UpdateSupplierUseCaseImpl implements UpdateSupplierUseCase {
  invoke = async (
    supplierId: string,
    supplier: UpdateSupplierFormData,
  ): Promise<Supplier> => supplierRepository.updateSupplier(
    supplierId,
    supplier,
  );
}
