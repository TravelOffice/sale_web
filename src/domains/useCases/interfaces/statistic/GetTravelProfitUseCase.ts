import { TravelProfitStatistic } from '@domain/entities/statistic/TravelStatistic';

export interface GetTravelProfitUseCase {
  invoke: (startTime: string, endTime: string) => Promise<TravelProfitStatistic>;
}
