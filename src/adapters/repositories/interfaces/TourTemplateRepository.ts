import { TourTemplate } from '@domain/entities/TourTemplate';

export interface TourTemplateRepository {
  addTourTemplate(tourTemplate: TourTemplate): Promise<TourTemplate>;
  updateTourTemplate(tourTemplateId: string, tourTemplate: TourTemplate): Promise<TourTemplate>;
  getTourTemplate(tourTemplateId: string): Promise<TourTemplate>;
  getAllTourTemplates(): Promise<TourTemplate[]>;
}
