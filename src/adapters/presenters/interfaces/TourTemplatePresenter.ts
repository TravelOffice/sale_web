import { CreateTourTemplateFormData, TourTemplate } from '@domain/entities/tour/TourTemplate';

export interface TourTemplatePresenter {
  addTourTemplate: (tourTemplate: CreateTourTemplateFormData) => Promise<TourTemplate>;
  getTourTemplate: (tourTemplateId: string) => Promise<TourTemplate>;
  updateTourTemplate: (tourTemplateId: string, tourTemplate: TourTemplate) => Promise<TourTemplate>;
  getAllTourTemplates: () => Promise<TourTemplate[]>
}
