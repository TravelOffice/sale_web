import Images from '@themes/Images';
import {
  InboundSslMode, MailProtocol, MailProviderType, OutboundSslMode,
} from '@domain/entities/mail/MailAccount';
import i18n from 'i18next';
import { MailAddress } from '@domain/entities/mail/MailAddress';
import { MailAttachment } from '@domain/entities/mail/MailAttachment';
import FileSaver from 'file-saver';

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

/**
 * Function to get display name
 * @param mailAddress
 */
export function getDisplayMailAddress(mailAddress: MailAddress) {
  let displayName = mailAddress.address;
  if (mailAddress.personal) {
    displayName += ` (${mailAddress.personal})`;
  }
  return displayName;
}

const extensionIcons = [
  { extensions: ['avi'], icon: Images.types.avi },
  { extensions: ['doc', 'docx'], icon: Images.types.doc },
  { extensions: ['gif'], icon: Images.types.gif },
  { extensions: ['jpg', 'jpeg'], icon: Images.types.jpg },
  { extensions: ['pdf'], icon: Images.types.pdf },
  { extensions: ['png'], icon: Images.types.png },
  { extensions: ['ppt', 'pptx'], icon: Images.types.ppt },
  { extensions: ['psd'], icon: Images.types.psd },
  { extensions: ['txt'], icon: Images.types.txt },
  { extensions: ['xls', 'xlsx'], icon: Images.types.xls },
  { extensions: ['zip'], icon: Images.types.zip },
];

/**
 * Function to get thumbnail icon of given file
 * @param filename
 */
export function getFileThumbnail(filename: string) {
  const fileExt = filename.split('.').pop();
  if (fileExt) {
    for (let i = 0; i < extensionIcons.length; i += 1) {
      if (extensionIcons[i].extensions.includes(fileExt)) {
        return extensionIcons[i].icon;
      }
    }
  }
  return Images.types.file;
}

/**
 * Function to download a mail attachment
 * @param attachment
 */
export function downloadAttachment(attachment: MailAttachment) {
  return new Promise((resolve) => {
    FileSaver.saveAs(attachment.path, attachment.name);
    resolve(undefined);
  });
}

export const MAXIMUM_ATTACHMENT_SIZE = 25 * 1024 * 1024;
