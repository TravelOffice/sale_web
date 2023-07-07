import { CreateCustomerFormData, Customer } from '@domain/entities/customer/Customer';

export interface AddCustomerUseCase {
  invoke: (customer: CreateCustomerFormData) => Promise<Customer>
}
