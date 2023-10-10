import { apiProvider } from '@adapter/infrastructures';
import { MetricNameEnum } from '@domain/entities/statistic/TravelStatistic';
import { TravelStatisticRepository } from './interfaces/TravelStatisticRepository';

export default class TravelStatisticRepositoryImpl implements TravelStatisticRepository {
  getTravelStatisticByMetric = async (
    metricName: MetricNameEnum,
    startTime?: string,
    endTime?: string,
  ) => {
    const reqUrl = '/statistic/tenant';
    const response = await apiProvider.authorizedRequest.get(reqUrl, {
      queryParams: {
        metricName,
        startTime,
        endTime,
      },
    });
    return response.data;
  };

  getSaleStatisticByMetric = async (
    saleId: string,
    metricName: MetricNameEnum,
    startTime?: string,
    endTime?: string,
  ) => {
    const reqUrl = `/statistic/sales/${saleId}`;
    const response = await apiProvider.authorizedRequest.get(reqUrl, {
      queryParams: {
        metricName,
        startTime,
        endTime,
      },
    });
    return response.data;
  }
}
