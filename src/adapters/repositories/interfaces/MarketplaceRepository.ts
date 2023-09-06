import { LinkedLeadOrTourInfo } from '@domain/entities/marketplace/LinkedLeadOrTourInfo';

export interface MarketplaceRepository {
  getLinkedPostOnMarketplaceInfo: (targetKey: string) => Promise<LinkedLeadOrTourInfo>,
}
