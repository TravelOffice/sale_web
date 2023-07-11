import { Source } from '@domain/entities/source/Source';

export interface GetAllSourceUseCase {
  invoke: () => Promise<Source[]>
}
