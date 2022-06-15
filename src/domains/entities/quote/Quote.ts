export type QuoteStatus = 'INITIALIZED' | 'ON_DISCUSSION' | 'REJECTED' | 'APPROVED';

export interface Quote {
  createdAt: string,
  updatedAt: string,
  title: string,
  description: string,
  status: QuoteStatus,
  children: number,
  adults: number,
  quotePdfFileName?: string,
  quotePdfFileUrl?: string
}
