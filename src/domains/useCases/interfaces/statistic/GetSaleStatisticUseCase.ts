import {
  MetricNameEnum,
  TotalBookingMetricResponse,
  TotalLeadMetricResponse,
  TotalRevenueMetricResponse,
} from '@domain/entities/statistic/TravelStatistic';

export interface GetSaleStatisticUseCase {
  invoke: (
    saleId: string,
    metricName: MetricNameEnum,
    startTime?: string,
    endTime?: string
  ) => Promise<TotalBookingMetricResponse | TotalLeadMetricResponse | TotalRevenueMetricResponse>;
}
