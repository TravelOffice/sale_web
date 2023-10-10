import {
  MetricNameEnum,
  TotalBookingMetricResponse,
  TotalLeadMetricResponse,
} from '@domain/entities/statistic/TravelStatistic';

export interface TravelStatisticRepository {
  getTravelStatisticByMetric: (
    metricName: MetricNameEnum,
    startTime?: string,
    endTime?: string,
  ) => Promise<any>;

  getSaleStatisticByMetric: (
    saleId: string,
    metricName: MetricNameEnum,
    startTime?: string,
    endTime?: string,
  ) => Promise<
  TotalBookingMetricResponse |
  TotalLeadMetricResponse
  >;
}
