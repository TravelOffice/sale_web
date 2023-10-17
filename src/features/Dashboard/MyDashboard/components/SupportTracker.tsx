// ** React Imports
import React from 'react';

// ** Third Party Components
import Chart from 'react-apexcharts';

// ** Reactstrap Imports
import {
  Card,
  CardBody,
  CardHeader,
  CardText,
  CardTitle,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
  UncontrolledDropdown,
} from 'reactstrap';
import i18n from 'i18next';
import { ApexOptions } from 'apexcharts';

export interface SupportTrackerProps {
  totalConversationCount: number;
  supportedConversationCount: number;
  unansweredConversationCount: number;
  ongoingSupportConversationCount: number;
  avgResponseTime: number;
}

const SupportTracker = (props:SupportTrackerProps) => {
  const {
    totalConversationCount, supportedConversationCount,
    unansweredConversationCount, ongoingSupportConversationCount, avgResponseTime,
  } = props;

  const rangeFilter = [
    i18n.t('DASHBOARD.LAST_7_DAYS_RANGE'),
    i18n.t('DASHBOARD.LAST_MONTH_RANGE'),
    i18n.t('DASHBOARD.LAST_YEAR_RANGE'),
  ];

  const data = {
    title: i18n.t('DASHBOARD.SUPPORT_TRACKER'),
    last_days: ['Last 28 Days', 'Last Month', 'Last Year'],
    totalTicket: 163,
    newTicket: 29,
    openTicket: 63,
    responseTime: 1,
  };

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
            offsetY: 35,
            fontFamily: 'Montserrat',
            fontSize: '0.8rem',
          },
          value: {
            offsetY: -5,
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
    labels: [i18n.t('DASHBOARD.ANSWERED_SUPPORT_CONVERSATION')],
  };

  const series = [parseFloat(
    (supportedConversationCount / totalConversationCount).toFixed(2),
  ) * 100];

  return (
    <Card>
      <CardHeader className="pb-0">
        <CardTitle tag="h4">
          {data.title}
        </CardTitle>
        <UncontrolledDropdown className="chart-dropdown">
          <DropdownToggle color="" className="bg-transparent btn-sm border-0 p-50">
            {i18n.t('DASHBOARD.LAST_7_DAYS_RANGE')}
          </DropdownToggle>
          <DropdownMenu end>
            {rangeFilter.map((item) => (
              <DropdownItem className="w-100" key={item}>
                {item}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </UncontrolledDropdown>
      </CardHeader>
      <CardBody>
        <Row>
          <Col lg="6" md="6" sm="12" className="d-flex justify-content-left">
            <Chart options={options} series={series} type="radialBar" height={255} id="support-tracker-card" />
          </Col>
          <Col lg="6" md="6" sm="12" className="d-flex flex-column justify-content-center">
            <div>
              <CardText className="mb-50">
                <b>{totalConversationCount}</b>
                <span className="fw-bold ms-75">{`${i18n.t('DASHBOARD.ASSIGNED_SUPPORT_CONVERSATION')}`}</span>
              </CardText>
            </div>
            <div>
              <CardText className="mb-50">
                <b>{unansweredConversationCount}</b>
                <span className="fw-bold ms-75">
                  {`${i18n.t('DASHBOARD.UNANSWERED_CONVERSATION_COUNT')}`}
                </span>
              </CardText>
            </div>
            <div>
              <CardText className="mb-50">
                <b>{ongoingSupportConversationCount}</b>
                <span className="fw-bold ms-75">
                  {`${i18n.t('DASHBOARD.ONGOING_SUPPORT_CONVERSATION_COUNT')}`}
                </span>
              </CardText>
            </div>
            <div>
              <CardText className="mb-50">
                <span className="fw-bold">
                  {`${i18n.t('DASHBOARD.AVERAGE_RESPONSE_TIME')}: `}
                </span>
                <b>{`${avgResponseTime} ${i18n.t('DASHBOARD.MINUTES')}`}</b>
              </CardText>
            </div>
          </Col>
        </Row>
      </CardBody>
      {/* Remove the below code block when the feature is ready */}
      <Row>
        <Col lg="12" md="12" sm="12">
          {i18n.t('DASHBOARD.THIS_FEATURES_IS_CURRENTLY_UNDER_DEVELOPMENT')}
        </Col>
      </Row>
    </Card>
  );
};
export default SupportTracker;
