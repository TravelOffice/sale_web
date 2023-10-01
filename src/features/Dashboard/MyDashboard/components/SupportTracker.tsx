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

export interface SupportTrackerProps {
  danger: string;
  primary: string;
  totalConversationCount: number;
  supportedConversationCount: number;
  unansweredConversationCount: number;
  ongoingSupportConversationCount: number;
  avgResponseTime: number;
}

const SupportTracker = (props:SupportTrackerProps) => {
  const {
    danger, primary, totalConversationCount, supportedConversationCount,
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

  const options = {
    plotOptions: {
      radialBar: {
        size: 150,
        offsetY: 20,
        startAngle: -150,
        endAngle: 150,
        hollow: {
          size: '65%',
        },
        track: {
          background: '#fff',
          strokeWidth: '100%',
        },
        dataLabels: {
          name: {
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
    colors: [danger],
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        type: 'horizontal',
        shadeIntensity: 0.5,
        gradientToColors: [primary],
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100],
      },
    },
    stroke: {
      dashArray: 8,
    },
    labels: [i18n.t('DASHBOARD.ANSWERED_SUPPORT_CONVERSATION')],
  };
  const series = [parseFloat(
    (supportedConversationCount / totalConversationCount).toFixed(2),
  ) * 100];

  return (
    <Card>
      <CardHeader className="pb-0">
        <CardTitle tag="h4">{data.title}</CardTitle>
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
          <Col lg="12" md="12" sm="12" className="d-flex flex-column flex-wrap text-center">
            <h1 className="font-large-2 fw-bolder mt-2 mb-0">{data.totalTicket}</h1>
            <CardText>{i18n.t('DASHBOARD.ASSIGNED_SUPPORT_CONVERSATION')}</CardText>
          </Col>
        </Row>
        <Row>
          <Col lg="12" md="12" sm="12" className="d-flex justify-content-center">
            <Chart options={options} series={series} type="radialBar" height={360} id="support-tracker-card" />
          </Col>
        </Row>
        <div className="d-flex justify-content-between mt-1">
          <div className="text-center">
            <CardText className="mb-50">{i18n.t('DASHBOARD.UNANSWERED_CONVERSATION_COUNT')}</CardText>
            <span className="font-large-1 fw-bold">{unansweredConversationCount}</span>
          </div>
          <div className="text-center">
            <CardText className="mb-50">{i18n.t('DASHBOARD.ONGOING_SUPPORT_CONVERSATION_COUNT')}</CardText>
            <span className="font-large-1 fw-bold">{ongoingSupportConversationCount}</span>
          </div>
          <div className="text-center">
            <CardText className="mb-50">{i18n.t('DASHBOARD.AVERAGE_RESPONSE_TIME')}</CardText>
            <span className="font-large-1 fw-bold">
              {avgResponseTime}
              {' '}
              {i18n.t('DASHBOARD.MINUTES')}
            </span>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
export default SupportTracker;
