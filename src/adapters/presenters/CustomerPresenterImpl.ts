import { CustomerPresenter } from '@adapter/presenters/interfaces/CustomerPresenter';
import { CreateCustomerFormData, UpdateCustomerFormData } from '@domain/entities/customer/Customer';
import {
  addCustomerUseCase,
  getAllCustomersUseCase,
  getBookingsOfCustomerUseCase,
  getCustomerUseCase,
  getLeadsOfCustomerUseCase,
  updateCustomerUseCase,
} from '@domain/useCases';

export default class CustomerPresenterImpl implements CustomerPresenter {
  addCustomer = async (customer: CreateCustomerFormData) => addCustomerUseCase.invoke(customer);

  getAllCustomers = async () => getAllCustomersUseCase.invoke();

  getBookingsOfCustomer = async (
    customerId: string,
  ) => getBookingsOfCustomerUseCase.invoke(customerId);

  getCustomer = async (customerId: string) => getCustomerUseCase.invoke(customerId);

  getLeadsOfCustomer = async (customerId: string) => getLeadsOfCustomerUseCase.invoke(customerId);

  getMyCustomers = async () => Promise.resolve([]);

  updateCustomer = async (
    customerId: string, customer: UpdateCustomerFormData,
  ) => updateCustomerUseCase.invoke(customerId, customer);
}
