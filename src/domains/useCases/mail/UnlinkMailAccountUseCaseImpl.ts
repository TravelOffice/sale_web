import { UnlinkMailAccountUseCase } from '@domain/useCases/interfaces/mail/UnlinkMailAccountUseCase';
import { MailAccount } from '@domain/entities/mail/MailAccount';
import { mailRepository } from '@adapter/repositories';

export default class UnlinkMailAccountUseCaseImpl implements UnlinkMailAccountUseCase {
  invoke = async (mailAccount: MailAccount) => mailRepository.unlinkMailAccount(mailAccount);
}
