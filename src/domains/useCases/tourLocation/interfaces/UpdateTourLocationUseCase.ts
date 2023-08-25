import { TourLocation, UpdateTourLocationFormData } from '@domain/entities/tour/TourLocation';

export interface UpdateTourLocationUseCase {
  invoke: (id: string, formData: UpdateTourLocationFormData) => Promise<TourLocation>,
}
