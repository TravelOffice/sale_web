import { marketplaceStatisticRepository } from '@adapter/repositories';
import { GetOrganizationStatisticUseCase } from '../interfaces/statistic/GetOrganizationStatisticUseCase';

export default class GetOrganizationStatisticUseCaseImpl
implements GetOrganizationStatisticUseCase {
  invoke = async (id: string) => marketplaceStatisticRepository.getOrganizationStatisticById(id);
}
