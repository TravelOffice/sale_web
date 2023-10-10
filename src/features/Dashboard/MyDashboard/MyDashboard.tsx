import React from 'react';
import { Col, Row } from 'reactstrap';
import SupportTracker from '@features/Dashboard/MyDashboard/components/SupportTracker';
import MyLead from '@features/Dashboard/MyDashboard/components/MyLead';
import Statistics from '@components/Statistics/Statistics';
import { MessageSquare, TrendingUp, User } from 'react-feather';
import i18n from '@config/i18n';
import MyTasks from '@features/Dashboard/MyDashboard/components/MyTasks';
import { useQuery } from '@tanstack/react-query';
import {
  MetricNameEnum,
  TotalBookingMetricResponse,
  TotalLeadMetricResponse,
} from '@domain/entities/statistic/TravelStatistic';
import { travelStatisticPresenter } from '@adapter/presenters';
import { useCurrentUser } from '@hooks/auth';
import CardCongratulations from './components/CardCongratulations';

export default function MyDashboard() {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentUser = useCurrentUser();
  if (!currentUser) return null;
  const { username } = currentUser;
  const {
    data: totalLeadOfSale,
  } = useQuery(
    [MetricNameEnum.TOTAL_LEAD_OF_SALE],
    async () => travelStatisticPresenter.getSaleStatistic(
      username,
      MetricNameEnum.TOTAL_LEAD_OF_SALE,
    ),
  );

  const {
    data: totalBookingOfSale,
  } = useQuery(
    [MetricNameEnum.TOTAL_BOOKING_OF_SALE],
    async () => travelStatisticPresenter.getSaleStatistic(
      username,
      MetricNameEnum.TOTAL_BOOKING_OF_SALE,
    ),
  );

  return (
    <div className="to-table-container">
      <Row className="match-height">
        <Col lg="4" md="4" sm="12">
          <CardCongratulations month={currentMonth} completedValue="120%" />
        </Col>
        <Col lg="8" md="8" sm="12">
          <Statistics
            title={i18n.t('DASHBOARD.MY_STATISTICS')}
            items={[{
              color: 'light-info',
              icon: <User size={24} />,
              title: totalLeadOfSale ? (totalLeadOfSale as TotalLeadMetricResponse).totalLead.toString() : '0',
              subtitle: i18n.t('DASHBOARD.NUMBER_OF_CREATED_LEADS'),
            },
            {
              color: 'light-success',
              icon: <TrendingUp size={24} />,
              title: totalBookingOfSale ? (totalBookingOfSale as TotalBookingMetricResponse).totalBooking.toString() : '0',
              subtitle: i18n.t('DASHBOARD.NUMBER_OF_CREATED_BOOKINGS'),
            },
            {
              color: 'light-primary',
              icon: <MessageSquare size={24} />,
              title: '1289',
              subtitle: i18n.t('DASHBOARD.NUMBER_OF_SUPPORT_CONVERSATION'),
            },
            ]}
          />
        </Col>
      </Row>
      <Row className="match-height">
        <Col lg="6" md="6" sm="12">
          <MyTasks />
        </Col>
        <Col lg="6" md="6" sm="12">
          <SupportTracker
            totalConversationCount={176}
            supportedConversationCount={120}
            unansweredConversationCount={7}
            ongoingSupportConversationCount={5}
            avgResponseTime={2}
          />
        </Col>
      </Row>
      <Row>
        <Col lg="12" md={12} sm="12">
          <MyLead />
        </Col>
      </Row>
    </div>
  );
}
