import AuthorizedRequest from './http/AuthorizedRequest';
import UnauthorizedRequest from './http/UnauthorizedRequest';
import ApiProvider from './interfaces/ApiProvider';

export default class ApiProviderImpl implements ApiProvider {
  private baseUrl = process.env.REACT_APP_BASE_URL || '';

  authorizedRequest = new AuthorizedRequest(this.baseUrl);

  unauthorizedRequest = new UnauthorizedRequest(this.baseUrl);
}
