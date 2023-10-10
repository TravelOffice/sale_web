import { travelStatisticRepository } from '@adapter/repositories';
import {
  FavouriteLocation,
  FavouriteTour,
  MetricNameEnum,
  ProficiencyTour,
  TravelStatistic,
} from '@domain/entities/statistic/TravelStatistic';
import { GetTravelStatisticUseCase } from '@domain/useCases/interfaces/statistic/GetTravelStatisticUseCase';

export default class GetTravelStatisticUseCaseImpl implements GetTravelStatisticUseCase {
  invoke = async (
    metricName: MetricNameEnum,
    startTime?: string,
    endTime?: string,
  ) => {
    if (metricName === MetricNameEnum.TOUR_FILLING_RATIO) {
      const response = await travelStatisticRepository.getTravelStatisticByMetric(
        metricName,
      );
      return response.data as ProficiencyTour[];
    }
    return travelStatisticRepository.getTravelStatisticByMetric(
      metricName,
      startTime,
      endTime,
    ) as Promise<TravelStatistic | FavouriteLocation[] | FavouriteTour[]>;
  }
}
