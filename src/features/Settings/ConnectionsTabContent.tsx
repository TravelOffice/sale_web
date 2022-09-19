import React from 'react';
import { Col, Row } from 'reactstrap';
import AccountConnection from '@features/Settings/connections/account/AccountConnection';
import MailConnection from '@features/Settings/connections/mail/MailConnection';

export default function ConnectionsTabContent() {
  return (
    <Row>
      <Col md={6}>
        <AccountConnection />
      </Col>
      <Col md={6}>
        <MailConnection />
      </Col>
    </Row>
  );
}
