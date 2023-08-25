import { SearchOptions, SearchProvider, SearchResults } from '@adapter/infrastructures/interfaces/SearchProvider';
import axios, { AxiosInstance } from 'axios';
import { store } from '@redux/store';

export default class SearchProviderImpl implements SearchProvider {
  private readonly axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: process.env.REACT_APP_SEARCH_BASE_URL || '',
    });
  }

  query = async <T = any>(indexUid: string, q: string, options?: Partial<SearchOptions>) => {
    const res = await this.axiosInstance.post<SearchResults<T>>(`/search/indexes/${indexUid}/search`, { q, ...options }, {
      headers: {
        Authorization: `Bearer ${store.getState().auth.currentUser?.searchToken}`,
      },
    });
    return res.data;
  }
}
