// ** Third Party Components
import Chart from 'react-apexcharts';

// ** Reactstrap Imports
import {
  Card, CardBody, CardHeader, CardSubtitle, CardText, CardTitle,
} from 'reactstrap';
import React from 'react';
import i18n from 'i18next';
import { ApexOptions } from 'apexcharts';
import { formatVND } from '@utils/CommonUtils';

export interface CardRevenueBarChartProps {
  direction: 'rtl' | 'ltr',
  lastMonthRevenue: number,
  thisMonthRevenue: number,
}

const CardRevenueBarChart = ({
  direction,
  lastMonthRevenue,
  thisMonthRevenue,
}: CardRevenueBarChartProps) => {
  // ** Chart Options
  const options: ApexOptions = {
    chart: {
      parentHeightOffset: 0,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: '25%',
        borderRadius: 0,
      },
    },
    colors: ['#ff9f43'],
    grid: {
      xaxis: {
        lines: {
          show: false,
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter(val: number): string {
        return formatVND(val);
      },
    },
    xaxis: {
      categories: [i18n.t('DASHBOARD.THIS_MONTH'), i18n.t('DASHBOARD.LAST_MONTH')],
      labels: {
        formatter(value: string): string {
          return formatVND(parseInt(value, 10));
        },
      },
    },
    yaxis: {
      opposite: direction === 'rtl',
    },
  };

  // ** Chart Series
  const series = [
    {
      data: [thisMonthRevenue, lastMonthRevenue],
    },
  ];

  return (
    <Card>
      <CardHeader className="d-flex flex-sm-row flex-column justify-content-md-between align-items-start justify-content-start">
        <div>
          <CardSubtitle className="text-muted mb-25">{i18n.t('DASHBOARD.REVENUE')}</CardSubtitle>
          <CardTitle className="fw-bolder" tag="h4">
            <div className="d-flex justify-content-start mb-3">
              <div className="me-2">
                <CardText className="mb-50">{i18n.t('DASHBOARD.THIS_MONTH')}</CardText>
                <h3 className="fw-bolder">
                  <span className="text-primary">{formatVND(thisMonthRevenue)}</span>
                </h3>
              </div>
              <div>
                <CardText className="mb-50">{i18n.t('DASHBOARD.LAST_MONTH')}</CardText>
                <h3 className="fw-bolder">
                  <span>{formatVND(lastMonthRevenue)}</span>
                </h3>
              </div>
            </div>
          </CardTitle>
        </div>
      </CardHeader>
      <CardBody>
        <Chart options={options} series={series} type="bar" height={400} />
      </CardBody>
    </Card>
  );
};

export default CardRevenueBarChart;
