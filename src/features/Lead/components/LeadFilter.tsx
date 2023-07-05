import React, { useEffect } from 'react';
import {
  Col, Form, Label, Row,
} from 'reactstrap';
import { LeadStatus } from '@domain/entities/lead/Lead';
import { useTranslation } from 'react-i18next';
import { useForm, useWatch } from 'react-hook-form';
import i18n from '@config/i18n';
import FormItemInput from '@components/Form/FormItemInput';
import FormItemSelect from '@components/Form/FormItemSelect';
import { useAllSales } from '@hooks/users';
import { generateUserDisplayNameOption } from '@utils/UserUtils';
import { useCurrentUser } from '@hooks/auth';

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
  const { control, setValue } = useForm<LeadFilterParams>();
  const values = useWatch({ control });
  const { data: sales = [] } = useAllSales();
  const currentUser = useCurrentUser();

  useEffect(() => {
    onFilter(values);
  }, [values]);

  useEffect(() => {
    setValue('assignee', currentUser?.username);
  }, [currentUser]);

  return (
    <Form>
      <Row>
        <Col>
          <Label>{t('LEAD.NAME')}</Label>
          <FormItemInput control={control} name="name" errors={{}} />
        </Col>
        <Col>
          <Label>{t('LEAD.PHONE')}</Label>
          <FormItemInput control={control} name="phoneNumber" errors={{}} />
        </Col>
        <Col>
          <Label>{t('COMMON.STATUS')}</Label>
          <FormItemSelect
            control={control}
            name="status"
            options={statusOptions}
            isClearable
            errors={{}}
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
          <Label>{t('LEAD.CREATOR')}</Label>
          <FormItemSelect
            control={control}
            name="creator"
            errors={{}}
            isClearable
            options={sales.map((sale) => ({
              label: generateUserDisplayNameOption(sale, currentUser),
              value: sale.username,
            }))}
          />
        </Col>
      </Row>
    </Form>
  );
}
