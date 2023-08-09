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
import { CreateTourPlanActivityFormData, DailyKey, TourPlan } from '@domain/entities/tour/TourPlan';
import {
  addTourPlanActivityUseCase, deleteTourPlanActivityUseCase,
  getTourPlanUseCase,
  updateTourPlanActivityUseCase,
} from '@domain/useCases/tourOperation';
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

  addTourPlanActivity = async (
    tourId: string,
    currentTourPlan: TourPlan,
    formData: CreateTourPlanActivityFormData,
  ) => addTourPlanActivityUseCase.invoke(tourId, currentTourPlan, formData);

  getTourPlan = async (tourId: string) => getTourPlanUseCase.invoke(tourId);

  updateTourPlanActivity = async (
    tourId: string,
    currentTourPlan: TourPlan,
    formData: CreateTourPlanActivityFormData,
  ) => updateTourPlanActivityUseCase.invoke(tourId, currentTourPlan, formData);

  deleteTourPlanActivity = async (
    tourId: string,
    currentTourPlan: TourPlan,
    day: DailyKey,
    activityId: string,
  ) => deleteTourPlanActivityUseCase.invoke(tourId, currentTourPlan, day, activityId);
}
