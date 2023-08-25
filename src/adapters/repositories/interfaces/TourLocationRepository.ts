import { CreateTourLocationFormData, TourLocation, UpdateTourLocationFormData } from '@domain/entities/tour';

export interface TourLocationRepository {
  getAll: () => Promise<TourLocation[]>,
  getOne: (id: string) => Promise<TourLocation | undefined>,
  create: (formData: CreateTourLocationFormData) => Promise<TourLocation>,
  update: (id: string, formData: UpdateTourLocationFormData) => Promise<TourLocation>,
  delete: (id: string) => Promise<void>,
}
