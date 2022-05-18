import { Customer, CustomerStatusType } from '@domain/entities/Lead';
import {
  getAllCustomersUseCase, addCustomerUseCase, updateCustomerUseCase,
} from '@domain/useCases';
import { CustomerPresenter } from './interfaces/CustomerPresenter';

export default class CustomerPresenterImpl implements CustomerPresenter {
    getAllCustomers = async (status?: CustomerStatusType) => getAllCustomersUseCase.invoke(status);

    addCustomer = async (payload: Customer) => addCustomerUseCase.invoke(payload);

    updateCustomer = async (payload: Customer) => updateCustomerUseCase.invoke(payload);
}
