import { CustomerPresenter } from '@adapter/presenters/interfaces/CustomerPresenter';
import { Customer } from '@domain/entities/Customer';
import {
  addCustomerUseCase,
  getAllCustomersUseCase,
  getBookingsOfCustomerUseCase,
  getCustomerUseCase,
  getLeadsOfCustomerUseCase,
  updateCustomerUseCase,
} from '@domain/useCases';

export default class CustomerPresenterImpl implements CustomerPresenter {
  addCustomer = async (customer: Customer) => addCustomerUseCase.invoke(customer);

  getAllCustomers = async () => getAllCustomersUseCase.invoke();

  getBookingsOfCustomer = async (
    customerId: string,
  ) => getBookingsOfCustomerUseCase.invoke(customerId);

  getCustomer = async (customerId: string) => getCustomerUseCase.invoke(customerId);

  getLeadsOfCustomer = async (customerId: string) => getLeadsOfCustomerUseCase.invoke(customerId);

  getMyCustomers = async () => Promise.resolve([]);

  updateCustomer = async (customer: Customer) => updateCustomerUseCase.invoke(customer);
}
