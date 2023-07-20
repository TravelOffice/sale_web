import {
  assignTourOperator,
  createDepartureTourUseCase,
  getAllDepartureToursUseCase,
  getAllToursLocationUseCase,
  getAllToursTemplateUseCase,
  takeCareTourUseCase,
} from '@domain/useCases';
import { CreateDepartureTourFormData } from '@domain/entities/tour';
import { TourPresenter } from './interfaces/TourPresenter';

export default class TourPresenterImpl implements TourPresenter {
  createDepartureTour = async (
    formData: CreateDepartureTourFormData,
  ) => createDepartureTourUseCase.invoke(formData);

  getAllToursTemplate = async () => getAllToursTemplateUseCase.invoke();

  getAllToursLocation = async () => getAllToursLocationUseCase.invoke();

  getAllDepartureTours = async () => getAllDepartureToursUseCase.invoke();

  takeCareTour = async (departureTourId: string) => takeCareTourUseCase.invoke(departureTourId);

  assignTourOperator = async (
    departureTourId: string,
    tourOperatorId: string,
  ) => assignTourOperator.invoke(departureTourId, tourOperatorId);
}
