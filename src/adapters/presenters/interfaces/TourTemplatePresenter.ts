import { TourTemplate } from '@domain/entities/TourTemplate';

export interface TourTemplatePresenter {
  addTourTemplate: (tourTemplate: TourTemplate) => Promise<TourTemplate>;
  getTourTemplate: (tourTemplateId: string) => Promise<TourTemplate>;
  updateTourTemplate: (tourTemplateId: string, tourTemplate: TourTemplate) => Promise<TourTemplate>;
  getAllTourTemplates: () => Promise<TourTemplate[]>
}
