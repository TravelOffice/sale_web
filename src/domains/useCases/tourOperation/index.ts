import { AddTourPlanActivityUseCase } from '@domain/useCases/tourOperation/interfaces/AddTourPlanActivityUseCase';
import AddTourPlanActivityUseCaseImpl from '@domain/useCases/tourOperation/AddTourPlanActivityUseCaseImpl';
import { UpdateTourPlanActivityUseCase } from '@domain/useCases/tourOperation/interfaces/UpdateTourPlanActivityUseCase';
import UpdateTourPlanActivityUseCaseImpl from '@domain/useCases/tourOperation/UpdateTourPlanActivityUseCaseImpl';
import { GetTourPlanUseCase } from '@domain/useCases/tourOperation/interfaces/GetTourPlanUseCase';
import GetTourPlanUseCaseImpl from '@domain/useCases/tourOperation/GetTourPlanUseCaseImpl';
import { DeleteTourPlanActivityUseCase } from '@domain/useCases/tourOperation/interfaces/DeleteTourPlanActivityUseCase';
import DeleteTourPlanActivityUseCaseImpl from '@domain/useCases/tourOperation/DeleteTourPlanActivityUseCaseImpl';

interface TourOperationUseCases {
  getTourPlanUseCase: GetTourPlanUseCase,
  addTourPlanActivityUseCase: AddTourPlanActivityUseCase,
  updateTourPlanActivityUseCase: UpdateTourPlanActivityUseCase,
  deleteTourPlanActivityUseCase: DeleteTourPlanActivityUseCase,
}

const useCases: TourOperationUseCases = {
  getTourPlanUseCase: new GetTourPlanUseCaseImpl(),
  addTourPlanActivityUseCase: new AddTourPlanActivityUseCaseImpl(),
  updateTourPlanActivityUseCase: new UpdateTourPlanActivityUseCaseImpl(),
  deleteTourPlanActivityUseCase: new DeleteTourPlanActivityUseCaseImpl(),
};

export const {
  getTourPlanUseCase,
  addTourPlanActivityUseCase,
  updateTourPlanActivityUseCase,
  deleteTourPlanActivityUseCase,
} = useCases;
