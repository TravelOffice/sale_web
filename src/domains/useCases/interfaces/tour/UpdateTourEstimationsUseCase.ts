import { Estimation, UpdateEstimationFormData } from '@domain/entities/tour/Estimation';

export interface UpdateTourEstimationsUseCase {
  invoke: (
    departureTourId: string,
    estimationId: string, formData: UpdateEstimationFormData,
  ) => Promise<Estimation>
}
