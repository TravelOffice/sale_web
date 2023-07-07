import { CreateCustomerFormData, Customer, UpdateCustomerFormData } from '@domain/entities/customer/Customer';
import { Lead } from '@domain/entities/lead/Lead';
import { Booking } from '@domain/entities/booking/Booking';

export interface CustomerPresenter {
  addCustomer: (customer: CreateCustomerFormData) => Promise<Customer>;
  getCustomer: (customerId: string) => Promise<Customer>;
  updateCustomer: (customerId: string, customer: UpdateCustomerFormData) => Promise<Customer>;
  getAllCustomers: () => Promise<Customer[]>;
  getMyCustomers: () => Promise<Customer[]>;
  getLeadsOfCustomer: (customerId: string) => Promise<Lead[]>;
  getBookingsOfCustomer: (customerId: string) => Promise<Booking[]>;
}
