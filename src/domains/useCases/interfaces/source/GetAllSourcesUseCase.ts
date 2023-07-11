import { Source } from '@domain/entities/source/Source';

export interface GetAllSourcesUseCase {
  invoke: () => Promise<Source[]>
}
