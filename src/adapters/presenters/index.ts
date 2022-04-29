import { UserPresenter } from '@adapter/presenters/interfaces/UserPresenter';
import UserPresenterImpl from '@adapter/presenters/UserPresenterImpl';
import { AccountConnectionPresenter } from '@adapter/presenters/interfaces/AccountConnectionPresenter';
import AccountConnectionPresenterImpl from '@adapter/presenters/AccountConnectionPresenterImpl';
import { ChatPresenter } from '@adapter/presenters/interfaces/ChatPresenter';
import ChatPresenterImpl from '@adapter/presenters/ChatPresenterImpl';
import { LeadPresenter } from './interfaces/LeadPresenter';
import LeadPresenterImpl from './LeadPresenterImpl';
import { OpportunityPresenter } from './interfaces/OpportunityPresenter';
import OpportunityPresenterImpl from './OpportunityPresenterImpl';

interface Presenters {
  userPresenter: UserPresenter,
  chatPresenter: ChatPresenter,
  accountConnectionPresenter: AccountConnectionPresenter,
  leadPresenter: LeadPresenter,
  opportunityPresenter: OpportunityPresenter,
}

const presenters: Presenters = {
  userPresenter: new UserPresenterImpl(),
  chatPresenter: new ChatPresenterImpl(),
  accountConnectionPresenter: new AccountConnectionPresenterImpl(),
  leadPresenter: new LeadPresenterImpl(),
  opportunityPresenter: new OpportunityPresenterImpl(),
};

export const {
  userPresenter,
  chatPresenter,
  accountConnectionPresenter,
  leadPresenter,
  opportunityPresenter,
} = presenters;
