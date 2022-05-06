import { Customer } from '@domain/entities/Lead';

export interface CustomerRepository {
  addCustomer(customer: Customer): Promise<Customer>;
  updateCustomer(customer: Customer): Promise<Customer>;
  getAllCustomers: () => Promise<Customer[]>;
}
