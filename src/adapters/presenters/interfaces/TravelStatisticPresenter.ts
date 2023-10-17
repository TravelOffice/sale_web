import {
  FavouriteLocation,
  FavouriteTour,
  MetricNameEnum,
  ProficiencyTour,
  TotalBookingMetricResponse,
  TotalLeadMetricResponse,
  TotalRevenueMetricResponse,
  TourFillingRatio,
  TravelConversionStatistic,
  TravelProfitStatistic,
  TravelRevenueStatistic,
  TravelStatistic,
} from '@domain/entities/statistic/TravelStatistic';

export interface TravelStatisticPresenter {
  getTravelRevenue: (startTime: string, endTime: string) => Promise<TravelRevenueStatistic>;
  getTravelProfit: (startTime: string, endTime: string) => Promise<TravelProfitStatistic>;
  getTravelConversionRatio: (
    startTime: string,
    endTime: string,
  ) => Promise<TravelConversionStatistic>;
  getTravelStatistic: (
    metricName: MetricNameEnum,
    startTime?: string,
    endTime?: string
  ) => Promise<
  TravelStatistic |
  FavouriteLocation[] |
  FavouriteTour[] |
  ProficiencyTour[] |
  TourFillingRatio[]
  >;

  getSaleStatistic: (
    saleId: string,
    metricName: MetricNameEnum,
    startTime?: string,
    endTime?: string,
  ) => Promise<
  TotalLeadMetricResponse |
  TotalBookingMetricResponse |
  TotalRevenueMetricResponse
  >
}
