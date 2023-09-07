import { SearchOptions, MailSearchProvider, SearchResults } from '@adapter/infrastructures/interfaces/MailSearchProvider';
import axios, { AxiosInstance } from 'axios';
import { store } from '@redux/store';

export default class MailSearchProviderImpl implements MailSearchProvider {
  private readonly axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: `${process.env.REACT_APP_LB_BASE_URL}/mail/search` || '',
    });
  }

  query = async <T = any>(indexUid: string, q: string, options?: Partial<SearchOptions>) => {
    const res = await this.axiosInstance.post<SearchResults<T>>(`/indexes/${indexUid}/search`, { q, ...options }, {
      headers: {
        Authorization: `Bearer ${store.getState().auth.searchToken}`,
      },
    });
    return res.data;
  }
}
