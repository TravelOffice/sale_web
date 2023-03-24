import { AutoLinkEmailRequest } from '@domain/entities/mail/AutoLinkEmailRequest';
import { MailAccount } from '@domain/entities/mail/MailAccount';

export interface AutoLinkEmailUseCase {
  invoke: (request: AutoLinkEmailRequest) => Promise<MailAccount>
}
