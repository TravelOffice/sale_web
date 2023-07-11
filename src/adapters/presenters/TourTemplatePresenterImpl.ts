import { TourTemplate } from '@domain/entities/TourTemplate';
import {
  addTourTemplateUseCase, getAllTourTemplatesUseCase,
  getTourTemplateUseCase, updateTourTemplateUseCase,
} from '@domain/useCases';
import { TourTemplatePresenter } from './interfaces/TourTemplatePresenter';

export default class TourTemplatePresenterImpl implements TourTemplatePresenter {
    getAllTourTemplates = async () => getAllTourTemplatesUseCase.invoke();

    getTourTemplate = async (
      tourTemplateId: string,
    ) => getTourTemplateUseCase.invoke(tourTemplateId);

    addTourTemplate = async (payload: TourTemplate) => addTourTemplateUseCase.invoke(payload);

    updateTourTemplate = async (
      tourTemplateId: string,
      formData: TourTemplate,
    ) => updateTourTemplateUseCase.invoke(tourTemplateId, formData);
}
