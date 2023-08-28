import React, { useEffect } from 'react';
import {
  Col, Form, Input, Label, Row,
} from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { Controller, useForm, useWatch } from 'react-hook-form';
import i18n from '@config/i18n';
import { PaymentVoucherStatus } from '@domain/entities/paymentVoucher/PaymentVoucher';
import Flatpickr from 'react-flatpickr';
import classNames from 'classnames';
import moment from 'moment/moment';
import FormItemSelect from '@components/Form/FormItemSelect';

export interface PaymentVoucherFilterParams {
  code?: string,
  status?: PaymentVoucherStatus,
  createdDateRange?: Date[],
  dueDateRange?: Date[],
}

export interface PaymentVoucherFilterProps {
  onFilter: (params: PaymentVoucherFilterParams) => void,
}

const paymentVoucherStatusOptions = [
  { label: i18n.t('PAYMENT_VOUCHER.SIGNED'), value: PaymentVoucherStatus.SIGNED },
  { label: i18n.t('PAYMENT_VOUCHER.APPROVED'), value: PaymentVoucherStatus.APPROVED },
  { label: i18n.t('PAYMENT_VOUCHER.TRANSFERRED'), value: PaymentVoucherStatus.TRANSFERRED },
  { label: i18n.t('PAYMENT_VOUCHER.WAIT_FOR_APPROVAL'), value: PaymentVoucherStatus.WAIT_FOR_APPROVAL },
  { label: i18n.t('PAYMENT_VOUCHER.WAIT_FOR_TRANSFER'), value: PaymentVoucherStatus.WAIT_FOR_TRANSFER },
  { label: i18n.t('PAYMENT_VOUCHER.WAIT_FOR_SIGN'), value: PaymentVoucherStatus.WAIT_FOR_SIGN },
];

export default function PaymentVoucherFilter(props: PaymentVoucherFilterProps) {
  const { onFilter } = props;
  const { t } = useTranslation();
  const { control } = useForm<PaymentVoucherFilterParams>();
  const values = useWatch({ control });
  useEffect(() => {
    onFilter(values);
  }, [values]);

  return (
    <Form>
      <Row>
        <Col>
          <Label>{t('PAYMENT_VOUCHER.CODE')}</Label>
          <Controller
            control={control}
            name="code"
            render={({ field }) => (
              <Input {...field} />
            )}
          />
        </Col>
        <Col>
          <Label>{t('PAYMENT_VOUCHER.STATUS')}</Label>
          <FormItemSelect
            control={control}
            name="status"
            options={paymentVoucherStatusOptions}
            isClearable
            errors={{}}
          />
        </Col>
        <Col>
          <Label>{t('PAYMENT_VOUCHER.CREATED_DATE_RANGE')}</Label>
          <Controller
            control={control}
            name="createdDateRange"
            render={({ field }) => (
              <Flatpickr
                {...field}
                className={classNames('form-control')}
                id="createdDateRange"
                options={{
                  formatDate: (date) => moment(date).format('DD/MM/YYYY'),
                  mode: 'range',
                }}
              />
            )}
          />
        </Col>
        <Col>
          <Label>{t('PAYMENT_VOUCHER.DUE_DATE_RANGE')}</Label>
          <Controller
            control={control}
            name="dueDateRange"
            render={({ field }) => (
              <Flatpickr
                {...field}
                className={classNames('form-control')}
                id="dueDateRange"
                options={{
                  formatDate: (date) => moment(date).format('DD/MM/YYYY'),
                  mode: 'range',
                }}
              />
            )}
          />
        </Col>
      </Row>
    </Form>
  );
}
