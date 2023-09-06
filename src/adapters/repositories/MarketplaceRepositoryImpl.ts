import { apiProvider } from '@adapter/infrastructures';
import { MarketplaceRepository } from './interfaces/MarketplaceRepository';

export default class MarketplaceRepositoryImpl implements MarketplaceRepository {
  getLinkedPostOnMarketplaceInfo = async (targetKey: string) => {
    const reqUrl = `/marketplace/posts/linked-target-info/${targetKey}`;
    const response = await apiProvider.authorizedRequest.get(reqUrl);
    return response.data;
  }
}
