import { SupplierServiceType } from './SupplierServiceType';
import { Quote } from './Quote';
import { PaymentInfo } from './PaymentInfo';
import { Contact } from './Contact';

export interface Supplier {
  readonly code: string;
  name: string;
  brandName: string;
  establishmentYear: number;
  starRating: number;
  capacity: number;
  services: Array<SupplierServiceType>;
  city: string;
  district: string;
  address: string;
  taxId: string;
  note: string;
  quotes: Array<Quote>;
  paymentInfo: Array<PaymentInfo>;
  contacts: Array<Contact>;
  readonly creatorId: string;
  readonly creatorName: string;
}

export type CreateSupplierFormData = Pick<Supplier,
'name' |
'brandName' |
'establishmentYear' |
'starRating' |
'capacity' |
'services' |
'city' |
'district' |
'address' |
'taxId' |
'note' |
'quotes' |
'paymentInfo' |
'contacts'
>;

export type UpdateSupplierFormData = CreateSupplierFormData;
