import { Supplier } from '@domain/entities/supplier';

export interface SupplierPresenter {
  addSupplier: (supplier: Supplier) => Promise<Supplier>;
  getSupplier: (supplierId: string) => Promise<Supplier>;
  updateSupplier: (supplierId: string, supplier: Supplier) => Promise<Supplier>;
  getAllSuppliers: () => Promise<Supplier[]>
}
