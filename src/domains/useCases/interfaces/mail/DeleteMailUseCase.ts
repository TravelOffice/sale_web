import { DeleteMailRequest } from '@domain/entities/mail/DeleteMailRequest';

export interface DeleteMailUseCase {
  invoke: (request: DeleteMailRequest) => Promise<void>
}
