// ** React Imports
import React, { useEffect, useState } from 'react';
import * as Icon from 'react-feather';
import i18n from 'i18next';

import { marketplaceStatisticPresenter } from '@adapter/presenters';
import { OrganizationStatistic } from '@domain/entities/statistic/MarketplaceStatistic';
import CardTransactions, { CardTransaction } from '@features/Dashboard/components/CardTransactions';
import { Col, Row } from 'reactstrap';
import { formatVND } from '@utils/CommonUtils';

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
      title: i18n.t('DASHBOARD.TOTAL_POSTS'),
      color: 'light-success',
      amount: orgStatistic?.totalPosts,
      Icon: Icon.Pocket,
    },
    {
      title: i18n.t('DASHBOARD.TOTAL_SENT_OFFERS_REVENUE'),
      color: 'light-success',
      amount: formatVND(orgStatistic?.totalSentOffersRevenue ?? 0),
      Icon: Icon.DollarSign,
    },
    {
      title: i18n.t('DASHBOARD.TOTAL_RECEIVED_OFFERS_REVENUE'),
      color: 'light-success',
      amount: formatVND(orgStatistic?.totalReceivedOffersRevenue ?? 0),
      Icon: Icon.DollarSign,
    },
    {
      title: '',
    },
  ];

  const secondSection: CardTransaction[] = [
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
