import { CreateTourTemplateFormData, TourTemplate, UpdateTourTemplateFormData } from '@domain/entities/tour/TourTemplate';

export interface TourTemplatePresenter {
  addTourTemplate: (tourTemplate: CreateTourTemplateFormData) => Promise<TourTemplate>;
  getTourTemplate: (tourTemplateId: string) => Promise<TourTemplate>;
  updateTourTemplate: (
    tourTemplateId: string,
    formData: UpdateTourTemplateFormData,
  ) => Promise<TourTemplate>;
  getAllTourTemplates: () => Promise<TourTemplate[]>
}
