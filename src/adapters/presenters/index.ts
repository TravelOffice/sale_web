import { UserPresenter } from '@adapter/presenters/interfaces/UserPresenter';
import UserPresenterImpl from '@adapter/presenters/UserPresenterImpl';
import { AccountConnectionPresenter } from '@adapter/presenters/interfaces/AccountConnectionPresenter';
import AccountConnectionPresenterImpl from '@adapter/presenters/AccountConnectionPresenterImpl';
import { ChatPresenter } from '@adapter/presenters/interfaces/ChatPresenter';
import ChatPresenterImpl from '@adapter/presenters/ChatPresenterImpl';
import { NotificationPresenter } from '@adapter/presenters/interfaces/NotificationPresenter';
import NotificationPresenterImpl from '@adapter/presenters/NotificationPresenterImpl';
import { LeadPresenter } from './interfaces/LeadPresenter';
import LeadPresenterImpl from './LeadPresenterImpl';
import { OpportunityPresenter } from './interfaces/OpportunityPresenter';
import OpportunityPresenterImpl from './OpportunityPresenterImpl';
import { CustomerPresenter } from './interfaces/CustomerPresenter';
import CustomerPresenterImpl from './CustomerPresenterImpl';

interface Presenters {
  userPresenter: UserPresenter,
  chatPresenter: ChatPresenter,
  accountConnectionPresenter: AccountConnectionPresenter,
  leadPresenter: LeadPresenter,
  opportunityPresenter: OpportunityPresenter,
  customerPresenter: CustomerPresenter,
  notificationPresenter: NotificationPresenter,
}

const presenters: Presenters = {
  userPresenter: new UserPresenterImpl(),
  chatPresenter: new ChatPresenterImpl(),
  accountConnectionPresenter: new AccountConnectionPresenterImpl(),
  leadPresenter: new LeadPresenterImpl(),
  opportunityPresenter: new OpportunityPresenterImpl(),
  customerPresenter: new CustomerPresenterImpl(),
  notificationPresenter: new NotificationPresenterImpl(),
};

export const {
  userPresenter,
  chatPresenter,
  accountConnectionPresenter,
  leadPresenter,
  opportunityPresenter,
  customerPresenter,
  notificationPresenter,
} = presenters;
