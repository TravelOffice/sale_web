import { MarketplaceStatistic, OrganizationStatistic } from '@domain/entities/statistic/MarketplaceStatistic';

export interface MarketplaceStatisticPresenter {
  getStatistic: () => Promise<MarketplaceStatistic>;
  getStatisticByOrg: (id: string) => Promise<OrganizationStatistic>;
}
