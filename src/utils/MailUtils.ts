import Images from '@themes/Images';
import { InboundSslMode, MailProviderType, OutboundSslMode } from '@domain/entities/mail/MailAccount';

export function getMailProviderLogo(provider: MailProviderType) {
  switch (provider) {
    case 'Gmail': return Images.icons.mails.gmailLogo;
    case 'Outlook': return Images.icons.mails.outlookLogo;
    case 'iCloud': return Images.icons.mails.iCloudLogo;
    case 'Yahoo': return Images.icons.mails.yahooLogo;
    default: return Images.icons.mails.mailLogo;
  }
}

export function getDefaultInboundPort(inboundProtocol: string, sslMode: InboundSslMode) {
  if (sslMode === 'SSL/TLS') {
    return inboundProtocol === 'IMAP' ? 993 : 995;
  } if (sslMode === 'STARTTLS') {
    return inboundProtocol === 'IMAP' ? 143 : 587;
  }
  // sslMode is None
  return inboundProtocol === 'IMAP' ? 143 : 110;
}

export function getDefaultOutboundPort(sslMode: OutboundSslMode) {
  if (sslMode === 'STARTTLS') {
    return 587;
  } if (sslMode === 'SSL/TLS') {
    return 465;
  }
  // sslMode is None
  return 25;
}
