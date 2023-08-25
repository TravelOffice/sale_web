import React, { useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import {
  Col, Form, Label, Row,
} from 'reactstrap';
import i18n from '@config/i18n';
import FormItemInput from '@components/Form/FormItemInput';

export interface TourLocationFilterParams {
  code: string,
  name: string,
}

export interface TourLocationFilterProps {
  onFilter: (params: Partial<TourLocationFilterParams>) => void,
}

export default function TourLocationFilter(props: TourLocationFilterProps) {
  const { onFilter } = props;
  const { control, formState: { errors } } = useForm<TourLocationFilterParams>();
  const values = useWatch({ control });

  useEffect(() => {
    onFilter(values);
  }, [values]);

  return (
    <Form>
      <Row>
        <Col md={6}>
          <Label>{i18n.t('TOUR_LOCATION.CODE')}</Label>
          <FormItemInput control={control} name="code" errors={errors} />
        </Col>
        <Col md={6}>
          <Label>{i18n.t('TOUR_LOCATION.NAME')}</Label>
          <FormItemInput control={control} name="name" errors={errors} />
        </Col>
      </Row>
    </Form>
  );
}
