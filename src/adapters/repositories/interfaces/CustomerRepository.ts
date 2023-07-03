import { Customer } from '@domain/entities/Customer';
import { Lead } from '@domain/entities/Lead';
import { Booking } from '@domain/entities/Booking';

export interface CustomerRepository {
  add(customer: Customer): Promise<Customer>;

  update(customer: Customer): Promise<Customer>;

  get(customerId: string): Promise<Customer>;

  getAll(): Promise<Customer[]>;

  getLeads(customerId: string): Promise<Lead[]>;

  getBookings(customerId: string): Promise<Booking[]>;
}
