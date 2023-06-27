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
import { LeadPresenter } from './interfaces/LeadPresenter';
import LeadPresenterImpl from './LeadPresenterImpl';
import { RolePermissionPresenter } from './interfaces/RolePermissionPresenter';
import RolePermissionPresenterImpl from './RolePermissionPresenterImpl';

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
} = presenters;
