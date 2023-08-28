import React, { useEffect } from 'react';
import {
  Col, Form, Input, Label, Row,
} from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { Controller, useForm, useWatch } from 'react-hook-form';
import i18n from '@config/i18n';
import { ReceiptStatus } from '@domain/entities/receipt/Receipt';
import Flatpickr from 'react-flatpickr';
import classNames from 'classnames';
import moment from 'moment/moment';
import FormItemSelect from '@components/Form/FormItemSelect';

export interface ReceiptFilterParams {
  code?: string,
  paymentMethod?: string,
  status?: ReceiptStatus,
  description?: string,
  dateRange?: Date[],
}

export interface ReceiptFilterProps {
  onFilter: (params: ReceiptFilterParams) => void,
}

const receiptStatusOptions = [
  { label: i18n.t('RECEIPT.OPEN'), value: ReceiptStatus.OPEN },
  { label: i18n.t('RECEIPT.CLOSED'), value: ReceiptStatus.CLOSED },
];

export default function ReceiptFilter(props: ReceiptFilterProps) {
  const { onFilter } = props;
  const { t } = useTranslation();
  const { control } = useForm<ReceiptFilterParams>();
  const values = useWatch({ control });
  useEffect(() => {
    onFilter(values);
  }, [values]);

  return (
    <Form>
      <Row>
        <Col>
          <Label>{t('RECEIPT.CODE')}</Label>
          <Controller
            control={control}
            name="code"
            render={({ field }) => (
              <Input {...field} />
            )}
          />
        </Col>
        <Col>
          <Label>{t('RECEIPT.STATUS')}</Label>
          <FormItemSelect
            control={control}
            name="status"
            options={receiptStatusOptions}
            isClearable
            errors={{}}
          />
        </Col>
        <Col>
          <Label>{t('RECEIPT.DESCRIPTION')}</Label>
          <Controller
            control={control}
            name="description"
            render={({ field }) => (
              <Input {...field} />
            )}
          />
        </Col>
        <Col>
          <Label>{t('RECEIPT.CREATED_DATE_RANGE')}</Label>
          <Controller
            control={control}
            name="dateRange"
            render={({ field }) => (
              <Flatpickr
                {...field}
                className={classNames('form-control')}
                id="dateRange"
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
