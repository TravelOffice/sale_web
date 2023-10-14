import {
  KPIParams, KpiPeriod, KpiSetting, OrgKpiMetric,
} from '@domain/entities/setting/Kpi';

export interface SettingPresenter {
  setKpi: (data: KPIParams) => Promise<Partial<KpiSetting>>;
  getKpi: (kpiMetric: OrgKpiMetric, timeRange: KpiPeriod) => Promise<Partial<KpiSetting>>;
}
