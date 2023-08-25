import { CreateTourLocationFormData, TourLocation } from '@domain/entities/tour';

export interface TourLocationPresenter {
  getAll: () => Promise<TourLocation[]>,
  create: (formData: CreateTourLocationFormData) => Promise<TourLocation>,
  update: (id: string, formData: CreateTourLocationFormData) => Promise<TourLocation>,
}
