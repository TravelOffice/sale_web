import { GetAllLeadsUseCase } from '@domain/useCases/interfaces/lead/GetAllLeadsUseCase';
import { GetLeadUseCase } from '@domain/useCases/interfaces/lead/GetLeadUseCase';
import { AddLeadUseCase } from '@domain/useCases/interfaces/lead/AddLeadUseCase';
import { UpdateLeadUseCase } from '@domain/useCases/interfaces/lead/UpdateLeadUseCase';
import { GetMyLeadsUseCase } from '@domain/useCases/interfaces/lead/GetMyLeadsUseCase';
import GetAllLeadsUseCaseImpl from '@domain/useCases/lead/GetAllLeadsUseCaseImpl';
import GetMyLeadsUseCaseImpl from '@domain/useCases/lead/GetMyLeadsUseCaseImpl';
import GetLeadUseCaseImpl from '@domain/useCases/lead/GetLeadUseCaseImpl';
import AddLeadUseCaseImpl from '@domain/useCases/lead/AddLeadUseCaseImpl';
import UpdateLeadUseCaseImpl from '@domain/useCases/lead/UpdateLeadUseCaseImpl';
import { GetLeadsOfCustomerUseCase } from '@domain/useCases/interfaces/customer/GetLeadsOfCustomerUseCase';
import GetLeadsByCustomerUseCase from '@domain/useCases/lead/GetLeadsByCustomerUseCaseImpl';
import { TakeLeadUseCase } from '@domain/useCases/interfaces/lead/TakeLeadUseCase';
import TakeLeadUseCaseImpl from '@domain/useCases/lead/TakeLeadUseCaseImpl';
import { CancelLeadUseCase } from '@domain/useCases/interfaces/lead/CancelLeadUseCase';
import CancelLeadUseCaseImpl from '@domain/useCases/lead/CancelLeadUseCaseImpl';

interface LeadUseCases {
  getAllLeadsUseCase: GetAllLeadsUseCase,
  getMyLeadUseCase: GetMyLeadsUseCase,
  getLeadUseCase: GetLeadUseCase,
  addLeadUseCase: AddLeadUseCase,
  updateLeadUseCase: UpdateLeadUseCase,
  getLeadsByCustomerUseCase: GetLeadsOfCustomerUseCase,
  takeLeadUseCase: TakeLeadUseCase,
  cancelLeadUseCase: CancelLeadUseCase,
}

const useCases: LeadUseCases = {
  getAllLeadsUseCase: new GetAllLeadsUseCaseImpl(),
  getMyLeadUseCase: new GetMyLeadsUseCaseImpl(),
  getLeadUseCase: new GetLeadUseCaseImpl(),
  addLeadUseCase: new AddLeadUseCaseImpl(),
  updateLeadUseCase: new UpdateLeadUseCaseImpl(),
  getLeadsByCustomerUseCase: new GetLeadsByCustomerUseCase(),
  takeLeadUseCase: new TakeLeadUseCaseImpl(),
  cancelLeadUseCase: new CancelLeadUseCaseImpl(),
};

export const {
  getAllLeadsUseCase,
  getMyLeadUseCase,
  getLeadUseCase,
  addLeadUseCase,
  updateLeadUseCase,
  getLeadsByCustomerUseCase,
  takeLeadUseCase,
  cancelLeadUseCase,
} = useCases;
