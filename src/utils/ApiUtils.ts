import { AxiosRequestConfig } from 'axios';
import { ApiRequestConfig } from '../adapters/infrastructures/interfaces/ApiRequestConfig';

export const toAxiosRequestConfig = (apiRequestConfig?: ApiRequestConfig) => {
  const axiosRequestConfig : AxiosRequestConfig = {
    headers: apiRequestConfig?.headers || {},
    params: apiRequestConfig?.queryParams,
  };
  return axiosRequestConfig;
};

export const appendAxiosConfig = (
  axiosConfig: AxiosRequestConfig, apiRequestConfig: ApiRequestConfig,
) => ({
  ...axiosConfig,
  headers: apiRequestConfig.headers,
});
