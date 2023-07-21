import React, { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { customerPresenter } from '@adapter/presenters';
import i18n from '@config/i18n';
import Statistics from '@components/Statistics/Statistics';
import { StatisticItemProps } from '@components/Statistics/StatisticItem';
import { Check, Loader, Plus } from 'react-feather';
import { AvatarColor } from '@components/Avatar/Avatar';
import { Card, Col, Row } from 'reactstrap';
// import { Link } from 'react-router-dom';
import Table from '@components/Table/Table';
import { useSelector } from 'react-redux';
import { RootState } from '@redux/store';
import { ExpanderComponentProps } from 'react-data-table-component';
import { Customer, CustomerLevel } from '@domain/entities/customer/Customer';
import customerColumns from '@features/Customer/components/CustomerColumns';
import { Link, useHistory } from 'react-router-dom';
import moment from 'moment/moment';
import CustomerFilter, { CustomerFilterParams } from '@features/Customer/components/CustomerFilter';
import { filterCustomers } from '@utils/CustomerUtils';

type CustomerStatisticSettings = {
  [key in CustomerLevel]: { color: AvatarColor, icon: JSX.Element, hidden?: boolean }
};

const customerStatisticSettings: CustomerStatisticSettings = {
  STANDARD: { color: 'light-info', icon: <Plus size={20} /> },
  VIP: { color: 'light-warning', icon: <Loader size={20} /> },
  VVIP: { color: 'light-danger', icon: <Check size={20} /> },
};

function prepareStatisticalItems(customers: Customer[]): StatisticItemProps[] {
  const total = customers.length.toString();
  const items: StatisticItemProps[] = [
    {
      color: 'light-primary', icon: <Loader size={20} />, title: total, subtitle: i18n.t('COMMON.TOTAL'),
    },
  ];
  const filteredItems = Object.entries(customerStatisticSettings)
    .filter(([, setting]) => !setting.hidden)
    .map(([level, setting]) => {
      const { color, icon } = setting;
      const countByLevel = customers.filter((customer) => customer.level === level).length;
      return {
        color,
        icon,
        title: countByLevel.toString(),
        subtitle: i18n.t(`CUSTOMER.${level.toUpperCase()}`),
      };
    });
  return items.concat(filteredItems);
}

const CustomerExpandableRowComponent: React.FC<ExpanderComponentProps<Customer>> = (
  { data }: ExpanderComponentProps<Customer>,
) => (
  <div className="container py-xxl-1">
    <Row>
      <Col xl="6">
        <strong>{i18n.t('CUSTOMER.HISTORY')}</strong>
        {
          data.latestBooking ? (
            <ul>
              <li>
                {i18n.t('CUSTOMER.CREATE_BOOKING')}
              </li>
              <li>
                {i18n.t('CUSTOMER.CREATOR')}
                :
                {' '}
                <Link
                  to={`/apps/users/${data.latestBooking.creatorId}`}
                  className="user_name text-truncate text-body"
                >
                  <span className="fw-bolder text-primary">{data.latestBooking.creatorName}</span>
                </Link>
              </li>
              <li>
                {i18n.t('COMMON.CREATED_AT')}
                :
                {' '}
                {moment(data.latestBooking.createdAt).format('hh:mm:ss DD/MM/YYYY')}
              </li>
              <li>
                {i18n.t('CUSTOMER.BOOKING')}
                :
                {' '}
                <Link to={`/apps/bookings/${data.latestBooking.id}`} className="user_name text-truncate text-body">
                  <span className="fw-bolder text-primary">{data.latestBooking.id}</span>
                </Link>
              </li>
              <li>
                {i18n.t('CUSTOMER.LATEST_SALE')}
                :
                {' '}
                <Link to={`/apps/users/${data.assigneeId}`} className="user_name text-truncate text-body">
                  <span className="fw-bolder text-primary">{data.assigneeName}</span>
                </Link>
              </li>
            </ul>
          ) : <li>{i18n.t('CUSTOMER.EMPTY')}</li>
        }
      </Col>
    </Row>
  </div>
);

export default function CustomerListPage() {
  const [filterParams, setFilterParams] = useState<CustomerFilterParams>();

  const { data: customers } = useQuery(['customers'], async () => customerPresenter.getAllCustomers());

  const hitory = useHistory();

  const filteredCustomers = useMemo(() => {
    if (!customers) return [];
    if (!filterParams) return customers;
    return filterCustomers(customers, filterParams);
  }, [customers, filterParams]);

  const fetchUsersState = useSelector(
    (state: RootState) => state.user.fetchAllUsersState,
  );

  const goToCreateCustomerPage = () => {
    hitory.push('/apps/customers/create');
  };

  return (
    <>
      <Statistics items={prepareStatisticalItems(filteredCustomers)} />
      <Card className="card-filter">
        <CustomerFilter onFilter={(params) => setFilterParams(params)} />
      </Card>
      <Table<Customer>
        selectableRows={false}
        columns={customerColumns}
        fetchDataState={fetchUsersState}
        searchableColumns={['email', 'phoneNumber']}
        sortColumnDefault="createdAt"
        data={filteredCustomers || []}
        expandableRows
        expandableRowsComponent={CustomerExpandableRowComponent}
        toggleAddDataSidebar={goToCreateCustomerPage}
      />
    </>
  );
}
