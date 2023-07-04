import React, { useEffect } from 'react';
import {
  Col, Form, Input, Label, Row,
} from 'reactstrap';
import { LeadStatus } from '@domain/entities/lead/Lead';
import { useTranslation } from 'react-i18next';
import { Controller, useForm, useWatch } from 'react-hook-form';
import Select from 'react-select';
import i18n from '@config/i18n';

export interface LeadFilterParams {
  name?: string,
  phoneNumber?: string,
  status?: LeadStatus,
  assignee?: string,
  creator?: string,
}

export interface LeadFilterProps {
  onFilter: (params: LeadFilterParams) => void,
}

const statusOptions = [
  { label: i18n.t('LEAD.NEW'), value: LeadStatus.NEW },
  { label: i18n.t('LEAD.PROCESSING'), value: LeadStatus.PROCESSING },
  { label: i18n.t('LEAD.CLOSED'), value: LeadStatus.CLOSED },
  { label: i18n.t('LEAD.CANCEL'), value: LeadStatus.CANCEL },
];

export default function LeadFilter(props: LeadFilterProps) {
  const { onFilter } = props;
  const { t } = useTranslation();
  const { control } = useForm<LeadFilterParams>();
  const values = useWatch({ control });
  useEffect(() => {
    onFilter(values);
  }, [values]);
  return (
    <Form>
      <Row>
        <Col>
          <Label>{t('LEAD.NAME')}</Label>
          <Controller
            control={control}
            name="name"
            render={({ field }) => (
              <Input {...field} />
            )}
          />
        </Col>
        <Col>
          <Label>{t('LEAD.PHONE')}</Label>
          <Controller
            control={control}
            name="phoneNumber"
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
              />
            )}
          />
        </Col>
        <Col>
          <Label>{t('LEAD.ASSIGNEE')}</Label>
          <Controller
            control={control}
            name="assignee"
            render={({ field }) => (
              <Input {...field} />
            )}
          />
        </Col>
        <Col>
          <Label>{t('LEAD.CREATOR')}</Label>
          <Controller
            control={control}
            name="creator"
            render={({ field }) => (
              <Input {...field} />
            )}
          />
        </Col>
      </Row>
    </Form>
  );
}
