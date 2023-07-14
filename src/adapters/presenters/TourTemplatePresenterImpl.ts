import { CreateTourTemplateFormData, TourTemplate } from '@domain/entities/tour/TourTemplate';
import {
  addTourTemplateUseCase,
  getAllTourTemplatesUseCase,
  getTourTemplateUseCase,
  updateTourTemplateUseCase,
} from '@domain/useCases';
import { TourTemplatePresenter } from './interfaces/TourTemplatePresenter';

export default class TourTemplatePresenterImpl implements TourTemplatePresenter {
  getAllTourTemplates = async () => getAllTourTemplatesUseCase.invoke();

  getTourTemplate = async (
    tourTemplateId: string,
  ) => getTourTemplateUseCase.invoke(tourTemplateId);

  addTourTemplate = async (
    payload: CreateTourTemplateFormData,
  ) => addTourTemplateUseCase.invoke(payload);

  updateTourTemplate = async (
    tourTemplateId: string,
    formData: TourTemplate,
  ) => updateTourTemplateUseCase.invoke(tourTemplateId, formData);
}
