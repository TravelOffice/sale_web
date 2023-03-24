import { InboundSslMode, OutboundSslMode } from '@domain/entities/mail/MailAccount';

export type MailServerIncomingType = 'pop3' | 'imap';
export type MailServerAuthenticationMethod = 'password' | 'oauth2';
export interface MailServer {
  name: string,
  provider: string,
  domains: string[],
  incoming: {
    type: MailServerIncomingType,
    host: string,
    port: number,
    connection_security: InboundSslMode,
    authentication_method: MailServerAuthenticationMethod,
  },
  outgoing: {
    type: string,
    host: string,
    port: number,
    connection_security: OutboundSslMode,
    authentication_method: MailServerAuthenticationMethod,
  },
  oauthUrl?: string,
}
