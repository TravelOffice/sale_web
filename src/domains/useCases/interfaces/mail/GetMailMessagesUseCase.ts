import { MailMessageList } from '@domain/entities/mail/MailMessageList';

export interface GetMailMessagesUseCase {
  invoke: (mailAccount: string, mailbox: string, nextToken?: string) => Promise<MailMessageList>
}
