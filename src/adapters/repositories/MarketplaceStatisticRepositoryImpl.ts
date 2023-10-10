import { apiProvider } from '@adapter/infrastructures';
import { MarketplaceStatisticRepository } from './interfaces/MarketplaceStatisticRepository';

export default class MarketplaceStatisticRepositoryImpl implements MarketplaceStatisticRepository {
  getMarketplaceStatistic = async () => {
    const reqUrl = '/marketplace/statistic';
    const response = await apiProvider.authorizedRequest.get(reqUrl);
    return response.data;
  };

  getOrganizationStatisticById = async (id: string) => {
    const reqUrl = `/marketplace/organizations/${id}/statistic`;
    const response = await apiProvider.authorizedRequest.get(reqUrl);
    return response.data;
  };
}
