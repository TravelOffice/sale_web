import { GetTourLocationListUseCase } from '@domain/useCases/tourLocation/interfaces/GetTourLocationListUseCase';
import { UpdateTourLocationUseCase } from '@domain/useCases/tourLocation/interfaces/UpdateTourLocationUseCase';
import GetTourLocationListUseCaseImpl from '@domain/useCases/tourLocation/GetTourLocationListUseCaseImpl';
import UpdateTourLocationUseCaseImpl from '@domain/useCases/tourLocation/UpdateTourLocationUseCaseImpl';
import CreateTourLocationUseCaseImpl from '@domain/useCases/tourLocation/CreateTourLocationUseCaseImpl';
import { CreateTourLocationUseCase } from './interfaces/CreateTourLocationUseCase';

interface TourLocationUseCases {
  getTourLocationListUseCase: GetTourLocationListUseCase,
  createTourLocationUseCase: CreateTourLocationUseCase,
  updateTourLocationUseCase: UpdateTourLocationUseCase,
}

const useCases: TourLocationUseCases = {
  getTourLocationListUseCase: new GetTourLocationListUseCaseImpl(),
  createTourLocationUseCase: new CreateTourLocationUseCaseImpl(),
  updateTourLocationUseCase: new UpdateTourLocationUseCaseImpl(),
};

export const {
  getTourLocationListUseCase,
  createTourLocationUseCase,
  updateTourLocationUseCase,
} = useCases;
