import { KpiPeriod, KpiSetting, OrgKpiMetric } from '@domain/entities/setting/Kpi';

export interface GetKpiUseCase {
  invoke: (kpiMetric: OrgKpiMetric, timeRange: KpiPeriod) => Promise<Partial<KpiSetting>>;
}
