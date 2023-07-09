import React from 'react';
import {
  Card, CardBody, CardHeader, CardTitle, Row,
} from 'reactstrap';
import i18n from '@config/i18n';
import { User } from 'react-feather';
import CustomerStatsItem from '@features/Customer/components/CustomerStatsItem';

export interface CustomerStatsProps {
  total: number,
  countStandard: number,
  countVip: number,
  countVVip: number,
}

export default function CustomerStats(props: CustomerStatsProps) {
  const {
    total, countStandard, countVip, countVVip,
  } = props;
  return (
    <Card className="card-statistics">
      <CardHeader>
        <CardTitle tag="h4">{i18n.t('COMMON.STATISTICS')}</CardTitle>
      </CardHeader>
      <CardBody className="statistics-body">
        <Row>
          <CustomerStatsItem
            color="light-primary"
            icon={<User size={20} />}
            title={total.toString()}
            subtitle={i18n.t('COMMON.TOTAL')}
          />
          <CustomerStatsItem
            color="light-success"
            icon={<User size={20} />}
            title={countStandard.toString()}
            subtitle={i18n.t('CUSTOMER.STANDARD')}
          />
          <CustomerStatsItem
            color="light-warning"
            icon={<User size={20} />}
            title={countVip.toString()}
            subtitle={i18n.t('CUSTOMER.VIP')}
          />
          <CustomerStatsItem
            color="light-danger"
            icon={<User size={20} />}
            title={countVVip.toString()}
            subtitle={i18n.t('CUSTOMER.VVIP')}
          />
        </Row>
      </CardBody>
    </Card>
  );
}
