import { SendMailFormData } from '@domain/entities/mail/SendMailFormData';
import { MailMessage } from '@domain/entities/mail/MailMessage';

export interface DraftMailUseCase {
  invoke: (formData: SendMailFormData) => Promise<MailMessage>
}
