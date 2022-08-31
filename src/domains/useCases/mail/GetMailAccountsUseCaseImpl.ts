import { GetMailAccountsUseCase } from '@domain/useCases/interfaces/mail/GetMailAccountsUseCase';
import { mailRepository } from '@adapter/repositories';

export default class GetMailAccountsUseCaseImpl implements GetMailAccountsUseCase {
  invoke = async () => mailRepository.getMailAccounts();
}
