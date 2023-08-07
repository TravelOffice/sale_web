import {
  assignTourOperator,
  createDepartureTourUseCase,
  createTourEstimationUseCase,
  deleteTourEstimationUseCase,
  getAllDepartureToursUseCase,
  getAllToursLocationUseCase,
  getAllToursTemplateUseCase,
  getBookingsOfDepartureTour,
  getDepartureTourUseCase,
  getPaymentVouchersOfTourUseCase,
  getTourEstimationsUseCase,
  takeCareTourUseCase,
  updateDepartureTourUseCase,
  updateTourEstimationUseCase,
} from '@domain/useCases';
import { CreateDepartureTourFormData, UpdateDepartureTourFormData } from '@domain/entities/tour';
import { CreateEstimationFormData, UpdateEstimationFormData } from '@domain/entities/tour/Estimation';
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
  ) => getTourEstimationsUseCase.invoke(departureTourId);

  createEstimation = async (
    tourId: string,
    formData: CreateEstimationFormData,
  ) => createTourEstimationUseCase.invoke(tourId, formData);

  updateEstimation = async (
    tourId: string,
    estimationId: string,
    formData: UpdateEstimationFormData,
  ) => updateTourEstimationUseCase.invoke(tourId, estimationId, formData);

  deleteEstimation = async (
    tourId: string,
    estimationId: string,
  ) => deleteTourEstimationUseCase.invoke(tourId, estimationId);

  getPaymentVouchersByTour = async (
    tourId: string,
  ) => getPaymentVouchersOfTourUseCase.invoke(tourId);
}
