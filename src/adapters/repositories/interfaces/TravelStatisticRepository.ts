import {
  ChatSessionStatus,
  GetSessionByResponseTimeCondition,
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

  getTotalSessionByResponseTimeOfOrg: (
    conditionType: GetSessionByResponseTimeCondition,
    comparasionTime: number,
  ) => Promise<number>;

  getTotalSessionOfUser: (
    userId: string,
  ) => Promise<number>;

  getTotalSessionByStatusOfUser: (
    userId: string,
    status: ChatSessionStatus
  ) => Promise<number>;

  getAverageResponseTimeOfUser: (
    userId: string,
  ) => Promise<number>;
}
