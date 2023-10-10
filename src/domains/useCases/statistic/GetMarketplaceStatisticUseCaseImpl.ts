import { marketplaceStatisticRepository } from '@adapter/repositories';
import { GetMarketplaceStatisticUseCase } from '../interfaces/statistic/GetMarketplaceStatisticUseCase';

export default class GetMarketplaceStatisticUseCaseImpl implements GetMarketplaceStatisticUseCase {
  invoke = async () => marketplaceStatisticRepository.getMarketplaceStatistic();
}
