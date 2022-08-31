import { MailMessageList } from '@domain/entities/mail/MailMessageList';

export interface GetMailMessagesUseCase {
  invoke: (mailAccount: string, mailbox: string) => Promise<MailMessageList>
}
