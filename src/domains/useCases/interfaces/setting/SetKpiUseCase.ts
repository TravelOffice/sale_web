import { KPIParams, KpiSetting } from '@domain/entities/setting/Kpi';

export interface SetKpiUseCase {
  invoke: (data: KPIParams) => Promise<Partial<KpiSetting>>;
}
