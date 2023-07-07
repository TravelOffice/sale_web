import React from 'react';
import {
  Card, CardBody, CardHeader, CardTitle, Row,
} from 'reactstrap';
import i18n from '@config/i18n';
import StatisticItem, { StatisticItemProps } from '@components/Statistics/StatisticItem';

export interface StatisticProps {
  items: StatisticItemProps[]
}

export default function Statistics(props: StatisticProps) {
  const { items } = props;
  return (
    <Card className="card-statistics">
      <CardHeader>
        <CardTitle tag="h4">{i18n.t('COMMON.STATISTICS')}</CardTitle>
      </CardHeader>
      <CardBody className="statistics-body">
        <Row>
          {items && items.map((item) => (
            <StatisticItem
              key={`statistic-item-${item.subtitle}}`}
              color={item.color}
              icon={item.icon}
              title={item.title}
              subtitle={item.subtitle}
            />
          ))}
        </Row>
      </CardBody>
    </Card>
  );
}
