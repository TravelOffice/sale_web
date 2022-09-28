import { SyncMailUseCase } from '@domain/useCases/interfaces/mail/SyncMailUseCase';
import { MailAccount } from '@domain/entities/mail/MailAccount';
import { mailRepository } from '@adapter/repositories';

export default class SyncMailUseCaseImpl implements SyncMailUseCase {
  invoke = async (mailAccounts: MailAccount[]) => mailRepository.syncEmail(mailAccounts);
}
