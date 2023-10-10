export interface TravelRevenueStatistic {
  totalRevenue: number;
}
export interface TravelProfitStatistic {
  totalProfit: number;
}
export interface TravelConversionStatistic {
  conversionRatio: number;
}

export interface TourFillingRatio{
  departureTourId: string,
  departureTourName: string,
  fillingRatio: number,
}

export interface TotalLeadMetricResponse {
  totalLead: number,
}

export interface ConversionRatioMetricResponse {
  conversionRatio: number,
}

export interface FavouriteLocation {
  locationId: string,
  locationName: string,
  numberOfLead: number,
}

export interface TotalRevenueMetricResponse {
  totalRevenue: number,
}

export interface TotalProfitMetricResponse {
  totalProfit: number,
}

export interface ProficiencyTour {
  departureTourId: string,
  departureTourName: string,
  proficiency: number,
  revenue: number,
  cost: number,
}

export interface TotalBookingMetricResponse {
  totalBooking: number,
}

export interface FavouriteTour {
  tourTemplateId: string,
  tourTemplateName: string,
  numberOfBooking: number,
}

export enum MetricNameEnum {
  TOTAL_REVENUE_OF_TENANT = 'totalRevenueOfTenant',
  TOTAL_PROFIT_OF_TENANT = 'totalProfitOfTenant',
  CONVERSION_RATIO_OF_TENANT = 'conversionRatioOfTenant',
  LEAD_COUNT_OF_TENANT = 'leadCountOfTenant',
  TOP_PROFICIENCY_TOUR = 'topProficiencyTour',
  TOP_FAVOURITE_TOUR = 'topFavouriteTour',
  TOP_FAVOURITE_LOCATION = 'topFavouriteLocation',
  TOUR_FILLING_RATIO = 'tourFillingRatio',
  TOTAL_LEAD_OF_SALE = 'totalLeadOfSale',
  TOTAL_BOOKING_OF_SALE = 'totalBookingOfSale',
  TOTAL_REVENUE_OF_SALE = 'totalRevenueOfSale',
  CONVERSION_RATIO_OF_SALE = 'conversionRatioOfSale',
}

export interface TravelStatistic extends
  TravelRevenueStatistic, TravelProfitStatistic, TravelConversionStatistic, FavouriteLocation {}
