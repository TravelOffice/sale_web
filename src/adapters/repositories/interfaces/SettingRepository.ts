import {
  KPIParams, KpiPeriod, KpiSetting, OrgKpiMetric,
} from '@domain/entities/setting/Kpi';

export default interface SettingRepository {
  setKpi: (data: KPIParams) => Promise<Partial<KpiSetting>>;
  getKpi: (kpiMetric: OrgKpiMetric, timeRange: KpiPeriod) => Promise<Partial<KpiSetting>>;
}
