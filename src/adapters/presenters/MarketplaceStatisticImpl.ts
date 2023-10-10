import { getMarketplaceStatisticUseCase, getOrganizationStatisticUseCase } from '@domain/useCases';
import { MarketplaceStatisticPresenter } from './interfaces/MarketplaceStatisticPresenter';

export default class MarketplaceStatisticPresenterImpl implements MarketplaceStatisticPresenter {
  getStatistic = async () => getMarketplaceStatisticUseCase.invoke();

  getStatisticByOrg = async (id: string) => getOrganizationStatisticUseCase.invoke(id);
}
