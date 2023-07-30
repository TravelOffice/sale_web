import React from 'react';
import i18n from '@config/i18n';
import { TableColumn } from 'react-data-table-component';
import { generateI18nForLead } from '@utils/LeadUtils';
import { CustomerWithBookingData } from '@domain/entities/customer/Customer';

const customerPaneColumns: TableColumn<CustomerWithBookingData>[] = [
  {
    name: i18n.t('CUSTOMER.NAME'),
    minWidth: '150px',
    cell: (customer: CustomerWithBookingData) => (
      <div className="d-flex justify-content-left align-items-center">
        <div className="d-flex flex-column">
          <span className="fw-bolder text-primary pb-0">
            <small className="text-truncate text-muted">
              {' '}
              {customer?.honorific ? `(${generateI18nForLead(customer.honorific)})` : ''}
            </small>
            {' '}
            {customer?.name}
          </span>
        </div>
      </div>
    ),
  },
  {
    name: i18n.t('CUSTOMER.BIRTHDAY'),
    cell: (customer: CustomerWithBookingData) => customer?.birthday,
  },
  {
    name: i18n.t('CUSTOMER.PHONE'),
    minWidth: '150px',
    cell: (customer: CustomerWithBookingData) => customer?.primaryPhoneNumber,
  },
  {
    name: i18n.t('BOOKING.TOTAL_PAX'),
    minWidth: '150px',
    cell: (customer: CustomerWithBookingData) => customer.services.reduce(
      (total, item) => total + item.quantity,
      0,
    ),
  },
  {
    name: i18n.t('CUSTOMER.ASSIGNEE'),
    minWidth: '200px',
    cell: (customer: CustomerWithBookingData) => customer.assigneeName,
  },
];

export default customerPaneColumns;
