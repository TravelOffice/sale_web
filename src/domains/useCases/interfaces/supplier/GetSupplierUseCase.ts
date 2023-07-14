import { Supplier } from '@domain/entities/supplier';

export interface GetSupplierUseCase {
  invoke: (supplierId: string) => Promise<Supplier>
}
