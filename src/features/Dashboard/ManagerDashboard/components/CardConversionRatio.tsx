// ** React Imports
import React from 'react';

// ** Third Party Components
import Chart from 'react-apexcharts';
import { HelpCircle } from 'react-feather';

// ** Reactstrap Imports
import {
  Card, CardBody, CardHeader, CardTitle, Col, Row,
} from 'reactstrap';
import { ApexOptions } from 'apexcharts';
import { useQuery } from '@tanstack/react-query';
import { MetricNameEnum } from '@domain/entities/statistic/TravelStatistic';
import { travelStatisticPresenter } from '@adapter/presenters';
import i18n from 'i18next';

interface CardConversionRatioProps {
  monthStr: string;
  startTime: string;
  endTime: string;
}

const CardConversionRatio = ({ monthStr, startTime, endTime }: CardConversionRatioProps) => {
  const {
    data: currentMonthConversionRatio,
  } = useQuery(
    [`CURRENT_MONTH_${MetricNameEnum.CONVERSION_RATIO_OF_TENANT}`],
    async () => travelStatisticPresenter.getTravelConversionRatio(
      startTime,
      endTime,
    ),
  );

  const options: ApexOptions = {
    chart: {
      sparkline: {
        enabled: true,
      },
      dropShadow: {
        enabled: true,
        blur: 3,
        left: 1,
        top: 1,
        opacity: 0.1,
      },
    },
    colors: ['#51e5a8'],
    plotOptions: {
      radialBar: {
        offsetY: 10,
        startAngle: -150,
        endAngle: 150,
        hollow: {
          size: '77%',
        },
        track: {
          background: '#ebe9f1',
          strokeWidth: '50%',
        },
        dataLabels: {
          name: {
            show: true,
            offsetY: -5,
            fontFamily: 'Montserrat',
            fontSize: '1rem',
          },
          value: {
            offsetY: 15,
            fontFamily: 'Montserrat',
            fontSize: '1.714rem',
          },
        },
      },
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        type: 'horizontal',
        shadeIntensity: 0.5,
        gradientToColors: ['#28c76f'],
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100],
      },
    },
    stroke: {
      lineCap: 'round',
    },
    grid: {
      padding: {
        bottom: 30,
      },
    },
    labels: ['Thành công'],
  };
  const series = [currentMonthConversionRatio?.conversionRatio ?? 0];

  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">{i18n.t('DASHBOARD.CONVERSATIONS_RATIO_TITLE', { month: monthStr })}</CardTitle>
        <HelpCircle size={18} className="cursor-pointer text-muted" />
      </CardHeader>
      <CardBody className="p-0">
        <Row>
          <Col lg="12" md="12" sm="12" className="d-flex justify-content-center">
            <Chart options={options} series={series} type="radialBar" height={255} />
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};
export default CardConversionRatio;
