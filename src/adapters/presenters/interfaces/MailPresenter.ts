import { LinkEmailFormData } from '@domain/entities/formData/LinkEmailFormData';
import { MailAccount } from '@domain/entities/mail/MailAccount';

export interface MailPresenter {
  linkMail: (formData: LinkEmailFormData) => Promise<MailAccount>
}
