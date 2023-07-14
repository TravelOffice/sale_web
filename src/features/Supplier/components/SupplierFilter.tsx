import React, { useEffect } from 'react';
import {
  Col, Form, Input, Label, Row,
} from 'reactstrap';
import { Controller, useForm, useWatch } from 'react-hook-form';
import i18n from '@config/i18n';

export interface SupplierFilterParams {
  name?: string,
  city?: string,
  district?: string,
  address?: string,
  taxId?:string
}

export interface SupplierFilterProps {
  onFilter: (params: SupplierFilterParams) => void,
}

export default function SupplierFilter(props: SupplierFilterProps) {
  const { onFilter } = props;
  const { control } = useForm<SupplierFilterParams>();
  const values = useWatch({ control });
  useEffect(() => {
    onFilter(values);
  }, [values]);
  return (
    <Form>
      <Row>
        <Col>
          <Label>{i18n.t('SUPPLIER.NAME')}</Label>
          <Controller
            control={control}
            name="name"
            render={({ field }) => (
              <Input {...field} />
            )}
          />
        </Col>
        <Col>
          <Label>{i18n.t('SUPPLIER.CITY')}</Label>
          <Controller
            control={control}
            name="city"
            render={({ field }) => (
              <Input {...field} />
            )}
          />
        </Col>
        <Col>
          <Label>{i18n.t('SUPPLIER.DISTRICT')}</Label>
          <Controller
            control={control}
            name="district"
            render={({ field }) => (
              <Input {...field} />
            )}
          />
        </Col>
        <Col>
          <Label>{i18n.t('SUPPLIER.ADDRESS')}</Label>
          <Controller
            control={control}
            name="address"
            render={({ field }) => (
              <Input {...field} />
            )}
          />
        </Col>
        <Col>
          <Label>{i18n.t('SUPPLIER.TAX_ID')}</Label>
          <Controller
            control={control}
            name="taxId"
            render={({ field }) => (
              <Input {...field} />
            )}
          />
        </Col>
      </Row>
    </Form>
  );
}
