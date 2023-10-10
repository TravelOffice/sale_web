import { MarketplaceStatistic } from '@domain/entities/statistic';

export interface GetMarketplaceStatisticUseCase {
  invoke: () => Promise<MarketplaceStatistic>,
}
