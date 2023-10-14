import { KPIParams, KpiPeriod, OrgKpiMetric } from '@domain/entities/setting/Kpi';
import { getKpiUseCase, setKpiUseCase } from '@domain/useCases';
import { SettingPresenter } from './interfaces/SettingPresenter';

export default class SettingPresenterImpl implements SettingPresenter {
  setKpi = (data: KPIParams) => setKpiUseCase.invoke(data);

  getKpi = (
    kpiMetric: OrgKpiMetric,
    timeRange: KpiPeriod,
  ) => getKpiUseCase.invoke(kpiMetric, timeRange);
}
