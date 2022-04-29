import { AxiosResponse } from 'axios';
import ApiRequestResult from './ApiRequestResult';

const proxyResponseApi = (response: AxiosResponse<any, any>): any => {
  const responseMessage = response.data.message as ApiRequestResult;
  if (responseMessage === ApiRequestResult.FAILED) { throw new Error(response.data.hint); }
  return response.data;
};

export default proxyResponseApi;
