import React, { useEffect } from 'react';
import {
  Col, Form, Input, Label, Row,
} from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { Controller, useForm, useWatch } from 'react-hook-form';
import Select from 'react-select';
import i18n from '@config/i18n';
import { CustomerLevel } from '@domain/entities/customer/Customer';
import FormItemSelect from '@components/Form/FormItemSelect';
import { generateUserDisplayNameOption } from '@utils/UserUtils';
import { useAllSales } from '@hooks/users';
import { useCurrentUser } from '@hooks/auth';

export interface CustomerFilterParams {
  code?: string,
  name?: string,
  phoneNumber?: string,
  assignee?: string,
  creator?: string,
  level?: string,
}

export interface CustomerFilterProps {
  onFilter: (params: CustomerFilterParams) => void,
}

const levelOptions = [
  { label: i18n.t('CUSTOMER.ALL'), value: '' },
  { label: i18n.t('CUSTOMER.STANDARD'), value: CustomerLevel.STANDARD },
  { label: i18n.t('CUSTOMER.VIP'), value: CustomerLevel.VIP },
  { label: i18n.t('CUSTOMER.VVIP'), value: CustomerLevel.VVIP },
];

export default function CustomerFilter(props: CustomerFilterProps) {
  const { onFilter } = props;
  const { t } = useTranslation();
  const { control } = useForm<CustomerFilterParams>();
  const values = useWatch({ control });
  const { data: sales = [] } = useAllSales();
  const currentUser = useCurrentUser();

  useEffect(() => {
    onFilter(values);
  }, [values]);
  return (
    <Form>
      <Row>
        <Col>
          <Label>{t('CUSTOMER.CODE')}</Label>
          <Controller
            control={control}
            name="code"
            render={({ field }) => (
              <Input {...field} />
            )}
          />
        </Col>
        <Col>
          <Label>{t('CUSTOMER.NAME')}</Label>
          <Controller
            control={control}
            name="name"
            render={({ field }) => (
              <Input {...field} />
            )}
          />
        </Col>
        <Col>
          <Label>{t('CUSTOMER.PHONE')}</Label>
          <Controller
            control={control}
            name="phoneNumber"
            render={({ field }) => (
              <Input {...field} />
            )}
          />
        </Col>
        <Col>
          <Label>{t('LEAD.ASSIGNEE')}</Label>
          <FormItemSelect
            control={control}
            name="assignee"
            errors={{}}
            isClearable
            options={sales.map((sale) => ({
              label: generateUserDisplayNameOption(sale, currentUser),
              value: sale.username,
            }))}
          />
        </Col>
        <Col>
          <Label>{t('CUSTOMER.CREATOR')}</Label>
          <Controller
            control={control}
            name="creator"
            render={({ field }) => (
              <Input {...field} />
            )}
          />
        </Col>
        <Col>
          <Label>{t('CUSTOMER.LEVEL')}</Label>
          <Controller
            control={control}
            name="level"
            render={({ field: { onChange, value, ...rest } }) => (
              <Select
                {...rest}
                options={levelOptions}
                value={{
                  label: levelOptions.find((option) => option.value === value)?.label,
                  value,
                }}
                onChange={(newValue) => onChange(newValue?.value)}
              />
            )}
          />
        </Col>
      </Row>
    </Form>
  );
}
