import { CreateSupplierFormData, Supplier, UpdateSupplierFormData } from '@domain/entities/supplier';

export interface SupplierPresenter {
  addSupplier: (supplier: CreateSupplierFormData) => Promise<Supplier>;
  getSupplier: (supplierId: string) => Promise<Supplier>;
  updateSupplier: (supplierId: string, supplier: UpdateSupplierFormData) => Promise<Supplier>;
  getAllSuppliers: () => Promise<Supplier[]>
}
