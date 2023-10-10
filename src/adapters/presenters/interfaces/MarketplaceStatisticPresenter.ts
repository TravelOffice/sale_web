import { MarketplaceStatistic, OrganizationStatistic } from '@domain/entities/statistic';

export interface MarketplaceStatisticPresenter {
  getStatistic: () => Promise<MarketplaceStatistic>;
  getStatisticByOrg: (id: string) => Promise<OrganizationStatistic>;
}
