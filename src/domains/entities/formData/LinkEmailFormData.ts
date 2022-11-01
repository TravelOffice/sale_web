import {
  InboundSslMode, MailProtocol, OutboundSslMode,
} from '@domain/entities/mail/MailAccount';
import { MailServerAuthMethod } from '@domain/entities/mail/MailServer';

export interface LinkEmailFormData {
  type: 'auto' | 'manual',
  provider: string,
  name: string,
  email: string,
  protocol: MailProtocol,
  inboundHost: string,
  inboundPassword: string,
  inboundPort: number,
  inboundSslMode: InboundSslMode,
  inboundUser: string,
  outboundHost: string,
  outboundPassword: string,
  outboundPort: number,
  outboundSslMode: OutboundSslMode,
  outboundUser: string,
  authMethod: MailServerAuthMethod,
  oauthUrl: string,
  password: string,
  authorizationCode: string,
  authorizationState: string,
}
