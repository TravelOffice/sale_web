import React, { useEffect } from 'react';
import StatsHorizontal from '@components/Widgets/Stats/StatsHorizontal';
import i18n from '@config/i18n';
import CardTopFavoriteTour from '@features/Dashboard/ManagerDashboard/components/CardTopFavoriteTour';
import CardMarketplaceOverview from '@features/Dashboard/ManagerDashboard/components/CardMarketplace';
import ChatSummary from '@features/Dashboard/MarketingDashboard/components/ChatSummary';
import { Award, MessageSquare, User } from 'react-feather';
import { Col, Row } from 'reactstrap';
import { travelStatisticPresenter } from '@adapter/presenters';
import CardTopFavoriteLocation from '@features/Dashboard/ManagerDashboard/components/CardTopFavoriteLocation';
import CardTopProficiencyTour from '@features/Dashboard/ManagerDashboard/components/CardTopProficiencyTour';
import CardGoalOverview from '@features/Dashboard/ManagerDashboard/components/CardGoalOverview';
import moment from 'moment';
import { useQuery } from '@tanstack/react-query';
import { MetricNameEnum, TravelRevenueStatistic } from '@domain/entities/statistic/TravelStatistic';
import CardCustomers from './components/CardCustomers';
import CardRevenueBarChart from './components/CardRevenueBarChart';

export default function ManagerDashboard() {
  // Get current date
  const currentDate = moment();
  const currentMonth = moment().month();

  // Get start and end of previous month
  const previousMonthStart = moment(currentDate).subtract(1, 'months').startOf('month').valueOf();
  const previousMonthEnd = moment(currentDate).subtract(1, 'months').endOf('month').valueOf();

  // Get start and end of current month
  const currentMonthStart = currentDate.startOf('month').valueOf();
  const currentMonthEnd = currentDate.endOf('month').valueOf();

  const {
    data: previousMonthRevenue,
  } = useQuery(
    [MetricNameEnum.TOTAL_REVENUE_OF_TENANT],
    async () => travelStatisticPresenter.getTravelStatistic(
      MetricNameEnum.TOTAL_REVENUE_OF_TENANT,
      previousMonthStart.toString(),
      previousMonthEnd.toString(),
    ),
  );

  const {
    data: currentMonthRevenue,
  } = useQuery(
    [MetricNameEnum.TOTAL_REVENUE_OF_TENANT],
    async () => travelStatisticPresenter.getTravelStatistic(
      MetricNameEnum.TOTAL_REVENUE_OF_TENANT,
      currentMonthStart.toString(),
      currentMonthEnd.toString(),
    ),
  );

  useEffect(() => {
    console.log('currentMonthRevenue: ', currentMonthRevenue);
    console.log('previousMonthRevenue: ', previousMonthRevenue);
  }, [currentMonthRevenue, previousMonthRevenue]);

  return (
    <div className="to-table-container">
      <Row className="match-height">
        <Col lg="3" md="6" sm="6">
          <StatsHorizontal
            icon={<User size={21} />}
            color="info"
            stats="13/16"
            statTitle={`${i18n.t('DASHBOARD.NUMBER_EMPLOYEE_ONLINE')}`}
          />
        </Col>
        <Col lg="3" md="6" sm="6">
          <StatsHorizontal
            icon={<MessageSquare size={21} />}
            color="warning"
            stats="16"
            statTitle={i18n.t('DASHBOARD.NUMBER_CHAT_RESPONSE_LESS_2_MINUTES')}
          />
        </Col>
        <Col lg="3" md="6" sm="6">
          <StatsHorizontal
            icon={<MessageSquare size={21} />}
            color="danger"
            stats="3"
            statTitle={i18n.t('DASHBOARD.NUMBER_CHAT_NOT_RESPONSE_THAN_15_MINUTES')}
          />
        </Col>
        <Col lg="3" md="6" sm="6">
          <StatsHorizontal
            icon={<Award size={21} />}
            color="success"
            stats="76%"
            statTitle={i18n.t('DASHBOARD.LEAD_PER_CHAT_SESSION')}
          />
        </Col>
      </Row>
      <Row className="match-height">
        <Col lg="4" md="4" sm="4">
          <CardTopFavoriteTour />
        </Col>
        <Col lg="4" md="4" sm="4">
          <CardTopProficiencyTour />
        </Col>
        <Col lg="4" md="4" sm="4">
          <CardTopFavoriteLocation />
        </Col>
      </Row>
      <Row className="match-height">
        <Col lg="6" md="6" sm="12">
          <CardCustomers />
        </Col>
        <Col lg="6" md="6" sm="12">
          <CardGoalOverview
            goal={97000000}
            completed={previousMonthRevenue
              ? (previousMonthRevenue as TravelRevenueStatistic).totalRevenue : 0}
            month={currentMonth}
          />
        </Col>
      </Row>
      <Row className="match-height">
        <Col lg="12" md="12" sm="12">
          <CardRevenueBarChart
            direction="ltr"
            thisMonthRevenue={currentMonthRevenue
              ? (currentMonthRevenue as TravelRevenueStatistic).totalRevenue : 0}
            lastMonthRevenue={previousMonthRevenue
              ? (previousMonthRevenue as TravelRevenueStatistic).totalRevenue : 0}
          />
        </Col>
      </Row>
      <Row>
        <Col lg="12" md="12" sm="12">
          <ChatSummary />
        </Col>
      </Row>
      <Row>
        <Col lg="12" md="12" sm="12">
          <CardMarketplaceOverview />
        </Col>
      </Row>
    </div>
  );
}
