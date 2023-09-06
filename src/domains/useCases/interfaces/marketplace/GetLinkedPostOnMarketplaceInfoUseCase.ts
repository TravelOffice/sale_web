import { LinkedLeadOrTourInfo } from '@domain/entities/marketplace/LinkedLeadOrTourInfo';

export interface GetLinkedPostOnMarketplaceInfoUseCase {
  // tagetKey is combination of pk and sk of lead or tour template
  invoke: (targetKey: string) => Promise<LinkedLeadOrTourInfo>,
}
