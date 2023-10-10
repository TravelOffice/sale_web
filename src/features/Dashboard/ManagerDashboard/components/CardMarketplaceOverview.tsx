// ** React Imports
import React, { useEffect, useState } from 'react';
import * as Icon from 'react-feather';
import i18n from 'i18next';

import { marketplaceStatisticPresenter } from '@adapter/presenters';
import { OrganizationStatistic } from '@domain/entities/statistic';
import CardTransactions, { CardTransaction } from '@features/Dashboard/components/CardTransactions';
import { Col, Row } from 'reactstrap';

const formatter = new Intl.NumberFormat('it-IT', {
  style: 'currency',
  currency: 'VND',
});

const CardMarketplace = () => {
  const [orgStatistic, setOrgStatistic] = useState<OrganizationStatistic>();

  useEffect(() => {
    marketplaceStatisticPresenter.getStatistic();
    marketplaceStatisticPresenter
      .getStatisticByOrg('pys')
      .then((res) => {
        setOrgStatistic(res);
      })
      .catch((err) => console.error(err));
  }, []);

  const firstSection: CardTransaction[] = [
    {
      title: i18n.t('DASHBOARD.TOTAL_OFFERS_ON_TRAVEL_CONNECT'),
      color: 'light-success',
      amount: 876,
      Icon: Icon.Pocket,
    },
    {
      title: i18n.t('DASHBOARD.TOTAL_POSTS'),
      color: 'light-success',
      amount: orgStatistic?.totalPosts,
      Icon: Icon.Pocket,
    },
    {
      title: i18n.t('DASHBOARD.REVENUE_ON_TRAVEL_CONNECT'),
      color: 'light-success',
      amount: formatter.format(657000000),
      Icon: Icon.DollarSign,
    },
    {
      title: i18n.t('DASHBOARD.TOTAL_SENT_OFFERS_REVENUE'),
      color: 'light-success',
      amount: formatter.format(orgStatistic?.totalSentOffersRevenue ?? 0),
      Icon: Icon.DollarSign,
    },
    {
      title: i18n.t('DASHBOARD.TOTAL_RECEIVED_OFFERS_REVENUE'),
      color: 'light-success',
      amount: formatter.format(orgStatistic?.totalReceivedOffersRevenue ?? 0),
      Icon: Icon.DollarSign,
    },
    {
      title: '',
    },
  ];

  const secondSection: CardTransaction[] = [
    {
      title: i18n.t('DASHBOARD.TOTAL_OFFERS'),
      color: 'light-warning',
      amount: orgStatistic?.totalOffers,
      Icon: Icon.CreditCard,
      textColorClass: 'text-warning',
    },
    {
      title: i18n.t('DASHBOARD.TOTAL_RECEIVED_OFFERS'),
      color: 'light-warning',
      amount: orgStatistic?.totalReceivedOffers,
      Icon: Icon.CreditCard,
      textColorClass: 'text-warning',
    },
    {
      title: i18n.t('DASHBOARD.TOTAL_SENT_OFFERS'),
      color: 'light-warning',
      amount: orgStatistic?.totalSentOffers,
      Icon: Icon.CreditCard,
      textColorClass: 'text-warning',
    },
    {
      title: i18n.t('DASHBOARD.TOTAL_SUCCESS_OFFERS'),
      color: 'light-warning',
      amount: orgStatistic?.totalSuccessOffers,
      Icon: Icon.CreditCard,
      textColorClass: 'text-warning',
    },
    {
      title: i18n.t('DASHBOARD.TOTAL_SUCCESS_SENT_OFFERS'),
      color: 'light-warning',
      amount: orgStatistic?.totalSuccessSentOffers,
      Icon: Icon.CreditCard,
      textColorClass: 'text-warning',
    },
    {
      title: i18n.t('DASHBOARD.TOTAL_SUCCESS_RECEIVED_OFFERS'),
      color: 'light-warning',
      amount: orgStatistic?.totalSuccessReceivedOffers,
      Icon: Icon.CreditCard,
      textColorClass: 'text-warning',
    },
  ];

  return (
    <Row>
      <Col lg="6" md="12" sm="12">
        <CardTransactions
          data={firstSection as any}
          title={i18n.t('DASHBOARD.REVENUE_ON_TRAVEL_CONNECT')}
        />
      </Col>
      <Col lg="6" md="12" sm="12">
        <CardTransactions
          data={secondSection as any}
          title={i18n.t('DASHBOARD.OFFER_STATISTICAL')}
        />
      </Col>
    </Row>
  );
};
export default CardMarketplace;
