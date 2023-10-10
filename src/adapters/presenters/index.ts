import { UserPresenter } from '@adapter/presenters/interfaces/UserPresenter';
import UserPresenterImpl from '@adapter/presenters/UserPresenterImpl';
import { AccountConnectionPresenter } from '@adapter/presenters/interfaces/AccountConnectionPresenter';
import AccountConnectionPresenterImpl from '@adapter/presenters/AccountConnectionPresenterImpl';
import { ChatPresenter } from '@adapter/presenters/interfaces/ChatPresenter';
import ChatPresenterImpl from '@adapter/presenters/ChatPresenterImpl';
import { NotificationPresenter } from '@adapter/presenters/interfaces/NotificationPresenter';
import NotificationPresenterImpl from '@adapter/presenters/NotificationPresenterImpl';
import { MailPresenter } from '@adapter/presenters/interfaces/MailPresenter';
import MailPresenterImpl from '@adapter/presenters/MailPresenterImpl';
import { CustomerPresenter } from '@adapter/presenters/interfaces/CustomerPresenter';
import CustomerPresenterImpl from '@adapter/presenters/CustomerPresenterImpl';
import TourTemplatePresenterImpl from '@adapter/presenters/TourTemplatePresenterImpl';
import { TourTemplatePresenter } from '@adapter/presenters/interfaces/TourTemplatePresenter';
import { TourPresenter } from '@adapter/presenters/interfaces/TourPresenter';
import TourPresenterImpl from '@adapter/presenters/TourPresenterImpl';
import { BookingPresenter } from '@adapter/presenters/interfaces/BookingPresenter';
import BookingPresenterImpl from '@adapter/presenters/BookingPresenterImpl';
import { SourcePresenter } from '@adapter/presenters/interfaces/SourcePresenter';
import SourcePresenterImpl from '@adapter/presenters/SourcePresenterImpl';
import { SupplierPresenter } from '@adapter/presenters/interfaces/SupplierPresenter';
import SupplierPresenterImpl from '@adapter/presenters/SupplierPresenterImpl';
import { PaymentVoucherPresenter } from '@adapter/presenters/interfaces/PaymentVoucherPresenter';
import PaymentVoucherPresenterImpl from '@adapter/presenters/PaymentVoucherPresenterImpl';
import { TourLocationPresenter } from '@adapter/presenters/interfaces/TourLocationPresenter';
import TourLocationPresenterImpl from '@adapter/presenters/TourLocationPresenterImpl';
import { LeadPresenter } from './interfaces/LeadPresenter';
import LeadPresenterImpl from './LeadPresenterImpl';
import { RolePermissionPresenter } from './interfaces/RolePermissionPresenter';
import RolePermissionPresenterImpl from './RolePermissionPresenterImpl';
import { ReceiptPresenter } from './interfaces/ReceiptPresenter';
import ReceiptPresenterImpl from './ReceiptPresenterImpl';
import { MarketplaceStatisticPresenter } from './interfaces/MarketplaceStatisticPresenter';
import MarketplaceStatisticPresenterImpl from './MarketplaceStatisticImpl';
import { TravelStatisticPresenter } from './interfaces/TravelStatisticPresenter';
import TravelStatisticPresenterImpl from './TravelStatisticPresenterImpl';

interface Presenters {
  userPresenter: UserPresenter,
  rolePermissionPresenter: RolePermissionPresenter,
  chatPresenter: ChatPresenter,
  accountConnectionPresenter: AccountConnectionPresenter,
  leadPresenter: LeadPresenter,
  tourTemplatePresenter: TourTemplatePresenter,
  notificationPresenter: NotificationPresenter,
  mailPresenter: MailPresenter,
  customerPresenter: CustomerPresenter,
  tourPresenter: TourPresenter,
  bookingPresenter: BookingPresenter,
  sourcePresenter: SourcePresenter,
  receiptPresenter: ReceiptPresenter,
  supplierPresenter: SupplierPresenter,
  paymentVoucherPresenter: PaymentVoucherPresenter,
  tourLocationPresenter: TourLocationPresenter,
  marketplaceStatisticPresenter: MarketplaceStatisticPresenter,
  travelStatisticPresenter: TravelStatisticPresenter,
}

const presenters: Presenters = {
  userPresenter: new UserPresenterImpl(),
  rolePermissionPresenter: new RolePermissionPresenterImpl(),
  chatPresenter: new ChatPresenterImpl(),
  accountConnectionPresenter: new AccountConnectionPresenterImpl(),
  leadPresenter: new LeadPresenterImpl(),
  tourTemplatePresenter: new TourTemplatePresenterImpl(),
  notificationPresenter: new NotificationPresenterImpl(),
  mailPresenter: new MailPresenterImpl(),
  customerPresenter: new CustomerPresenterImpl(),
  tourPresenter: new TourPresenterImpl(),
  bookingPresenter: new BookingPresenterImpl(),
  sourcePresenter: new SourcePresenterImpl(),
  receiptPresenter: new ReceiptPresenterImpl(),
  supplierPresenter: new SupplierPresenterImpl(),
  paymentVoucherPresenter: new PaymentVoucherPresenterImpl(),
  tourLocationPresenter: new TourLocationPresenterImpl(),
  marketplaceStatisticPresenter: new MarketplaceStatisticPresenterImpl(),
  travelStatisticPresenter: new TravelStatisticPresenterImpl(),
};

export const {
  userPresenter,
  rolePermissionPresenter,
  chatPresenter,
  accountConnectionPresenter,
  leadPresenter,
  tourTemplatePresenter,
  notificationPresenter,
  mailPresenter,
  customerPresenter,
  tourPresenter,
  bookingPresenter,
  sourcePresenter,
  receiptPresenter,
  supplierPresenter,
  paymentVoucherPresenter,
  tourLocationPresenter,
  marketplaceStatisticPresenter,
  travelStatisticPresenter,
} = presenters;
