import { CreateSourceFormData, Source } from '@domain/entities/source/Source';

export interface CreateSourceUseCase {
  invoke: (formData: CreateSourceFormData) => Promise<Source>
}
