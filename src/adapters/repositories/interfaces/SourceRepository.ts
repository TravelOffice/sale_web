import { CreateSourceFormData, Source, UpdateSourceFormData } from '@domain/entities/source/Source';

export interface SourceRepository {
  getAll: () => Promise<Source[]>,
  getOne: (id: string) => Promise<Source | undefined>,
  create: (formData: CreateSourceFormData) => Promise<Source>,
  update: (formData: UpdateSourceFormData) => Promise<Source>,
  delete: (id: string) => Promise<void>,
}
