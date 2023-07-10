import React, { useEffect } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col, Form, Input, Label, Row,
} from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { Controller, useForm, useWatch } from 'react-hook-form';
import Select from 'react-select';
import i18n from '@config/i18n';
import { BookingStatusEnum } from '@domain/entities/booking/Booking';
import { RefreshCw } from 'react-feather';

export interface BookingFilterParams {
  name?: string,
  phoneNumber?: string,
  code?: string,
  status?: string,
  /**
   * TODO: Implement filter later for these attrs
   */
  tourTemplate?: string,
  source?: string,
}

export interface BookingFilterProps {
  onFilter?: (params: BookingFilterParams) => void,
}

const statusOptions = [
  { label: i18n.t('BOOKING.INITIALIZED'), value: BookingStatusEnum.INITIALIZED },
  { label: i18n.t('BOOKING.IN_PROCESS'), value: BookingStatusEnum.IN_PROCESS },
  { label: i18n.t('BOOKING.CONFIRMED'), value: BookingStatusEnum.CONFIRMED },
  { label: i18n.t('BOOKING.PAYMENT_PENDING'), value: BookingStatusEnum.PAYMENT_PENDING },
  { label: i18n.t('BOOKING.CANCELED'), value: BookingStatusEnum.CANCELED },
  { label: i18n.t('BOOKING.COMPLETED'), value: BookingStatusEnum.COMPLETED },
];

export default function BookingFilter(props: BookingFilterProps) {
  const { onFilter } = props;
  const { t } = useTranslation();
  const { control, reset } = useForm<BookingFilterParams>();
  const values = useWatch({ control });

  useEffect(() => {
    if (onFilter) onFilter(values);
  }, [values]);

  return (
    <Form>
      <Card className="card-filter">
        <CardHeader>
          <CardTitle tag="h4">{i18n.t('COMMON.FILTER')}</CardTitle>
          <Button color="primary" onClick={() => reset({})}>
            <RefreshCw size={14} />
            <span className="align-middle ms-25">{i18n.t('COMMON.FILTER_RESET')}</span>
          </Button>
        </CardHeader>
        <CardBody className="card-filter-body">
          <Row>
            <Col>
              <Label>{t('BOOKING.CODE')}</Label>
              <Controller
                control={control}
                name="code"
                render={({ field }) => (
                  <Input {...field} />
                )}
              />
            </Col>
            <Col>
              <Label>{t('COMMON.STATUS')}</Label>
              <Controller
                control={control}
                name="status"
                render={({ field: { onChange, value, ...rest } }) => (
                  <Select
                    {...rest}
                    options={statusOptions}
                    value={{
                      label: statusOptions.find((option) => option.value === value)?.label,
                      value,
                    }}
                    onChange={(newValue) => onChange(newValue?.value)}
                    isClearable
                  />
                )}
              />
            </Col>
          </Row>
        </CardBody>
      </Card>

    </Form>
  );
}
