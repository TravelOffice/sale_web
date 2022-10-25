import { MailAccount } from '@domain/entities/mail/MailAccount';
import { MailSearchResult } from '@domain/entities/mail/MailSearchResult';

export interface SearchMailUseCase {
  query: (mailAccount: MailAccount, query: string) => Promise<MailSearchResult[]>
}
