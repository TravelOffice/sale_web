import { ApiRequestConfig } from './ApiRequestConfig';

export interface HTTPRequest {
  get: (url: string, config?: ApiRequestConfig) => Promise<any>,

  post: (url: string, data?: any, config?: ApiRequestConfig) => Promise<any>,

  put: (url: string, data?: any, config?: ApiRequestConfig) => Promise<any>,

  delete: (url: string, config?: ApiRequestConfig) => Promise<any>
}
