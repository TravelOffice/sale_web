import { Lead } from '@domain/entities/Lead';
import { Customer } from '@domain/entities/Customer';
import { Booking } from '@domain/entities/Booking';

export interface CustomerPresenter {
  addCustomer: (customer: Customer) => Promise<Customer>;
  getCustomer: (customerId: string) => Promise<Customer>;
  updateCustomer: (customer: Customer) => Promise<Customer>;
  getAllCustomers: () => Promise<Customer[]>;
  getMyCustomers: () => Promise<Customer[]>;
  getLeadsOfCustomer: (customerId: string) => Promise<Lead[]>;
  getBookingsOfCustomer: (customerId: string) => Promise<Booking[]>;
}
