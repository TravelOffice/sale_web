import React, { useEffect, useMemo } from 'react';
import { KPIParams, KpiPeriodTypeEnum, OrgKpiMetricEnum } from '@domain/entities/setting/Kpi';
import { Calendar } from 'react-feather';
import { Controller, useForm } from 'react-hook-form';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Form,
  Input,
  Label,
  Row,
} from 'reactstrap';
import Flatpickr from 'react-flatpickr';
import { Vietnamese } from 'flatpickr/dist/l10n/vn';
import moment from 'moment';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import FormItemInput from '@components/Form/FormItemInput';
import toasty from '@components/Toasty/Toasty';
import i18n from '@config/i18n';
import { useMutation, useQuery } from '@tanstack/react-query';
import { settingPresenter } from '@adapter/presenters';

const kpiMetricOptions = [
  {
    label: i18n.t('KPI_PAGE.ORG_KPI_REVENUE'),
    value: OrgKpiMetricEnum.ORG_KPI_REVENUE,
  },
  {
    label: i18n.t('KPI_PAGE.ORG_KPI_PROFIT'),
    value: OrgKpiMetricEnum.ORG_KPI_PROFIT,
  },
  {
    label: i18n.t('KPI_PAGE.ORG_KPI_L_GROW'),
    value: OrgKpiMetricEnum.ORG_KPI_L_GROW,
  },
  {
    label: i18n.t('KPI_PAGE.ORG_KPI_T_FILL'),
    value: OrgKpiMetricEnum.ORG_KPI_T_FILL,
  },
  {
    label: i18n.t('KPI_PAGE.ORG_KPI_SALE_BY_TOUR'),
    value: OrgKpiMetricEnum.ORG_KPI_SALE_BY_TOUR,
  },
];

const kpiTypeOptions = [
  {
    label: i18n.t('KPI_PAGE.KPI_PERIOD_TYPE_W'),
    value: KpiPeriodTypeEnum.W,
  },
  {
    label: i18n.t('KPI_PAGE.KPI_PERIOD_TYPE_M'),
    value: KpiPeriodTypeEnum.M,
  },
  {
    label: i18n.t('KPI_PAGE.KPI_PERIOD_TYPE_Q'),
    value: KpiPeriodTypeEnum.Q,
  },
  {
    label: i18n.t('KPI_PAGE.KPI_PERIOD_TYPE_Y'),
    value: KpiPeriodTypeEnum.Y,
  },
];

type KPIForm = Omit<KPIParams, 'period'> & { period: Date[] };

const schema = yup.object().shape({
  kpiValue: yup.number().required(i18n.t('KPI_PAGE.REQUIRED_ERROR_MESSAGE')),
});

const defaultValues = {
  kpiValue: 0,
  kpiMetric: OrgKpiMetricEnum.ORG_KPI_REVENUE,
  kpiPeriodType: KpiPeriodTypeEnum.W,
  period: [moment().startOf('week').toDate(), moment().endOf('week').toDate()],
};

