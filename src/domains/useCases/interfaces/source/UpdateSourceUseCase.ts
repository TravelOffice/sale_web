import { Source, UpdateSourceFormData } from '@domain/entities/source/Source';

export interface UpdateSourceUseCase {
  invoke: (
    id: string,
    formData: UpdateSourceFormData,
  ) => Promise<Source>
}
