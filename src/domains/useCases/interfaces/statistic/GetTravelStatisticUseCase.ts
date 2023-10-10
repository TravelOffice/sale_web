import {
  FavouriteLocation,
  FavouriteTour,
  MetricNameEnum,
  ProficiencyTour,
  TravelStatistic,
} from '@domain/entities/statistic/TravelStatistic';

export interface GetTravelStatisticUseCase {
  invoke: (
    metricName: MetricNameEnum,
    startTime?: string,
    endTime?: string,
  ) => Promise<TravelStatistic | FavouriteLocation[] | FavouriteTour[] | ProficiencyTour[]>;
}
