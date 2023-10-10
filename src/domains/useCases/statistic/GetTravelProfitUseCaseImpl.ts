import { MetricNameEnum, TravelProfitStatistic } from '@domain/entities/statistic/TravelStatistic';
import { travelStatisticRepository } from '@adapter/repositories';
import { GetTravelProfitUseCase } from '../interfaces/statistic/GetTravelProfitUseCase';

export default class GetTravelProfitUseCaseImpl implements GetTravelProfitUseCase {
  invoke = async (
    startTime: string,
    endTime: string,
  ) => travelStatisticRepository.getTravelStatisticByMetric(
    MetricNameEnum.TOTAL_PROFIT_OF_TENANT,
    startTime,
    endTime,
  ) as Promise<TravelProfitStatistic>;
}
