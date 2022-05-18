import { apiProvider } from '@adapter/infrastructures';
import { Customer, CustomerStatusType, LeadEnum } from '@domain/entities/Lead';
import { ResponseType } from '@utils/ApiUtils';
import { CustomerRepository } from './interfaces/CustomerRepository';

export default class CustomerRepositoryImpl implements CustomerRepository {
  getAllCustomers = async (status?: CustomerStatusType) => {
    const response = await apiProvider.authorizedRequest.get('/leads', {
      queryParams: {
        type: LeadEnum.CUSTOMER,
        status,
      },
    });
    if (response.message !== ResponseType.SUCCESS) {
      throw Error('Get Assigned Customer error');
    }
    return response.data;
  }

  addCustomer = async (customer: Customer) => {
    const response = await apiProvider.authorizedRequest.post('/leads', customer);
    if (response.message !== ResponseType.SUCCESS) {
      throw Error('Create Customer error');
    }
    return customer;
  }

  updateCustomer = async (customer: Customer) => {
    const response = await apiProvider.authorizedRequest.put('/leads', customer);
    if (response.message !== ResponseType.SUCCESS) {
      throw Error('Update Customer error');
    }
    return customer;
  }
}
