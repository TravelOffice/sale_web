import { TourTemplate } from '@domain/entities/TourTemplate';

export interface TourTemplatePresenter {
  addTourTemplate: (tourTemplate: TourTemplate) => Promise<TourTemplate>;
  getTourTemplate: (tourTemplateId: string) => Promise<TourTemplate>;
  updateTourTemplate: (tourTemplate: TourTemplate) => Promise<TourTemplate>;
  getAllTourTemplates: () => Promise<TourTemplate[]>
}
