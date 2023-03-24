import {
  InboundSslMode, MailProtocol, MailProviderType, OutboundSslMode,
} from '@domain/entities/mail/MailAccount';

export interface LinkEmailFormData {
  provider: MailProviderType,
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
  password: string,
}
