// ** React Imports
import React from 'react';

// ** Third Party Components
import Chart from 'react-apexcharts';
import { HelpCircle } from 'react-feather';

// ** Reactstrap Imports
import {
  Card, CardBody, CardHeader, CardText, CardTitle, Col, Row,
} from 'reactstrap';
import { ApexOptions } from 'apexcharts';
import { formatVND } from '@utils/CommonUtils';
import i18n from 'i18next';

export interface GoalOverviewProps {
  goal: number;
  completed: number;
  month: number;
}

const CardGoalOverview = ({ goal, completed = 0, month }: GoalOverviewProps) => {
  const data = {
    completed: formatVND(completed),
    inProgress: formatVND(goal - completed),
  };
  const completePercentile = parseFloat(((completed / goal) * 100).toFixed(2));

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
            show: false,
          },
          value: {
            color: '#5e5873',
            fontFamily: 'Montserrat',
            fontSize: '2.86rem',
            fontWeight: '600',
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
  };
  const series = [completePercentile];

  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">{i18n.t('DASHBOARD.GOAL_REVENUE', { month })}</CardTitle>
        <HelpCircle size={18} className="text-muted cursor-pointer" />
      </CardHeader>
      <CardBody className="p-0">
        <Chart options={options} series={series} type="radialBar" height={245} />
      </CardBody>
      <Row className="border-top text-center mx-0">
        <Col xs="6" className="border-end py-1">
          <CardText className="text-muted mb-0">{i18n.t('DASHBOARD.COMPLETED')}</CardText>
          <h3 className="fw-bolder mb-0">{data.completed}</h3>
        </Col>
        <Col xs="6" className="py-1">
          <CardText className="text-muted mb-0">{i18n.t('DASHBOARD.REMAINING')}</CardText>
          <h3 className="fw-bolder mb-0">{data.inProgress}</h3>
        </Col>
      </Row>
    </Card>
  );
};
export default CardGoalOverview;
