import axios, { AxiosInstance } from 'axios';
import { toAxiosRequestConfig } from '@utils/ApiUtils';
import { HTTPRequest } from '../interfaces/HTTPRequest';
import { ApiRequestConfig } from '../interfaces/ApiRequestConfig';
import proxyResponseApi from './ApiUtils';

export default class UnauthorizedRequest implements HTTPRequest {
  private readonly axiosInstance: AxiosInstance;

  constructor(baseUrl: string) {
    this.axiosInstance = axios.create({
      baseURL: baseUrl,
    });
  }

  async get(url: string, config: ApiRequestConfig | undefined): Promise<any> {
    const response = await this.axiosInstance.get(url, toAxiosRequestConfig(config));
    return proxyResponseApi(response);
  }

  async post(url: string, data: any, config: ApiRequestConfig | undefined): Promise<any> {
    const response = await this.axiosInstance.post(url, data, toAxiosRequestConfig(config));
    return proxyResponseApi(response);
  }

  async put(url: string, data: any, config: ApiRequestConfig | undefined): Promise<any> {
    const response = await this.axiosInstance.put(url, data, toAxiosRequestConfig(config));
    return proxyResponseApi(response);
  }

  async delete(url: string, config: ApiRequestConfig | undefined): Promise<any> {
    const response = await this.axiosInstance.delete(url, toAxiosRequestConfig(config));
    return proxyResponseApi(response);
  }
}
