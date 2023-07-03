import { apiProvider } from '@adapter/infrastructures';
import { CustomerRepository } from '@adapter/repositories/interfaces/CustomerRepository';
import { Customer } from '@domain/entities/Customer';

export default class CustomerRepositoryImpl implements CustomerRepository {
  get = async (customerId: string) => {
    const response = await apiProvider.authorizedRequest.get(`/customers/${customerId}`);
    return response.data;
  }

  add = async (customer:
  Customer) => {
    const response = await apiProvider.authorizedRequest.post('/customers', customer);
    return response.data;
  }

  update = async (customer: Customer) => {
    const response = await apiProvider.authorizedRequest.put(`/customers/${customer.code}`, customer);
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
