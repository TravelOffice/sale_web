import { travelStatisticRepository } from '@adapter/repositories';
import { MetricNameEnum, TravelRevenueStatistic } from '@domain/entities/statistic/TravelStatistic';
import { GetTravelRevenueUseCase } from '../interfaces/statistic/GetTravelRevenueUseCase';

export default class GetTravelRevenueUseCaseImpl implements GetTravelRevenueUseCase {
  invoke = async (
    startTime: string,
    endTime: string,
  ) => travelStatisticRepository.getTravelStatisticByMetric(
    MetricNameEnum.TOTAL_REVENUE_OF_TENANT,
    startTime,
    endTime,
  ) as Promise<TravelRevenueStatistic>;
}
