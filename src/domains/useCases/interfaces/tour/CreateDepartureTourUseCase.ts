import { CreateDepartureTourFormData, DepartureTour } from '@domain/entities/tour';

export interface CreateDepartureTourUseCase {
  invoke: (formData: CreateDepartureTourFormData) => Promise<DepartureTour>
}
