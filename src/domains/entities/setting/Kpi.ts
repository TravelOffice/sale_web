export enum OrgKpiMetricEnum {
  // Total revenue kpi
  ORG_KPI_REVENUE = 'ORG_KPI_REVENUE',
  // Total profit api
  ORG_KPI_PROFIT = 'ORG_KPI_PROFIT',
  // Lead growth kpi
  ORG_KPI_L_GROW = 'ORG_KPI_L_GROW',
  // Tour filling ratio kpi
  ORG_KPI_T_FILL = 'ORG_KPI_T_FILL',
  // Target sale by tour kpi
  ORG_KPI_SALE_BY_TOUR = 'ORG_KPI_SALE_BY_TOUR',
}

export type OrgKpiMetric = keyof typeof OrgKpiMetricEnum;

export enum KpiPeriodTypeEnum {
  W = 'W', // Weekly
  M = 'M', // Monthly
  Q = 'Q', // Quarterly
  Y = 'Y', // Yearly
}

export type KpiPeriodType = keyof typeof KpiPeriodTypeEnum;

export interface KpiPeriod {
  start: number;
  end: number;
}

export interface KPIParams {
  kpiValue: number;
  kpiMetric: OrgKpiMetric;
  kpiPeriodType: KpiPeriodType;
  period: KpiPeriod;
  description?: string;
}

export interface KpiSetting {
  // Start date
  start: number;
  // End date
  end: number;
  // Kpi value
  kv: number;
  // Kpi metric name
  km: OrgKpiMetric;
  // Kpi period type
  kpt: KpiPeriodType;
  // Description
  description?: string;
}
