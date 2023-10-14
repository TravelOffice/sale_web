import { KPIParams, KpiSetting } from '@domain/entities/setting/Kpi';
import { settingRepository } from '@adapter/repositories';
import { SetKpiUseCase } from '../interfaces/setting/SetKpiUseCase';

export default class SetKpiUseCaseImpl implements SetKpiUseCase {
  invoke = async (data: KPIParams): Promise<Partial<KpiSetting>> => settingRepository.setKpi(data);
}
