import { TourLocationPresenter } from '@adapter/presenters/interfaces/TourLocationPresenter';
import {
  createTourLocationUseCase,
  getTourLocationListUseCase,
  updateTourLocationUseCase,
} from '@domain/useCases/tourLocation';
import { CreateTourLocationFormData, UpdateTourLocationFormData } from '@domain/entities/tour';

export default class TourLocationPresenterImpl implements TourLocationPresenter {
  getAll = async () => getTourLocationListUseCase.invoke();

  create = async (
    formData: CreateTourLocationFormData,
  ) => createTourLocationUseCase.invoke(formData);

  update = async (
    id: string,
    formData: UpdateTourLocationFormData,
  ) => updateTourLocationUseCase.invoke(id, formData);
}
