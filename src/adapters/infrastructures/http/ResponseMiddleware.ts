import { AxiosResponse } from 'axios';

export type ResponseMiddleware<T = any> = <R extends any = T>(response: AxiosResponse<T>) => R;
