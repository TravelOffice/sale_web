import {
  getSaleStatisticUseCase,
  getTravelConversionRatioUseCase,
  getTravelProfitUseCase,
  getTravelRevenueUseCase,
  getTravelStatisticUseCase,
} from '@domain/useCases';
import { MetricNameEnum } from '@domain/entities/statistic/TravelStatistic';
import { TravelStatisticPresenter } from './interfaces/TravelStatisticPresenter';

export default class TravelStatisticPresenterImpl implements TravelStatisticPresenter {
  getTravelRevenue = (
    startTime: string,
    endTime: string,
  ) => getTravelRevenueUseCase.invoke(startTime, endTime);

  getTravelProfit = (
    startTime: string,
    endTime: string,
  ) => getTravelProfitUseCase.invoke(startTime, endTime);

  getTravelConversionRatio = (
    startTime: string,
    endTime: string,
  ) => getTravelConversionRatioUseCase.invoke(startTime, endTime);

  getTravelStatistic = (
    metricName: MetricNameEnum,
    startTime?: string,
    endTime?: string,
  ) => getTravelStatisticUseCase.invoke(metricName, startTime, endTime);

  getSaleStatistic = (
    saleId: string,
    metricName: MetricNameEnum,
    startTime?: string,
    endTime?: string,
  ) => getSaleStatisticUseCase.invoke(saleId, metricName, startTime, endTime);
}
