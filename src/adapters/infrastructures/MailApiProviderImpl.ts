import ApiProvider from '@adapter/infrastructures/interfaces/ApiProvider';
import AuthorizedRequest from '@adapter/infrastructures/http/AuthorizedRequest';
import UnauthorizedRequest from '@adapter/infrastructures/http/UnauthorizedRequest';
import { MailApiResponse } from '@adapter/infrastructures/http/MailApiResponse';
import { AxiosResponse } from 'axios';
import MailApiError from '@adapter/exceptions/MailApiError';

export default class MailApiProviderImpl implements ApiProvider {
  private baseUrl = process.env.REACT_APP_MAIL_API_ENDPOINT || '';

  private responseMiddleware = (response: AxiosResponse) => {
    const mailApiResponse = response.data as MailApiResponse<any>;
    if (mailApiResponse.code.startsWith('ERROR_')) {
      throw new MailApiError(mailApiResponse.code, mailApiResponse.message, response.config);
    }
    return mailApiResponse.data!;
  }

  authorizedRequest = new AuthorizedRequest(this.baseUrl, true, this.responseMiddleware);

  unauthorizedRequest = new UnauthorizedRequest(this.baseUrl);
}
