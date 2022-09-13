export const mailProtocols = ['POP3', 'IMAP'] as const;

export type MailProtocol = typeof mailProtocols[number];

export const inboundSslModes = ['None', 'SSL/TLS', 'STARTTLS'] as const;

export type InboundSslMode = typeof inboundSslModes[number];

export const pop3InboundTypes = ['POP3', 'POP3S'] as const;

export type POP3InboundType = typeof pop3InboundTypes[number];

export const imapInboundTypes = ['IMAP', 'IMAPS'] as const;

export type IMAPInboundType = typeof imapInboundTypes[number];

export const inboundTypes = [...pop3InboundTypes, ...imapInboundTypes] as const;

export type InboundType = typeof inboundTypes[number];

export type OutboundSslMode = InboundSslMode;

export const mailProviders = ['Gmail', 'Outlook', 'iCloud', 'Yahoo', 'Other'] as const;

export type MailProviderType = typeof mailProviders[number];

export interface MailAccount {
  name: string,
  email: string,
  protocol: MailProtocol,
  provider: MailProviderType,
}
