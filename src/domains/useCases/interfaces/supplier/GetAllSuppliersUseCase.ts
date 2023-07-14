import { Supplier } from '@domain/entities/supplier';

export interface GetAllSuppliersUseCase {
  invoke: () => Promise<Supplier[]>
}
