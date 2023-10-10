import { OrganizationStatistic } from '@domain/entities/statistic';

export interface GetOrganizationStatisticUseCase {
  invoke: (id: string) => Promise<OrganizationStatistic>,
}
