import { SendMailFormData } from '@domain/entities/mail/SendMailFormData';
import { MailMessage } from '@domain/entities/mail/MailMessage';

export interface SendMailUseCase {
  invoke: (formData: SendMailFormData) => Promise<MailMessage>
}
