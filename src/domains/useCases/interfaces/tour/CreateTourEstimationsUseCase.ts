import { CreateEstimationFormData, Estimation } from '@domain/entities/tour/Estimation';

export interface CreateTourEstimationsUseCase {
  invoke: (departureTourId: string, formData: CreateEstimationFormData) => Promise<Estimation>
}
