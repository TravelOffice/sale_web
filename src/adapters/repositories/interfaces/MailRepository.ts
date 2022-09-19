import { LinkEmailFormData } from '@domain/entities/formData/LinkEmailFormData';
import { MailAccount } from '@domain/entities/mail/MailAccount';

export interface MailRepository {
  link: (formData: LinkEmailFormData) => Promise<MailAccount>,
}
