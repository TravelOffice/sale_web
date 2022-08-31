export const mailProtocols = ['pop3', 'imap'] as const;

export type MailProtocol = typeof mailProtocols[number];

export const inboundSslModes = ['none', 'ssl/tls', 'starttls'] as const;

export type InboundSslMode = typeof inboundSslModes[number];

export const pop3InboundTypes = ['pop3', 'pop3s'] as const;

export type POP3InboundType = typeof pop3InboundTypes[number];

export const imapInboundTypes = ['imap', 'imaps'] as const;

export type IMAPInboundType = typeof imapInboundTypes[number];

export const inboundTypes = [...pop3InboundTypes, ...imapInboundTypes] as const;

export type InboundType = typeof inboundTypes[number];

export type OutboundSslMode = InboundSslMode;

export const mailProviders = ['Gmail', 'Outlook', 'iCloud', 'Yahoo', 'Other'] as const;

export type MailProviderType = typeof mailProviders[number];

export interface MailAccount {
  name: string,
  email: string,
  provider: MailProviderType,
}
