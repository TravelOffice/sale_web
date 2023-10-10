import { MarketplaceStatistic, OrganizationStatistic } from '@domain/entities/statistic';

export interface MarketplaceStatisticRepository {
  getMarketplaceStatistic: () => Promise<MarketplaceStatistic>,
  getOrganizationStatisticById: (id: string) => Promise<OrganizationStatistic>,
}
