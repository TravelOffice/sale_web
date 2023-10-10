import { OrganizationStatistic } from '@domain/entities/statistic/MarketplaceStatistic';

export interface GetOrganizationStatisticUseCase {
  invoke: (id: string) => Promise<OrganizationStatistic>,
}
