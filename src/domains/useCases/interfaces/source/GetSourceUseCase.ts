import { Source } from '@domain/entities/source/Source';

export interface GetSourceUseCase {
  invoke: (id: string) => Promise<Source | undefined>
}
