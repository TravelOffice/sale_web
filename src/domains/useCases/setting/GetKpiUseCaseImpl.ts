import { KpiPeriod, OrgKpiMetric } from '@domain/entities/setting/Kpi';
import { settingRepository } from '@adapter/repositories';
import { GetKpiUseCase } from '../interfaces/setting/GetKpiUseCase';

export default class GetKpiUseCaseImpl implements GetKpiUseCase {
  invoke = async (
    kpiMetric: OrgKpiMetric,
    timeRange: KpiPeriod,
  ) => settingRepository.getKpi(kpiMetric, timeRange);
}
