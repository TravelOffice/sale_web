import { apiProvider } from '@adapter/infrastructures';
import { SupplierRepository } from '@adapter/repositories/interfaces/SupplierRepository';
import { Supplier } from '@domain/entities/supplier';

export default class SupplierRepositoryImpl implements SupplierRepository {
  getAllSuppliers = async () => {
    const response = await apiProvider.authorizedRequest.get('/suppliers');
    return response.data;
  }

  getSupplier = async (supplierId: string) => {
    const response = await apiProvider.authorizedRequest.get(`/suppliers/${supplierId}`);
    return response.data;
  }

  addSupplier = async (supplier: Supplier) => {
    const response = await apiProvider.authorizedRequest.post('/suppliers', supplier);
    return response.data;
  }

  updateSupplier = async (supplierId: string, supplier: Supplier) => {
    const response = await apiProvider.authorizedRequest.put(`/suppliers/${supplierId}`, supplier);
    return response.data;
  }
}
