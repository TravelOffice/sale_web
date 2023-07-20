import { CreateTourTemplateFormData, UpdateTourTemplateFormData } from '@domain/entities/tour/TourTemplate';
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
    formData: UpdateTourTemplateFormData,
  ) => updateTourTemplateUseCase.invoke(tourTemplateId, formData);
}
