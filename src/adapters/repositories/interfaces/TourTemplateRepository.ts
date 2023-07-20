import { CreateTourTemplateFormData, TourTemplate, UpdateTourTemplateFormData } from '@domain/entities/tour';

export interface TourTemplateRepository {
  addTourTemplate(tourTemplate: CreateTourTemplateFormData): Promise<TourTemplate>;

  updateTourTemplate(
    tourTemplateId: string,
    ourTemplate: UpdateTourTemplateFormData,
  ): Promise<TourTemplate>;

  getTourTemplate(tourTemplateId: string): Promise<TourTemplate>;

  getAllTourTemplates(): Promise<TourTemplate[]>;
}
