import { GetTourPlanUseCase } from '@domain/useCases/tourOperation/interfaces/GetTourPlanUseCase';
import { tourOperationRepository } from '@adapter/repositories';

export default class GetTourPlanUseCaseImpl implements GetTourPlanUseCase {
  invoke = async (tourId: string) => tourOperationRepository.getTourPlan(tourId);
}
