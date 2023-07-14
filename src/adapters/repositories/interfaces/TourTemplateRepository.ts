import { CreateTourTemplateFormData, TourTemplate } from '@domain/entities/tour';

export interface TourTemplateRepository {
  addTourTemplate(tourTemplate: CreateTourTemplateFormData): Promise<TourTemplate>;

  updateTourTemplate(tourTemplateId: string, tourTemplate: TourTemplate): Promise<TourTemplate>;

  getTourTemplate(tourTemplateId: string): Promise<TourTemplate>;

  getAllTourTemplates(): Promise<TourTemplate[]>;
}
