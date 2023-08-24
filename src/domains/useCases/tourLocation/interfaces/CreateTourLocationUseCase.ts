import { CreateTourLocationFormData, TourLocation } from '@domain/entities/tour/TourLocation';

export interface CreateTourLocationUseCase {
  invoke: (formData: CreateTourLocationFormData) => Promise<TourLocation>,
}
