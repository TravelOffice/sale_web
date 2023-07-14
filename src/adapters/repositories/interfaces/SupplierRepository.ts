import { CreateSupplierFormData, Supplier, UpdateSupplierFormData } from '@domain/entities/supplier/Supplier';

export interface SupplierRepository {
  addSupplier(supplier: CreateSupplierFormData): Promise<Supplier>;
  updateSupplier(supplierId: string, supplier: UpdateSupplierFormData): Promise<Supplier>;
  getSupplier(supplierId: string): Promise<Supplier>;
  getAllSuppliers(): Promise<Supplier[]>;
}
