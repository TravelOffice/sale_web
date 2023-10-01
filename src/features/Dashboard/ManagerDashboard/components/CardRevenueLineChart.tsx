// ** React Imports
import React from 'react';

// ** Third Party Components
import Chart from 'react-apexcharts';
import { Settings } from 'react-feather';

// ** Reactstrap Imports
import {
  Card, CardBody, CardHeader, CardText, CardTitle,
} from 'reactstrap';
import { ApexOptions } from 'apexcharts';
import i18n from 'i18next';
import { formatVND } from '@utils/CommonUtils';

const CardRevenueLineChart = () => {
  const options: ApexOptions = {
    chart: {
      toolbar: { show: false },
      zoom: { enabled: false },
      type: 'line',
      offsetX: -10,
    },
    stroke: {
      curve: 'smooth',
      dashArray: [0, 12],
      width: [4, 3],
    },
    legend: {
      show: false,
    },
    colors: ['#d0ccff', '#ebe9f1'],
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        inverseColors: false,
        gradientToColors: ['#d0ccff', '#ebe9f1'],
        shadeIntensity: 1,
        type: 'horizontal',
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100, 100, 100],
      },
    },
    markers: {
      size: 0,
      hover: {
        size: 5,
      },
    },
    xaxis: {
      labels: {
        style: {
          colors: '#b9b9c3',
          fontSize: '1rem',
        },
      },
      axisTicks: {
        show: false,
      },
      categories: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'],
      axisBorder: {
        show: false,
      },
      tickPlacement: 'on',
    },
    yaxis: {
      tickAmount: 5,
      labels: {
        style: {
          colors: '#b9b9c3',
          fontSize: '1rem',
        },
      },
    },
    grid: {
      borderColor: '#e7eef7',
      padding: {
        top: -20,
        bottom: -10,
        left: 20,
      },
    },
    tooltip: {
      x: { show: false },
    },
  };
  const series = [
    {
      name: `${i18n.t('DASHBOARD.THIS_MONTH')}`,
      data: [18765432, 15678901, 17543210, 21345678, 21012345, 12543210, 16678901, 19012345,
        18123456, 22012345, 21012345, 23987654, 19456789, 17012345, 22765432, 15234567, 17012345,
        22765432, 20012345, 22890123, 17345678, 22678901, 22456789, 19456789, 23345678, 18456789,
        21345678, 22345678, 21456789, 19987654, 20012345],
    },
    {
      name: `${i18n.t('DASHBOARD.LAST_MONTH')}`,
      data: [12744629, 23456780, 21523567, 7889756, 15067890, 16875342, 20543267, 13342111,
        8765432, 19876543, 12123456, 21234567, 22456789, 11012345, 23543210, 14234567, 16890123,
        20345678, 14567890, 13543210, 16543210, 21098765, 21567890, 20012345, 14456789, 16345678,
        21765432, 13456789, 17987654, 17987654, 18456789],
    },
  ];
  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">{i18n.t('DASHBOARD.REVENUE')}</CardTitle>
        <Settings size={18} className="text-muted cursor-pointer" />
      </CardHeader>
      <CardBody>
        <div className="d-flex justify-content-start mb-3">
          <div className="me-2">
            <CardText className="mb-50">{i18n.t('DASHBOARD.THIS_MONTH')}</CardText>
            <h3 className="fw-bolder">
              <span className="text-primary">{formatVND(series[0].data.reduce((total, item) => total + item, 0))}</span>
            </h3>
          </div>
          <div>
            <CardText className="mb-50">{i18n.t('DASHBOARD.LAST_MONTH')}</CardText>
            <h3 className="fw-bolder">
              <span>{formatVND(series[1].data.reduce((total, item) => total + item, 0))}</span>
            </h3>
          </div>
        </div>
        <Chart options={options} series={series} type="line" height={240} />
      </CardBody>
    </Card>
  );
};
export default CardRevenueLineChart;
