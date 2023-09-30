import React from 'react';
import { Col, Row } from 'reactstrap';
import StatsHorizontal from '@components/Widgets/Stats/StatsHorizontal';
import { Award, MessageSquare, User } from 'react-feather';
import i18n from '@config/i18n';
import CardHighestProfitTopTour from '@features/Dashboard/ManagerDashboard/components/CardHighestProfitTopTour';
import CardRevenue from '@features/Dashboard/ManagerDashboard/components/CardRevenue';
import CardInterestingTopTour from '@features/Dashboard/ManagerDashboard/components/CardInterestingTopTour';

export default function ManagerDashboard() {
  return (
    <div className="to-table-container">
      <Row>
        <Col lg="3" md={3} sm="6">
          <StatsHorizontal icon={<User size={21} />} color="info" stats="13/16" statTitle={`${i18n.t('DASHBOARD.NUMBER_EMPLOYEE_ONLINE')}`} />
        </Col>
        <Col lg="3" md={3} sm="6">
          <StatsHorizontal icon={<MessageSquare size={21} />} color="warning" stats="16" statTitle={i18n.t('DASHBOARD.NUMBER_CHAT_RESPONSE_LESS_2_MINUTES')} />
        </Col>
        <Col lg="3" md={3} sm="6">
          <StatsHorizontal icon={<MessageSquare size={21} />} color="danger" stats="3" statTitle={i18n.t('DASHBOARD.NUMBER_CHAT_NOT_RESPONSE_THAN_15_MINUTES')} />
        </Col>
        <Col lg="3" md={3} sm="6">
          <StatsHorizontal icon={<Award size={21} />} color="success" stats="76%" statTitle={i18n.t('DASHBOARD.LEAD_PER_CHAT_SESSION')} />
        </Col>
      </Row>
      <Row>
        <Col lg="6" md={6} sm="6">
          <CardInterestingTopTour />
        </Col>
        <Col lg="6" md={6} sm="6">
          <CardHighestProfitTopTour />
        </Col>
      </Row>
      <Row>
        <Col lg="12" md={12} sm="12">
          <CardRevenue />
        </Col>
      </Row>
    </div>
  );
}
