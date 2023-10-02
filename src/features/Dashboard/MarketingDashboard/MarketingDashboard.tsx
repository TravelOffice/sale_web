import React from 'react';
import { Col, Row } from 'reactstrap';
import CallConversionRate from './components/CallConversionRate';
import ChatSummary from './components/ChatSummary';
import LeadSuccessfulTracking from './components/LeadSuccessfulTracking';

function MarketingDashboard() {
  return (
    <div className="to-table-container">
      <Row className="match-height">
        <Col lg="4" md="4" sm="12">
          <CallConversionRate success="#ff9f43" />
        </Col>
        <Col lg="8" md="8" sm="12">
          <ChatSummary />
        </Col>
      </Row>
      <Row>
        <Col lg="12" md={12} sm="12">
          <LeadSuccessfulTracking />
        </Col>
      </Row>
    </div>
  );
}

export default MarketingDashboard;
