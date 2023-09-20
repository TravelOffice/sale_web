export interface PresignedUrl {
  key: string,
  url: string,
  cdn: string,
}

export enum PresignedUrlTypes {
  SUPPLIER_QUOTE_ATTACHMENT = 'SUPPLIER_QUOTE_ATTACHMENT',
}
