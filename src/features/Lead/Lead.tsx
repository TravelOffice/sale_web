// ** Custom Components
import StatsHorizontal from '@components/Widgets/Stats/StatsHorizontal';
import i18n from '@config/i18n';
// ** Styles
import '@styles/react/apps/app-leads.scss';
import React from 'react';
// ** Icons Imports
import {
  User, UserCheck, UserPlus,
} from 'react-feather';
// ** Reactstrap Imports
import { Col, Row } from 'reactstrap';
import Table from './Table';

const LeadsList = () => (
  <div className="app-lead-list">
    <Row>
      <Col lg="3" sm="6">
        <StatsHorizontal
          color="primary"
          statTitle={i18n.t('COMMON.TOTAL')}
          icon={<User size={20} />}
          renderStats={<h3 className="fw-bolder mb-75">21,459</h3>}
        />
      </Col>
      <Col lg="3" sm="6">
        <StatsHorizontal
          color="info"
          statTitle={i18n.t('LEAD.NEW')}
          icon={<UserPlus size={20} />}
          renderStats={<h3 className="fw-bolder mb-75">4,567</h3>}
        />
      </Col>
      <Col lg="3" sm="6">
        <StatsHorizontal
          color="warning"
          statTitle={i18n.t('LEAD.QUALIFYING')}
          icon={<UserPlus size={20} />}
          renderStats={<h3 className="fw-bolder mb-75">19,860</h3>}
        />
      </Col>
      <Col lg="3" sm="6">
        <StatsHorizontal
          color="success"
          statTitle={i18n.t('LEAD.QUALIFIED')}
          icon={<UserCheck size={20} />}
          renderStats={<h3 className="fw-bolder mb-75">237</h3>}
        />
      </Col>
    </Row>
    <Table />
  </div>
);

export default LeadsList;
