import {
  createDepartureTourUseCase,
  getAllDepartureToursUseCase,
  getAllToursLocationUseCase,
  getAllToursTemplateUseCase,
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
}
