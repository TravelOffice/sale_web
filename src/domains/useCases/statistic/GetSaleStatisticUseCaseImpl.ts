import { travelStatisticRepository } from '@adapter/repositories';
import {
  MetricNameEnum,
  TotalBookingMetricResponse,
  TotalLeadMetricResponse,
  TotalRevenueMetricResponse,
} from '@domain/entities/statistic/TravelStatistic';
import { GetSaleStatisticUseCase } from '@domain/useCases/interfaces/statistic/GetSaleStatisticUseCase';

export default class GetSaleStatisticUseCaseImpl
implements GetSaleStatisticUseCase {
  invoke = async (
    saleId: string,
    metricName: MetricNameEnum,
    startTime?: string,
    endTime?: string,
  ) => travelStatisticRepository.getSaleStatisticByMetric(
    saleId,
    metricName,
    startTime,
    endTime,
  ) as Promise<TotalLeadMetricResponse | TotalBookingMetricResponse | TotalRevenueMetricResponse>;
}
