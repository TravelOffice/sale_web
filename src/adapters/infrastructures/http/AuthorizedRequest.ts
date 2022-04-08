import axios, { AxiosInstance } from 'axios';
import { toAxiosRequestConfig } from '@utils/ApiUtils';
import { store } from '@redux/store';
import { HTTPRequest } from '../interfaces/HTTPRequest';
import { ApiRequestConfig } from '../interfaces/ApiRequestConfig';

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
    return response.data;
  }

  async post(url: string, data: any, config: ApiRequestConfig | undefined): Promise<any> {
    const authorizedRequestConfig = await this.createAuthorizedConfigRequest(config);
    const axiosConfig = toAxiosRequestConfig(authorizedRequestConfig);
    const response = await this.axiosInstance.post(url, data, axiosConfig);
    return response.data;
  }

  async put(url: string, data: any, config: ApiRequestConfig | undefined): Promise<any> {
    const authorizedRequestConfig = await this.createAuthorizedConfigRequest(config);
    const axiosConfig = toAxiosRequestConfig(authorizedRequestConfig);
    const response = await this.axiosInstance.put(url, data, axiosConfig);
    return response.data;
  }

  async delete(url: string, config: ApiRequestConfig | undefined): Promise<any> {
    const authorizedRequestConfig = await this.createAuthorizedConfigRequest(config);
    const axiosConfig = toAxiosRequestConfig(authorizedRequestConfig);
    const response = await this.axiosInstance.delete(url, axiosConfig);
    return response.data;
  }
}
