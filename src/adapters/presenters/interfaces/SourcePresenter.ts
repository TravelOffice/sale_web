import { CreateSourceFormData, Source, UpdateSourceFormData } from '@domain/entities/source/Source';

export interface SourcePresenter {
  getAll: () => Promise<Source[]>,
  get: (id: string) => Promise<Source | undefined>,
  create: (formData: CreateSourceFormData) => Promise<Source>,
  update: (formData: UpdateSourceFormData) => Promise<Source>,
  delete: (id: string) => Promise<void>,
}
