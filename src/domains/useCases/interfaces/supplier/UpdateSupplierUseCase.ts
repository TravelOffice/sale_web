import { Supplier, UpdateSupplierFormData } from '@domain/entities/supplier';

export interface UpdateSupplierUseCase {
  invoke: (supplierId: string, supplier: UpdateSupplierFormData) => Promise<Supplier>
}
