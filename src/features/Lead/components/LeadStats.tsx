import React from 'react';
import {
  Card, CardBody, CardHeader, CardTitle, Row,
} from 'reactstrap';
import i18n from '@config/i18n';
import {
  Check, Loader, UserPlus, Users, X,
} from 'react-feather';
import LeadStatsItem from '@features/Lead/components/LeadStatsItem';

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
    <Card className="card-statistics">
      <CardHeader>
        <CardTitle tag="h4">{i18n.t('COMMON.STATISTICS')}</CardTitle>
      </CardHeader>
      <CardBody className="statistics-body">
        <Row>
          <LeadStatsItem
            color="light-primary"
            icon={<Users size={20} />}
            title={total.toString()}
            subtitle={i18n.t('COMMON.TOTAL')}
          />
          <LeadStatsItem
            color="light-info"
            icon={<UserPlus size={20} />}
            title={countNew.toString()}
            subtitle={i18n.t('LEAD.NEW')}
          />
          <LeadStatsItem
            color="light-warning"
            icon={<Loader size={20} />}
            title={countProcessing.toString()}
            subtitle={i18n.t('LEAD.PROCESSING')}
          />
          <LeadStatsItem
            color="light-success"
            icon={<Check size={20} />}
            title={countClosed.toString()}
            subtitle={i18n.t('LEAD.CLOSED')}
          />
          <LeadStatsItem
            color="light-danger"
            icon={<X size={20} />}
            title={countCancelled.toString()}
            subtitle={i18n.t('LEAD.CANCEL')}
          />
        </Row>
      </CardBody>
    </Card>
  );
}
