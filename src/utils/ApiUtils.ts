import { AxiosRequestConfig } from 'axios';
import { ApiRequestConfig } from '@adapter/infrastructures/interfaces/ApiRequestConfig';

export const toAxiosRequestConfig = (apiRequestConfig?: ApiRequestConfig) => {
  const axiosRequestConfig : AxiosRequestConfig = {
    headers: apiRequestConfig?.headers || {},
    params: apiRequestConfig?.queryParams,
    data: apiRequestConfig?.data,
  };
  return axiosRequestConfig;
};

export const appendAxiosConfig = (
  axiosConfig: AxiosRequestConfig, apiRequestConfig: ApiRequestConfig,
) => ({
  ...axiosConfig,
  headers: apiRequestConfig.headers,
});

export enum ResponseType {
  SUCCESS = 'Successfully!',
  ERROR = 'Failed!',
}
