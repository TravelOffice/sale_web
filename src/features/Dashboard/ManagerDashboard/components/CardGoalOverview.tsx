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
  monthStr: string;
}

const CardGoalOverview = ({ goal, completed = 0, monthStr }: GoalOverviewProps) => {
  const surplusInProgress = goal - completed;
  const data = {
    goal: formatVND(goal),
    completed: formatVND(completed),
    inProgress: formatVND(Math.abs(surplusInProgress)),
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
    labels: ['Đã hoàn thành'],
  };
  const series = [completePercentile];

  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">{i18n.t('DASHBOARD.GOAL_REVENUE', { month: monthStr })}</CardTitle>
        <HelpCircle size={18} className="cursor-pointer text-muted" />
      </CardHeader>
      <CardBody className="p-0">
        <Row>
          <Col lg="6" md="6" sm="12" className="d-flex justify-content-center">
            <Chart options={options} series={series} type="radialBar" height={255} />
          </Col>
          <Col lg="6" md="6" sm="12" className="d-flex flex-column justify-content-center">
            <div>
              <CardText className="mb-50">
                <span className="fw-bold ms-75">
                  {`${i18n.t('DASHBOARD.GOAL')}: `}
                  <b>{data.goal}</b>
                </span>
              </CardText>
            </div>
            <div>
              <CardText className="mb-50">
                <span className="fw-bold ms-75">
                  {`${i18n.t('DASHBOARD.COMPLETED')}: `}
                  <b>{data.completed}</b>
                </span>
              </CardText>
            </div>
            <div>
              <CardText className="mb-50">
                <span className="fw-bold ms-75">
                  {`${i18n.t('DASHBOARD.REMAINING')}: `}
                  <b>
                    {surplusInProgress > 0 ? data.inProgress : `+${data.inProgress}`}
                  </b>
                </span>
              </CardText>
            </div>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};
export default CardGoalOverview;
