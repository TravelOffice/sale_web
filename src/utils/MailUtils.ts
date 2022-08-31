import Images from '@themes/Images';
import {
  InboundSslMode, MailProtocol, MailProviderType, OutboundSslMode,
} from '@domain/entities/mail/MailAccount';
import i18n from 'i18next';

export const mailProtocolLabels: Record<MailProtocol, string> = {
  imap: 'IMAP',
  pop3: 'POP3',
};

export const mailSslModeLabels: Record<InboundSslMode, string> = {
  none: i18n.t('COMMON.NONE'),
  'ssl/tls': 'SSL/TLS',
  starttls: 'STARTTLS',
};

export const mailFlags = {
  answered: '\\Answered',
  deleted: '\\Deleted',
  draft: '\\Draft',
  recent: '\\Recent',
  seen: '\\Seen',
};

export function getMailProviderLogo(provider: MailProviderType) {
  switch (provider) {
    case 'Gmail': return Images.icons.mails.gmailLogo;
    case 'Outlook': return Images.icons.mails.outlookLogo;
    case 'iCloud': return Images.icons.mails.iCloudLogo;
    case 'Yahoo': return Images.icons.mails.yahooLogo;
    default: return Images.icons.mails.mailLogo;
  }
}

export function getDefaultInboundPort(inboundProtocol: MailProtocol, sslMode: InboundSslMode) {
  if (sslMode === 'ssl/tls') {
    return inboundProtocol === 'imap' ? 993 : 995;
  } if (sslMode === 'starttls') {
    return inboundProtocol === 'imap' ? 143 : 110;
  }
  // sslMode is None
  return inboundProtocol === 'imap' ? 143 : 110;
}

export function getDefaultOutboundPort(sslMode: OutboundSslMode) {
  if (sslMode === 'starttls') {
    return 587;
  } if (sslMode === 'ssl/tls') {
    return 465;
  }
  // sslMode is None
  return 25;
}
