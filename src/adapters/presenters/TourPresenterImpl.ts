import {
  assignTourOperator,
  createDepartureTourUseCase,
  getAllDepartureToursUseCase,
  getAllToursLocationUseCase,
  getAllToursTemplateUseCase,
  getBookingsOfDepartureTour,
  getDepartureTourUseCase,
  getEstimationsUseCase,
  takeCareTourUseCase,
  updateDepartureTourUseCase,
} from '@domain/useCases';
import { CreateDepartureTourFormData, UpdateDepartureTourFormData } from '@domain/entities/tour';
import { TourPresenter } from './interfaces/TourPresenter';

export default class TourPresenterImpl implements TourPresenter {
  createDepartureTour = async (
    formData: CreateDepartureTourFormData,
  ) => createDepartureTourUseCase.invoke(formData);

  updateDepartureTour = async (
    tourId: string,
    formData: UpdateDepartureTourFormData,
  ) => updateDepartureTourUseCase.invoke(tourId, formData);

  getDepartureTour = async (
    tourId: string,
  ) => getDepartureTourUseCase.invoke(tourId);

  getAllToursTemplate = async () => getAllToursTemplateUseCase.invoke();

  getAllToursLocation = async () => getAllToursLocationUseCase.invoke();

  getAllDepartureTours = async () => getAllDepartureToursUseCase.invoke();

  takeCareTour = async (departureTourId: string) => takeCareTourUseCase.invoke(departureTourId);

  assignTourOperator = async (
    departureTourId: string,
    tourOperatorId: string,
  ) => assignTourOperator.invoke(departureTourId, tourOperatorId);

  getBookingsByDepartureTour = async (
    departureTourId: string,
  ) => getBookingsOfDepartureTour.invoke(departureTourId);

  getEstimations = async (
    departureTourId: string,
  ) => getEstimationsUseCase.invoke(departureTourId);
}
