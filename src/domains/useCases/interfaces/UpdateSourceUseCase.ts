import { Source, UpdateSourceFormData } from '@domain/entities/source/Source';

export interface UpdateSourceUseCase {
  invoke: (formData: UpdateSourceFormData) => Promise<Source>
}
