import React, { useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import {
  Col, Form, Label, Row,
} from 'reactstrap';
import i18n from '@config/i18n';
import FormItemInput from '@components/Form/FormItemInput';

export interface SourceFilterParams {
  code: string,
  name: string,
}

export interface SourceFilterProps {
  onFilter: (params: Partial<SourceFilterParams>) => void,
}

export default function SourceFilter(props: SourceFilterProps) {
  const { onFilter } = props;
  const { control, formState: { errors } } = useForm<SourceFilterParams>();
  const values = useWatch({ control });

  useEffect(() => {
    onFilter(values);
  }, [values]);

  return (
    <Form>
      <Row>
        <Col md={6}>
          <Label>{i18n.t('SOURCE.CODE')}</Label>
          <FormItemInput control={control} name="code" errors={errors} />
        </Col>
        <Col md={6}>
          <Label>{i18n.t('SOURCE.NAME')}</Label>
          <FormItemInput control={control} name="name" errors={errors} />
        </Col>
      </Row>
    </Form>
  );
}
