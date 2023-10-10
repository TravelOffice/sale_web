import React from 'react';
import StatsHorizontal from '@components/Widgets/Stats/StatsHorizontal';
import i18n from '@config/i18n';
import CardCustomers from '@features/Dashboard/ManagerDashboard/components/CardCustomers';
import CardGoalOverview from '@features/Dashboard/ManagerDashboard/components/CardGoalOverview';
import CardHighestProfitTopTour from '@features/Dashboard/ManagerDashboard/components/CardHighestProfitTopTour';
import CardInterestingTopTour from '@features/Dashboard/ManagerDashboard/components/CardInterestingTopTour';
import CardMarketplaceOverview from '@features/Dashboard/ManagerDashboard/components/CardMarketplace';
import ChatSummary from '@features/Dashboard/MarketingDashboard/components/ChatSummary';
import { formatVietnameseDate } from '@utils/DateUtils';
import { Award, MessageSquare, User } from 'react-feather';
import { Col, Row } from 'reactstrap';
import CardRevenueBarChart from './components/CardRevenueBarChart';

export default function ManagerDashboard() {
  const currentDate = new Date();
  const currentDateStr = formatVietnameseDate(currentDate);
  const currentMonth = currentDate.getMonth() + 1;
  const topTourStartDate = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000);
  const topTourStartDateStr = formatVietnameseDate(topTourStartDate);

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
      <Row>
        <Col lg="6" md="6" sm="6">
          <CardInterestingTopTour startDate={topTourStartDateStr} endDate={currentDateStr} />
        </Col>
        <Col lg="6" md="6" sm="6">
          <CardHighestProfitTopTour startDate={topTourStartDateStr} endDate={currentDateStr} />
        </Col>
      </Row>
      <Row className="match-height">
        <Col lg="6" md="6" sm="12">
          <CardCustomers />
        </Col>
        <Col lg="6" md="6" sm="12">
          <CardGoalOverview goal={97000000} completed={30000000} month={currentMonth} />
        </Col>
      </Row>
      <Row className="match-height">
        <Col lg="12" md="12" sm="12">
          <CardRevenueBarChart
            direction="ltr"
            thisMonthRevenue={30000000}
            lastMonthRevenue={67000000}
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
