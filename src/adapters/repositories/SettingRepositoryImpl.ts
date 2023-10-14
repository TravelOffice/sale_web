import { apiProvider } from '@adapter/infrastructures';
import { KPIParams, KpiPeriod, OrgKpiMetric } from '@domain/entities/setting/Kpi';
import SettingRepository from './interfaces/SettingRepository';

export default class SettingRepositoryImpl implements SettingRepository {
  setKpi = async (data: KPIParams) => {
    const response = await apiProvider.authorizedRequest.post('/settings/kpi', data);
    return response.data;
  };

  getKpi = async (kpiMetric: OrgKpiMetric, timeRange: KpiPeriod) => {
    const response = await apiProvider.authorizedRequest.get('/settings/kpi', {
      queryParams: {
        kpiMetric,
        start: timeRange.start,
        end: timeRange.end,
      },
    });
    return response.data || {};
  };
}
