import React from 'react';
import { Col, Row } from 'reactstrap';
import StatsHorizontal from '@components/Widgets/Stats/StatsHorizontal';
import i18n from '@config/i18n';
import {
  Check, Clock, UserPlus, Users,
} from 'react-feather';

export interface LeadStatsProps {
  total: number,
  countNew: number,
  countProcessing: number,
  countClosed: number,
  countCancelled: number,
}

export default function LeadStats(props: LeadStatsProps) {
  const {
    total, countNew, countProcessing, countClosed, countCancelled,
  } = props;
  return (
    <Row>
      <Col lg="2" sm="6">
        <StatsHorizontal
          color="primary"
          statTitle={i18n.t('COMMON.TOTAL')}
          icon={<Users size={20} />}
          renderStats={<h3 className="fw-bolder mb-75">{total}</h3>}
        />
      </Col>
      <Col lg="2" sm="6">
        <StatsHorizontal
          color="info"
          statTitle={i18n.t('LEAD.NEW')}
          icon={<UserPlus size={20} />}
          renderStats={<h3 className="fw-bolder mb-75">{countNew}</h3>}
        />
      </Col>
      <Col lg="2" sm="6">
        <StatsHorizontal
          color="warning"
          statTitle={i18n.t('LEAD.QUALIFIED')}
          icon={<Clock size={20} />}
          renderStats={<h3 className="fw-bolder mb-75">{countProcessing}</h3>}
        />
      </Col>
      <Col lg="2" sm="6">
        <StatsHorizontal
          color="success"
          statTitle={i18n.t('LEAD.QUALIFYING')}
          icon={<Check size={20} />}
          renderStats={<h3 className="fw-bolder mb-75">{countClosed}</h3>}
        />
      </Col>
      <Col lg="2" sm="6">
        <StatsHorizontal
          color="success"
          statTitle={i18n.t('LEAD.TAKING_CARE')}
          icon={<Check size={20} />}
          renderStats={<h3 className="fw-bolder mb-75">{countCancelled}</h3>}
        />
      </Col>
    </Row>
  );
}
