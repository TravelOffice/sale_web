import { UserPresenter } from '@adapter/presenters/interfaces/UserPresenter';
import UserPresenterImpl from '@adapter/presenters/UserPresenterImpl';
import ChatPresenterImpl from './ChatPresenterImpl';
import { ChatPresenter } from './interfaces/ChatPresenter';

interface Presenters {
  userPresenter: UserPresenter,
  chatPresenter: ChatPresenter,
}

const presenters: Presenters = {
  userPresenter: new UserPresenterImpl(),
  chatPresenter: new ChatPresenterImpl(),
};

export const {
  userPresenter,
  chatPresenter,
} = presenters;
