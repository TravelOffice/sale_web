import { supplierRepository } from '@adapter/repositories';
import { GetSupplierUseCase } from '@domain/useCases/interfaces/supplier/GetSupplierUseCase';
import { Supplier } from '@domain/entities/supplier';

export default class GetSupplierUseCaseImpl implements GetSupplierUseCase {
  invoke = async (
    supplierId: string,
  ): Promise<Supplier> => supplierRepository.getSupplier(supplierId);
}
