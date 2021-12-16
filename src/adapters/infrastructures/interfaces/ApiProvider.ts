import { HTTPRequest } from './HTTPRequest';

export default interface ApiProvider {

  authorizedRequest: HTTPRequest,

  unauthorizedRequest: HTTPRequest,
}
