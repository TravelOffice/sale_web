import { store } from '@redux/store';
import { toAxiosRequestConfig } from '@utils/ApiUtils';
import axios, { AxiosInstance } from 'axios';
import { ResponseMiddleware } from '@adapter/infrastructures/http/ResponseMiddleware';
import { HTTPRequest } from '../interfaces/HTTPRequest';
import { ApiRequestConfig } from '../interfaces/ApiRequestConfig';
import proxyResponseApi from './ApiUtils';

export default class AuthorizedRequest implements HTTPRequest {
  private readonly axiosInstance: AxiosInstance;

  private readonly useBearer: boolean;

  private readonly responseMiddleware: ResponseMiddleware;

  constructor(baseUrl: string, useBearer?: boolean, responseMiddleware?: ResponseMiddleware) {
    this.useBearer = useBearer || false;
    this.responseMiddleware = responseMiddleware || proxyResponseApi;
    this.axiosInstance = axios.create({
      baseURL: baseUrl,
    });
  }

  createAuthorizedConfigRequest = async (
    config?: ApiRequestConfig,
  ) : Promise<ApiRequestConfig> => ({
    ...config,
    headers: {
      Authorization: this.useBearer ? `Bearer ${store.getState().auth?.idToken}` : store.getState().auth?.idToken,
    },
  });

  async get<R = any>(url: string, config?: ApiRequestConfig): Promise<any> {
    const authorizedRequestConfig = await this.createAuthorizedConfigRequest(config);
    const axiosConfig = toAxiosRequestConfig(authorizedRequestConfig);
    const response = await this.axiosInstance.get(url, axiosConfig);
    return this.responseMiddleware<R>(response);
  }

  async post<R = any>(url: string, data: any, config?: ApiRequestConfig): Promise<any> {
    const authorizedRequestConfig = await this.createAuthorizedConfigRequest(config);
    const axiosConfig = toAxiosRequestConfig(authorizedRequestConfig);
    const response = await this.axiosInstance.post<R>(url, data, axiosConfig);
    return this.responseMiddleware(response);
  }

  async put<R = any>(url: string, data: any, config?: ApiRequestConfig): Promise<any> {
    const authorizedRequestConfig = await this.createAuthorizedConfigRequest(config);
    const axiosConfig = toAxiosRequestConfig(authorizedRequestConfig);
    const response = await this.axiosInstance.put<R>(url, data, axiosConfig);
    return this.responseMiddleware(response);
  }

  async delete<R = any>(url: string, config?: ApiRequestConfig): Promise<any> {
    const authorizedRequestConfig = await this.createAuthorizedConfigRequest(config);
    const axiosConfig = toAxiosRequestConfig(authorizedRequestConfig);
    const response = await this.axiosInstance.delete<R>(url, axiosConfig);
    return this.responseMiddleware(response);
  }
}
