import { MarketplaceStatistic, OrganizationStatistic } from '@domain/entities/statistic/MarketplaceStatistic';

export interface MarketplaceStatisticRepository {
  getMarketplaceStatistic: () => Promise<MarketplaceStatistic>,
  getOrganizationStatisticById: (id: string) => Promise<OrganizationStatistic>,
}
