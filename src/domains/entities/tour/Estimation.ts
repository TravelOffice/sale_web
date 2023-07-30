import { Supplier } from '@domain/entities/supplier';
import { ServiceType } from './Supplier';

export const vatStatuses = [
  'VAT_NONE',
  'VAT_INCLUDED',
  'NO_INVOICE',
];

export type VatStatus = typeof vatStatuses[number];

export const payerTypes = [
  'ORGANIZATION',
  'TOUR_GUIDE',
];

export type PayerTypes = typeof payerTypes[number];

export interface Estimation {
  code: string,
  name: string,
  tourId: string,
  supplierServiceType: ServiceType,
  payer: PayerTypes,
  estimatedPrice: number,
  estimatedQuantity: number,
  actualPrice: number,
  actualQuantity: number,
  note: string,
  vat: number,
  vatStatus: VatStatus,
  readonly createdAt: number,
  readonly updatedAt: number,
  readonly creatorId: string,
  readonly creatorName: string,

  // Related datas
  supplierId: string,
  supplier?: Supplier,
}
