// ** React Imports
import React from 'react';

// ** Third Party Components
import { Check, DollarSign } from 'react-feather';

// ** Reactstrap Imports
import { Col, Row } from 'reactstrap';
import i18n from 'i18next';
import Statistics from '@components/Statistics/Statistics';

const CardMarketplace = () => (
  <>
    <Row>
      <Col lg="12" md="12" sm="12">
        <Statistics
          title={i18n.t('DASHBOARD.TRAVEL_CONNECT_STATISTIC')}
          items={[{
            color: 'light-info',
            icon: <Check size={24} />,
            title: '876',
            subtitle: i18n.t('DASHBOARD.TOTAL_OFFERS_ON_TRAVEL_CONNECT'),
          },
          {
            color: 'light-success',
            icon: <DollarSign size={24} />,
            title: '657',
            subtitle: i18n.t('DASHBOARD.REVENUE_ON_TRAVEL_CONNECT'),
          },
          ]}
        />
      </Col>
    </Row>
  </>
);
export default CardMarketplace;
