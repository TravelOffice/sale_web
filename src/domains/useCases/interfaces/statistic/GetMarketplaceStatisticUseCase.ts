import { MarketplaceStatistic } from '@domain/entities/statistic/MarketplaceStatistic';

export interface GetMarketplaceStatisticUseCase {
  invoke: () => Promise<MarketplaceStatistic>,
}
