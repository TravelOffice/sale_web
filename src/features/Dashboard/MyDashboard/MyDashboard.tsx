import React, { useEffect } from 'react';
import { Col, Row } from 'reactstrap';
import SupportTracker from '@features/Dashboard/MyDashboard/components/SupportTracker';
import MyLead from '@features/Dashboard/MyDashboard/components/MyLead';
import Statistics from '@components/Statistics/Statistics';
import {
  DollarSign, MessageSquare, TrendingUp, User,
} from 'react-feather';
import i18n from '@config/i18n';
import MyTasks from '@features/Dashboard/MyDashboard/components/MyTasks';
import { useQuery } from '@tanstack/react-query';
import {
  ChatSessionStatus,
  MetricNameEnum,
  TotalBookingMetricResponse,
  TotalLeadMetricResponse,
  TotalRevenueMetricResponse,
} from '@domain/entities/statistic/TravelStatistic';
import { travelStatisticPresenter } from '@adapter/presenters';
import { useCurrentUser } from '@hooks/auth';
import { formatVND } from '@utils/CommonUtils';
import { travelStatisticRepository } from '@adapter/repositories';

export default function MyDashboard() {
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

  const {
    data: totalRevenueOfSale,
  } = useQuery(
    [MetricNameEnum.TOTAL_REVENUE_OF_SALE],
    async () => travelStatisticPresenter.getSaleStatistic(
      username,
      MetricNameEnum.TOTAL_REVENUE_OF_SALE,
    ),
  );

  const [totalRevenue, setTotalRevenue] = React.useState<string>(formatVND(0));
  useEffect(() => {
    const saleStat = totalRevenueOfSale as TotalRevenueMetricResponse;
    if (saleStat && saleStat.totalRevenue) {
      setTotalRevenue(formatVND((totalRevenueOfSale as TotalRevenueMetricResponse).totalRevenue));
    }
  }, [totalRevenueOfSale]);

  const {
    data: totalSessionOfUser,
  } = useQuery(
    ['totalSessionOfUser'],
    async () => travelStatisticRepository.getTotalSessionOfUser(username),
  );

  const {
    data: totalOpenSessionOfUser,
  } = useQuery(
    ['totalOpenSessionOfUser'],
    async () => travelStatisticRepository.getTotalSessionByStatusOfUser(
      username,
      ChatSessionStatus.OPEN,
    ),
  );

  const {
    data: totalClosedSessionOfUser,
  } = useQuery(
    ['totalClosedSessionOfUser'],
    async () => travelStatisticRepository.getTotalSessionByStatusOfUser(
      username,
      ChatSessionStatus.CLOSED,
    ),
  );

  const {
    data: totalActiveSessionOfUser,
  } = useQuery(
    ['totalActiveSessionOfUser'],
    async () => travelStatisticRepository.getTotalSessionByStatusOfUser(
      username,
      ChatSessionStatus.CLOSED,
    ),
  );

  const {
    data: averageResponseTimeOfUser,
  } = useQuery(
    ['averageResponseTimeOfUser'],
    async () => travelStatisticRepository.getAverageResponseTimeOfUser(
      username,
    ),
  );

  return (
    <div className="to-table-container">
      <Row className="match-height">
        <Col lg="12" md="12" sm="12">
          <Statistics
            title={i18n.t('DASHBOARD.MY_STATISTICS')}
            items={[
              {
                color: 'light-primary',
                icon: <MessageSquare size={24} />,
                title: `${totalSessionOfUser || 0}`,
                subtitle: `${i18n.t('DASHBOARD.NUMBER_OF_SUPPORT_SESSION')}`,
              },
              {
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
                icon: <DollarSign size={24} />,
                title: totalRevenue,
                subtitle: `${i18n.t('DASHBOARD.REVENUE_GENERATED')}`,
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
            totalConversationCount={totalSessionOfUser || 0}
            supportedConversationCount={totalClosedSessionOfUser || 0}
            unansweredConversationCount={totalOpenSessionOfUser || 0}
            ongoingSupportConversationCount={totalActiveSessionOfUser || 0}
            avgResponseTime={averageResponseTimeOfUser || 0}
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
