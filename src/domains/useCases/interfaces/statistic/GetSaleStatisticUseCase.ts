import {
  MetricNameEnum,
  TotalBookingMetricResponse,
  TotalLeadMetricResponse,
} from '@domain/entities/statistic/TravelStatistic';

export interface GetSaleStatisticUseCase {
  invoke: (
    saleId: string,
    metricName: MetricNameEnum,
    startTime?: string,
    endTime?: string
  ) => Promise<TotalBookingMetricResponse | TotalLeadMetricResponse>;
}
