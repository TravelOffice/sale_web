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
import { RootState } from '@redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '@redux/slices/userSlice';
import CardRevenueBarChart from './components/CardRevenueBarChart';
import CardConversionRatio from './components/CardConversionRatio';

export default function ManagerDashboard() {
  const dispatch = useDispatch();

  // Get users
  const users = useSelector((state: RootState) => state.user.allUsers);

  // Get current date
  const currentDate = moment();
  const currentMonthStr = moment().format('MMM');

  // Get start and end of previous month
  const previousMonthStart = moment(currentDate).subtract(1, 'months').startOf('month').valueOf();
  const previousMonthEnd = moment(currentDate).subtract(1, 'months').endOf('month').valueOf();

  // Get start and end of current month
  const currentMonthStart = currentDate.startOf('month').valueOf();
  const currentMonthEnd = currentDate.endOf('month').valueOf();

  useEffect(() => {
    const { getAllUsers } = userActions;
    dispatch(getAllUsers());
  }, []);

  const onlineUsersCount = users.reduce((cur, next) => {
    if (next.status === 'online') return cur + 1;
    return cur;
  }, 0);

  const { data: previousMonthRevenue } = useQuery(
    [`PREVIOUS_MONTH_${MetricNameEnum.TOTAL_REVENUE_OF_TENANT}`],
    async () => travelStatisticPresenter.getTravelStatistic(
      MetricNameEnum.TOTAL_REVENUE_OF_TENANT,
      previousMonthStart.toString(),
      previousMonthEnd.toString(),
    ),
  );

  const { data: currentMonthRevenue } = useQuery(
    [`CURRENT_MONTH_${MetricNameEnum.TOTAL_REVENUE_OF_TENANT}`],
    async () => travelStatisticPresenter.getTravelStatistic(
      MetricNameEnum.TOTAL_REVENUE_OF_TENANT,
      currentMonthStart.toString(),
      currentMonthEnd.toString(),
    ),
  );

  const { data: previousMonthProfit } = useQuery(
    [`PREVIOUS_MONTH_${MetricNameEnum.TOTAL_PROFIT_OF_TENANT}`],
    async () => travelStatisticPresenter.getTravelProfit(
      previousMonthStart.toString(),
      previousMonthEnd.toString(),
    ),
  );

  const { data: currentMonthProfit } = useQuery(
    [`CURRENT_MONTH_${MetricNameEnum.TOTAL_PROFIT_OF_TENANT}`],
    async () => travelStatisticPresenter.getTravelProfit(
      currentMonthStart.toString(),
      currentMonthEnd.toString(),
    ),
  );

  return (
    <div className="to-table-container">
      <Row className="match-height">
        <Col lg="3" md="6" sm="6">
          <StatsHorizontal
            icon={<User size={21} />}
            color="info"
            stats={`${onlineUsersCount}/${users.length}`}
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
          <CardConversionRatio
            monthStr={currentMonthStr}
            startTime={currentMonthStart.toString()}
            endTime={currentMonthEnd.toString()}
          />
          {/* <CardCustomers /> */}
        </Col>
        <Col lg="6" md="6" sm="12">
          <CardGoalOverview
            monthStr={currentMonthStr}
            goal={97000000}
            completed={
              previousMonthRevenue
                ? (previousMonthRevenue as TravelRevenueStatistic).totalRevenue
                : 0
            }
          />
        </Col>
      </Row>
      <Row className="match-height">
        <Col lg="6" md="12" sm="12">
          <CardRevenueBarChart
            title={i18n.t('DASHBOARD.REVENUE')}
            colors={['#ff9f43']}
            direction="ltr"
            thisMonthRevenue={
              currentMonthRevenue ? (currentMonthRevenue as TravelRevenueStatistic).totalRevenue : 0
            }
            lastMonthRevenue={
              previousMonthRevenue
                ? (previousMonthRevenue as TravelRevenueStatistic).totalRevenue
                : 0
            }
          />
        </Col>
        <Col lg="6" md="12" sm="12">
          <CardRevenueBarChart
            title={i18n.t('DASHBOARD.PROFIT')}
            colors={['#28C76F']}
            direction="ltr"
            thisMonthRevenue={currentMonthProfit?.totalProfit ?? 0}
            lastMonthRevenue={previousMonthProfit?.totalProfit ?? 0}
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
