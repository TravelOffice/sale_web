import { marketplaceRepository } from '@adapter/repositories';
import {
  GetLinkedPostOnMarketplaceInfoUseCase,
} from '../interfaces/marketplace/GetLinkedPostOnMarketplaceInfoUseCase';

export default class GetLinkedPostOnMarketplaceInfoUseCaseImpl
implements GetLinkedPostOnMarketplaceInfoUseCase {
  invoke = async (
    targetKey: string,
  ) => marketplaceRepository.getLinkedPostOnMarketplaceInfo(targetKey);
}
