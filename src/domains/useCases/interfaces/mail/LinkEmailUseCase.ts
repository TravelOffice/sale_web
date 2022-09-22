import { LinkEmailFormData } from '@domain/entities/formData/LinkEmailFormData';
import { MailAccount } from '@domain/entities/mail/MailAccount';

export interface LinkEmailUseCase {
  invoke: (formData: LinkEmailFormData) => Promise<MailAccount>
}
