import { TravelRevenueStatistic } from '@domain/entities/statistic/TravelStatistic';

export interface GetTravelRevenueUseCase {
  invoke: (startTime: string, endTime: string) => Promise<TravelRevenueStatistic>;
}
