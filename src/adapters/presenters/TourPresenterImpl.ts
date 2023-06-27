import {
  createDepartureTourUseCase,
  getAllToursLocationUseCase,
  getAllToursTemplateUseCase,
} from '@domain/useCases';
import { DepartureTour } from '@domain/entities/tour';
import { TourPresenter } from './interfaces/TourPresenter';

export default class TourPresenterImpl implements TourPresenter {
    createDepartureTour = async (
      departureTour: DepartureTour,
    ) => createDepartureTourUseCase.invoke(departureTour);

    getAllToursTemplate = async () => getAllToursTemplateUseCase.invoke();

    getAllToursLocation = async () => getAllToursLocationUseCase.invoke();
}
