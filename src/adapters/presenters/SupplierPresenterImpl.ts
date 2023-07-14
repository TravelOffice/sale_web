import { Supplier } from '@domain/entities/supplier';
import {
  addSupplierUseCase, getAllSuppliersUseCase,
  getSupplierUseCase, updateSupplierUseCase,
} from '@domain/useCases';
import { SupplierPresenter } from './interfaces/SupplierPresenter';

export default class SupplierPresenterImpl implements SupplierPresenter {
    getAllSuppliers = async () => getAllSuppliersUseCase.invoke();

    getSupplier = async (
      supplierId: string,
    ) => getSupplierUseCase.invoke(supplierId);

    addSupplier = async (payload: Supplier) => addSupplierUseCase.invoke(payload);

    updateSupplier = async (
      supplierId: string,
      formData: Supplier,
    ) => updateSupplierUseCase.invoke(supplierId, formData);
}
