import { ApiRequestConfig } from './ApiRequestConfig';

export interface HTTPRequest {
  get: <R = any>(url: string, config?: ApiRequestConfig) => Promise<R>,

  post: <R = any>(url: string, data?: any, config?: ApiRequestConfig) => Promise<R>,

  put: <R = any>(url: string, data?: any, config?: ApiRequestConfig) => Promise<R>,

  delete: <R = any>(url: string, config?: ApiRequestConfig) => Promise<R>
}
