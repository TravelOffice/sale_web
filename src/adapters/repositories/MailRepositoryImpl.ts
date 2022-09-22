import { MailRepository } from '@adapter/repositories/interfaces/MailRepository';
import { LinkEmailFormData } from '@domain/entities/formData/LinkEmailFormData';
import { mailApiProvider } from '@adapter/infrastructures';
import { MailAccount } from '@domain/entities/mail/MailAccount';

export default class MailRepositoryImpl implements MailRepository {
  link = async (formData: LinkEmailFormData) => mailApiProvider.authorizedRequest.post<MailAccount>('/link-email', formData)
}
