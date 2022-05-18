import { Customer, CustomerStatusType } from '@domain/entities/Lead';

export interface CustomerPresenter {
  addCustomer: (customer: Customer) => Promise<Customer>;
  updateCustomer: (customer: Customer) => Promise<Customer>;
  getAllCustomers: (status?: CustomerStatusType) => Promise<Customer[]>
}