function KpiSetup() {
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<KPIForm>({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const metricField = watch('kpiMetric');
  const periodField = watch('period');

  const {
    data: kpiData,
    isLoading: isFetching,
  } = useQuery(
    ['kpiData', metricField, periodField],
    async () => {
      if (periodField.length < 2) return {};
      const period = {
        start: periodField[0].getTime(),
        end: periodField[1].getTime(),
      };
      return settingPresenter.getKpi(metricField, period);
    },
  );

  useEffect(() => {
    setValue('kpiPeriodType', kpiData?.kpt ?? defaultValues.kpiPeriodType);
    setValue('description', kpiData?.description ?? '');
    setValue('kpiValue', kpiData?.kv ?? defaultValues.kpiValue);
  }, [kpiData]);

  const { mutate, isLoading: isMutating } = useMutation({
    mutationFn: settingPresenter.setKpi,
    onSuccess: () => {
      // Show success toast
      toasty.show({
        type: 'success',
        title: i18n.t('COMMON.SUCCESS'),
        message: i18n.t('KPI_PAGE.CREATE_SUCCESS_MESSAGE'),
      });
    },
    onError: (error: Error) => {
      toasty.show({
        type: 'error',
        title: i18n.t('COMMON.ERROR'),
        message: error.message,
      });
    },
  });

  const onSubmit = (data: KPIForm) => {
    const start = data.period[0].getTime();
    const end = data.period[1].getTime();
    mutate({
      ...data,
      period: {
        start,
        end,
      },
    });
  };

  const inputValueType = useMemo(() => {
    switch (metricField) {
      case OrgKpiMetricEnum.ORG_KPI_REVENUE:
      case OrgKpiMetricEnum.ORG_KPI_PROFIT:
        return '(VND)';
      case OrgKpiMetricEnum.ORG_KPI_T_FILL:
        return '(%)';
      default:
        return '';
    }
  }, [metricField]);

  return (
    <Card className="card-transaction">
      <CardHeader>
        <CardTitle tag="h4">{i18n.t('KPI_PAGE.PAGE_TITLE')}</CardTitle>
      </CardHeader>
      <CardBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col lg={3} md={6}>
              <Label>{i18n.t('KPI_PAGE.TIME_RANGE_FIELD')}</Label>
              <Controller
                control={control}
                name="period"
                render={({ field: { onChange, ...fieldProps } }) => (
                  <div className="d-flex align-items-center mt-md-0 mt-1">
                    <Calendar size={17} />
                    <Flatpickr
                      {...fieldProps}
                      onChange={(dates) => {
                        const mapping = dates.map((date, i) => {
                          if (i === 1) {
                            return moment(date).endOf('day').toDate();
                          }
                          return moment(date).startOf('day').toDate();
                        });
                        onChange(mapping);
                      }}
                      data-enable-time
                      className="form-control flat-picker bg-transparent border-0 shadow-none"
                      options={{
                        mode: 'range',
                        locale: Vietnamese,
                        dateFormat: 'd-m-Y',
                      }}
                    />
                  </div>
                )}
              />
            </Col>
            <Col lg={3} md={6}>
              <Label>{i18n.t('KPI_PAGE.KPI_TYPE_FIELD')}</Label>
              <Controller
                control={control}
                name="kpiPeriodType"
                render={({ field }) => (
                  <Input {...field} type="select" disabled={kpiData?.kv != null}>
                    {kpiTypeOptions.map((option) => (
                      <option value={option.value}>{option.label}</option>
                    ))}
                  </Input>
                )}
              />
            </Col>
            <Col lg={3} md={6}>
              <Label>{i18n.t('KPI_PAGE.KPI_Metric')}</Label>
              <Controller
                control={control}
                name="kpiMetric"
                render={({ field }) => (
                  <Input {...field} type="select">
                    {kpiMetricOptions.map((option) => (
                      <option value={option.value}>{option.label}</option>
                    ))}
                  </Input>
                )}
              />
            </Col>
            <Col lg={3} md={6}>
              <Label>{`${i18n.t('KPI_PAGE.VALUE_FIELD')} ${inputValueType}`}</Label>
              <FormItemInput inputType="number" control={control} name="kpiValue" errors={errors} />
            </Col>
          </Row>
          <Row className="mt-1">
            <Col>
              <Label>{i18n.t('KPI_PAGE.DESCRIPTION_FIELD')}</Label>
              <Controller
                control={control}
                name="description"
                render={({ field }) => <Input type="textarea" {...field} />}
              />
            </Col>
          </Row>
          <Row className="mt-1" style={{ float: 'right' }}>
            <Col>
              <Button type="submit" className="btn-icon" outline color="primary" disabled={isFetching || isMutating}>
                {i18n.t('KPI_PAGE.SETUP_ACTION')}
              </Button>
            </Col>
          </Row>
        </Form>
      </CardBody>
    </Card>
  );
}

export default KpiSetup;
