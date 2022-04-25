// ** Custom Components
// ** Icons Imports
import StatsHorizontal from '@components/Widgets/Stats/StatsHorizontal';
import i18n from '@config/i18n';
import { Lead } from '@domain/entities/Lead';
import { RootState } from '@redux/store';
// ** Styles
import '@styles/react/apps/app-leads.scss';
import React from 'react';
import {
  Check, Clock, UserPlus, Users,
} from 'react-feather';
import { useSelector } from 'react-redux';
// ** Reactstrap Imports
import { Col, Row } from 'reactstrap';
import LeadTable from './LeadTable';

const LeadList = () => {
  const allLeads = useSelector((state: RootState) => state.lead.allLeads);
  return (
    <div className="app-lead-list">
      <Row>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="primary"
            statTitle={i18n.t('COMMON.TOTAL')}
            icon={<Users size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">{allLeads.length}</h3>}
          />
        </Col>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="info"
            statTitle={i18n.t('LEAD.NEW')}
            icon={<UserPlus size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">{allLeads.filter((lead: Lead) => lead.status === 'NEW').length}</h3>}
          />
        </Col>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="warning"
            statTitle={i18n.t('LEAD.QUALIFYING')}
            icon={<Clock size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">{allLeads.filter((lead: Lead) => lead.status === 'QUALIFYING').length}</h3>}
          />
        </Col>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="success"
            statTitle={i18n.t('LEAD.QUALIFIED')}
            icon={<Check size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">{allLeads.filter((lead: Lead) => lead.status === 'QUALIFIED').length}</h3>}
          />
        </Col>
      </Row>
      <LeadTable />
    </div>
  );
};

export default LeadList;
