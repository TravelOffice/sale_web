import { MailAccount } from '@domain/entities/mail/MailAccount';
import { SearchMailUseCase } from '@domain/useCases/interfaces/mail/SearchMailUseCase';
import { mailRepository } from '@adapter/repositories';

export default class SearchMailUseCaseImpl implements SearchMailUseCase {
  query = async (mailAccount: MailAccount, query: string) => {
    const indexUid = mailAccount.searchIndex;
    return mailRepository.search(indexUid, query);
  }
}
