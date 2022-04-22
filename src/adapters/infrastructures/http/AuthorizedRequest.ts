import { store } from '@redux/store';
import { toAxiosRequestConfig } from '@utils/ApiUtils';
import axios, { AxiosInstance } from 'axios';
import { HTTPRequest } from '../interfaces/HTTPRequest';
import { ApiRequestConfig } from '../interfaces/ApiRequestConfig';
import proxyResponseApi from './ApiUtils';

export default class AuthorizedRequest implements HTTPRequest {
  private readonly axiosInstance: AxiosInstance;

  constructor(baseUrl: string) {
    this.axiosInstance = axios.create({
      baseURL: baseUrl,
    });
  }

  createAuthorizedConfigRequest = async (
    config?: ApiRequestConfig,
  ) : Promise<ApiRequestConfig> => ({
    ...config,
    headers: {
      Authorization: store.getState().auth?.idToken,
    },
  });

  async get(url: string, config: ApiRequestConfig | undefined): Promise<any> {
    const authorizedRequestConfig = await this.createAuthorizedConfigRequest(config);
    const axiosConfig = toAxiosRequestConfig(authorizedRequestConfig);
    const response = await this.axiosInstance.get(url, axiosConfig);
    return proxyResponseApi(response);
  }

  async post(url: string, data: any, config: ApiRequestConfig | undefined): Promise<any> {
    const authorizedRequestConfig = await this.createAuthorizedConfigRequest(config);
    const axiosConfig = toAxiosRequestConfig(authorizedRequestConfig);
    const response = await this.axiosInstance.post(url, data, axiosConfig);
    return proxyResponseApi(response);
  }

  async put(url: string, data: any, config: ApiRequestConfig | undefined): Promise<any> {
    const authorizedRequestConfig = await this.createAuthorizedConfigRequest(config);
    const axiosConfig = toAxiosRequestConfig(authorizedRequestConfig);
    const response = await this.axiosInstance.put(url, data, axiosConfig);
    return proxyResponseApi(response);
  }

  async delete(url: string, config: ApiRequestConfig | undefined): Promise<any> {
    const authorizedRequestConfig = await this.createAuthorizedConfigRequest(config);
    const axiosConfig = toAxiosRequestConfig(authorizedRequestConfig);
    const response = await this.axiosInstance.delete(url, axiosConfig);
    return proxyResponseApi(response);
  }
}
