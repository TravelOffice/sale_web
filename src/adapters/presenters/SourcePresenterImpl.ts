import {
  createSourceUseCase, deleteSourceUseCase, getAllSourceUseCase,
  getSourceUseCase, updateSourceUseCase,
} from '@domain/useCases/source';
import { CreateSourceFormData, UpdateSourceFormData } from '@domain/entities/source/Source';
import { SourcePresenter } from './interfaces/SourcePresenter';

export default class SourcePresenterImpl implements SourcePresenter {
  getAll = async () => getAllSourceUseCase.invoke();

  get = async (id: string) => getSourceUseCase.invoke(id);

  create = async (formData: CreateSourceFormData) => createSourceUseCase.invoke(formData);

  update = async (formData: UpdateSourceFormData) => updateSourceUseCase.invoke(formData);

  delete = async (id: string) => deleteSourceUseCase.invoke(id);
}
