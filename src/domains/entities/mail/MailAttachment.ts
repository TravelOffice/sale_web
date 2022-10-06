export interface MailAttachment {
  name: string,
  mimeType: string,
  path: string,
  size?: number, // In kb
  uploading: boolean,
  encoding: 'UTF-8'
}
