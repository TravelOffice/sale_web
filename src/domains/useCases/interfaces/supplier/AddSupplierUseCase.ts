import { Supplier, CreateSupplierFormData } from '@domain/entities/supplier';

export interface AddSupplierUseCase {
  invoke: (supplier: CreateSupplierFormData) => Promise<Supplier>
}
