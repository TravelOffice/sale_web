import { AuthPresenter } from '@adapter/presenters/interfaces/AuthPresenter';
import AuthPresenterImpl from '@adapter/presenters/AuthPresenterImpl';
import { UserPresenter } from '@adapter/presenters/interfaces/UserPresenter';
import UserPresenterImpl from '@adapter/presenters/UserPresenterImpl';

interface Presenters {
  authPresenter: AuthPresenter,
  userPresenter: UserPresenter,
}

const presenters: Presenters = {
  authPresenter: new AuthPresenterImpl(),
  userPresenter: new UserPresenterImpl(),
};

export const {
  authPresenter,
  userPresenter,
} = presenters;
