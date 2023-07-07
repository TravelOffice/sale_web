import { apiProvider } from '@adapter/infrastructures';
import { CustomerRepository } from '@adapter/repositories/interfaces/CustomerRepository';
import { CreateCustomerFormData, UpdateCustomerFormData } from '@domain/entities/customer/Customer';

export default class CustomerRepositoryImpl implements CustomerRepository {
  get = async (customerId: string) => {
    const response = await apiProvider.authorizedRequest.get(`/customers/${customerId}`);
    return response.data;
  }

  add = async (customer:
  CreateCustomerFormData) => {
    const response = await apiProvider.authorizedRequest.post('/customers', customer);
    return response.data;
  }

  update = async (customerId: string, customer: UpdateCustomerFormData) => {
    const response = await apiProvider.authorizedRequest.put(`/customers/${customerId}`, customer);
    return response.data;
  }

  getAll = async () => {
    const response = await apiProvider.authorizedRequest.get('/customers');
    return response.data;
  }

  getBookings = async (customerId: string) => {
    const response = await apiProvider.authorizedRequest.get(`/customers/${customerId}/leads`);
    return response.data;
  }

  getLeads = async (customerId: string) => {
    const response = await apiProvider.authorizedRequest.get(`/customers/${customerId}/bookings`);
    return response.data;
  }
}
