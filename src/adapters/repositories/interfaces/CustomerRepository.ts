import { CreateCustomerFormData, Customer, UpdateCustomerFormData } from '@domain/entities/customer/Customer';
import { Lead } from '@domain/entities/lead/Lead';
import { Booking } from '@domain/entities/booking/Booking';

export interface CustomerRepository {
  add(customer: CreateCustomerFormData): Promise<Customer>;

  update(customerId: string, customer: UpdateCustomerFormData): Promise<Customer>;

  get(customerId: string): Promise<Customer>;

  getAll(): Promise<Customer[]>;

  getLeads(customerId: string): Promise<Lead[]>;

  getBookings(customerId: string): Promise<Booking[]>;
}
