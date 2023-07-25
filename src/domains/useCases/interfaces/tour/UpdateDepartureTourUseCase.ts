import { UpdateDepartureTourFormData, DepartureTour } from '@domain/entities/tour';

export interface UpdateDepartureTourUseCase {
  invoke: (tourId: string, formData: UpdateDepartureTourFormData) => Promise<DepartureTour>
}
