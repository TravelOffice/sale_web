// ** React Imports
import React from 'react';

// ** Third Party Components
import classnames from 'classnames';
import * as Icon from 'react-feather';
import Chart from 'react-apexcharts';

// ** Reactstrap Imports
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from 'reactstrap';
import { ApexOptions } from 'apexcharts';
import i18n from 'i18next';

const CardCustomers = () => {
  const data = {
    last_days: [
      i18n.t('DASHBOARD.LAST_7_DAYS_RANGE'),
      i18n.t('DASHBOARD.LAST_MONTH_RANGE'),
      i18n.t('DASHBOARD.LAST_YEAR_RANGE'),
    ],
    listData: [
      {
        icon: 'Circle',
        iconColor: 'text-primary',
        text: i18n.t('DASHBOARD.NEW_CUSTOMERS'),
        result: 690,
      },
      {
        icon: 'Circle',
        iconColor: 'text-warning',
        text: i18n.t('DASHBOARD.RETURNING_CUSTOMERS'),
        result: 258,
      },
      {
        icon: 'Circle',
        iconColor: 'text-danger',
        text: i18n.t('DASHBOARD.REFERRAL_CUSTOMERS'),
        result: 149,
      },
    ],
  };

  const rangeFilter = [
    i18n.t('DASHBOARD.LAST_7_DAYS_RANGE'),
    i18n.t('DASHBOARD.LAST_MONTH_RANGE'),
    i18n.t('DASHBOARD.LAST_YEAR_RANGE'),
  ];

  const options: ApexOptions = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    labels: [
      i18n.t('DASHBOARD.NEW_CUSTOMERS'),
      i18n.t('DASHBOARD.RETURNING_CUSTOMERS'),
      i18n.t('DASHBOARD.REFERRAL_CUSTOMERS'),
    ],
    dataLabels: {
      enabled: false,
    },
    legend: { show: false },
    stroke: {
      width: 4,
    },
    colors: ['#7367f0', '#ff9f43', '#ea5455'],
  };
  const series = [690, 258, 149];

  const renderChartInfo = () => data.listData.map((item, index) => {
    const IconTag = Icon.Circle;

    return (
      <div
        key={index.toString()}
        className={classnames('d-flex justify-content-between', {
          'mb-1': index !== data.listData.length - 1,
        })}
      >
        <div className="d-flex align-items-center">
          <IconTag
            size={15}
            className={classnames({
              [item.iconColor]: item.iconColor,
            })}
          />
          <span className="fw-bold ms-75">{item.text}</span>
        </div>
        <span>{item.result}</span>
      </div>
    );
  });

  return (
    <Card>
      <CardHeader className="align-items-end">
        <CardTitle tag="h4">{i18n.t('DASHBOARD.CUSTOMERS_STATISTICS')}</CardTitle>
        <UncontrolledDropdown className="chart-dropdown">
          <DropdownToggle color="" className="bg-transparent btn-sm border-0 p-50">
            {i18n.t('DASHBOARD.LAST_7_DAYS_RANGE')}
          </DropdownToggle>
          <DropdownMenu end>
            {rangeFilter.map((item) => (
              <DropdownItem className="w-100" key={item}>
                {item}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </UncontrolledDropdown>
      </CardHeader>
      <CardBody>
        <Chart options={options} series={series} type="pie" height={325} />
        <div className="pt-25">{renderChartInfo()}</div>
      </CardBody>
    </Card>
  );
};
export default CardCustomers;
