// ** Custom Components
// ** Icons Imports
import StatsHorizontal from '@components/Widgets/Stats/StatsHorizontal';
import i18n from '@config/i18n';
import { Customer } from '@domain/entities/Lead';
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
import CustomerTable from './CustomerTable';

const CustomerList = () => {
  const allCustomers = useSelector((state: RootState) => state.customer.allCustomers);
  return (
    <div className="app-lead-list">
      <Row>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="primary"
            statTitle={i18n.t('COMMON.TOTAL')}
            icon={<Users size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">{allCustomers.length}</h3>}
          />
        </Col>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="info"
            statTitle={i18n.t('CUSTOMER.NEW')}
            icon={<UserPlus size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">{allCustomers.filter((customer: Customer) => customer.status === 'NEW').length}</h3>}
          />
        </Col>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="warning"
            statTitle={i18n.t('CUSTOMER.TRADING')}
            icon={<Clock size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">{allCustomers.filter((customer: Customer) => customer.status === 'TRADING').length}</h3>}
          />
        </Col>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="success"
            statTitle={i18n.t('CUSTOMER.TRADED')}
            icon={<Check size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">{allCustomers.filter((customer: Customer) => customer.status === 'TRADED').length}</h3>}
          />
        </Col>
      </Row>
      <CustomerTable />
    </div>
  );
};

export default CustomerList;
