export interface MarketplaceStatistic {
  totalPosts: number;
  totalOffers: number;
  updatedAt: number;
  createdAt: number;
  totalOrganizations: number;
}

export interface OrganizationStatistic {
  createdAt: number;
  updatedAt: number;
  totalPosts: number;
  totalOffers: number;
  totalSentOffers: number;
  totalSentOffersRevenue: number;
  totalReceivedOffers: number;
  totalReceivedOffersRevenue: number;
  totalSuccessOffers: number;
  totalSuccessSentOffers: number;
  totalSuccessReceivedOffers: number;
}
