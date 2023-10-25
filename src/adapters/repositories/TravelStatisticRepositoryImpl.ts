import { apiProvider } from '@adapter/infrastructures';
import {
  ChatSessionStatus,
  GetSessionByResponseTimeCondition,
  MetricNameEnum,
  SessionMetric,
} from '@domain/entities/statistic/TravelStatistic';
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

  getTotalSessionByResponseTimeOfOrg = async (
    conditionType: GetSessionByResponseTimeCondition,
    comparasionTime: number,
  ) => {
    const reqUrl = '/statistic/chat-sessions';
    const response = await apiProvider.authorizedRequest.get(reqUrl, {
      queryParams: {
        metricName: SessionMetric.TOTAL_RESPONSE_TIME_BY_CONDITION,
        comparasionTime,
        condition: conditionType,
      },
    });
    return response.data.total;
  }

  getTotalSessionOfUser = async (
    userId: string,
  ) => {
    const reqUrl = `/statistic/${userId}/chat-sessions`;
    const response = await apiProvider.authorizedRequest.get(reqUrl);
    return response.data.total;
  }

  getTotalSessionByStatusOfUser = async (
    userId: string,
    status: ChatSessionStatus,
  ) => {
    const reqUrl = `/statistic/${userId}/chat-sessions`;
    const response = await apiProvider.authorizedRequest.get(reqUrl, {
      queryParams: {
        status,
      },
    });
    return response.data.total;
  }

  getAverageResponseTimeOfUser = async (
    userId: string,
  ) => {
    const reqUrl = `/statistic/${userId}/chat-sessions`;
    const response = await apiProvider.authorizedRequest.get(reqUrl);
    return response.data.average_duration;
  }
}
