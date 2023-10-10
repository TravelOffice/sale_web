import { travelStatisticRepository } from '@adapter/repositories';
import { MetricNameEnum, TravelConversionStatistic } from '@domain/entities/statistic/TravelStatistic';
import { GetTravelConversionRatioUseCase } from '../interfaces/statistic/GetTravelConversionRatioUseCase';

export default class GetTravelConversionRatioUseCaseImpl
implements GetTravelConversionRatioUseCase {
  invoke = async (
    startTime: string,
    endTime: string,
  ) => travelStatisticRepository.getTravelStatisticByMetric(
    MetricNameEnum.CONVERSION_RATIO_OF_TENANT,
    startTime,
    endTime,
  ) as Promise<TravelConversionStatistic>;
}
