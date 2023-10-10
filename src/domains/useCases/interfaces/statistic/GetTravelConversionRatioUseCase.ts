import { TravelConversionStatistic } from '@domain/entities/statistic/TravelStatistic';

export interface GetTravelConversionRatioUseCase {
  invoke: (startTime: string, endTime: string) => Promise<TravelConversionStatistic>;
}
