import StatsHorizontal from '@components/Widgets/Stats/StatsHorizontal';
import i18n from '@config/i18n';
import { Opportunity } from '@domain/entities/opportunity/Opportunity';
import { RootState } from '@redux/store';
import React from 'react';
import {
  Check, UserPlus, Users, X,
} from 'react-feather';
import { useSelector } from 'react-redux';
import { Col, Row } from 'reactstrap';
import OpportunitiesTable from './OpportunitiesTable';

const OpportunitiesList = () => {
  const allOpportunities = useSelector((state: RootState) => state.opportunity.allOpportunities);

  return (
    <div className="app-opps-list">
      <Row>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="primary"
            statTitle={i18n.t('COMMON.TOTAL')}
            icon={<Users size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">{allOpportunities.length}</h3>}
          />
        </Col>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="info"
            statTitle={i18n.t('OPP.INITIALIZED')}
            icon={<UserPlus size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">{allOpportunities.filter((opp: Opportunity) => opp.status === 'INITIALIZED').length}</h3>}
          />
        </Col>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="danger"
            statTitle={i18n.t('OPP.CLOSED_LOST')}
            icon={<X size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">{allOpportunities.filter((opp: Opportunity) => opp.status === 'CLOSED_LOST').length}</h3>}
          />
        </Col>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="success"
            statTitle={i18n.t('OPP.CLOSED_WON')}
            icon={<Check size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">{allOpportunities.filter((opp: Opportunity) => opp.status === 'CLOSED_WON').length}</h3>}
          />
        </Col>
      </Row>
      <OpportunitiesTable />
    </div>
  );
};

export default OpportunitiesList;
