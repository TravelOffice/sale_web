import React, { useCallback, useMemo } from 'react';
import SidebarForm, { FormSchema } from '@components/SidebarForm/SidebarForm';
import {
  Opportunity,
  opportunityPotentials,
  opportunitySources,
  opportunityStatuses,
} from '@domain/entities/opportunity/Opportunity';
import { useCustomers } from '@hooks/customer';
import * as yup from 'yup';
import i18n from '@config/i18n';
import moment from 'moment';
import { DATE_FORMAT } from '@utils/Constants';
import { UnpackNestedValue } from 'react-hook-form';

type OmitFields = 'customer' | 'closedLostReason' | 'actualCloseDate' | 'createdAt' | 'updatedAt' | 'notes' | 'task' | 'id' | 'leadId' | 'leadName';
type CustomerId = { customer: string };
type OmittedOpportunityFormData = Omit<Opportunity, OmitFields> & CustomerId;
type FormData<T> = {
  [K in keyof T]: T[K] extends Date ? string : T[K]
};
type OpportunityFormData = FormData<OmittedOpportunityFormData>;

export interface OpportunitySidebarProps {
  toggleSidebar: () => void,
  open: boolean,
  opportunity?: Opportunity,
  onClosed: () => void,
}

const defaultValues : OpportunityFormData = {
  name: '',
  customer: '',
  description: '',
  estimatedConfirmDate: moment().format(DATE_FORMAT),
  source: 'MARKETING',
  status: 'INITIALIZED',
  potential: 'MEDIUM',
  estimatedRevenue: 0,
};

export default function OpportunitySidebar(props: OpportunitySidebarProps) {
  const {
    toggleSidebar, onClosed, open, opportunity,
  } = props;
  const [customers] = useCustomers();
  const opportunityFormData : OpportunityFormData = useMemo(() => {
    if (opportunity) {
      // Edit opportunity
      return ({
        ...opportunity,
        customer: opportunity.leadId,
        estimatedConfirmDate: moment(opportunity.estimatedConfirmDate).format(DATE_FORMAT),
      });
    }
    return ({
      ...defaultValues,
      name: '',
    });
  }, [opportunity]);
  const schema : FormSchema<OpportunityFormData> = useMemo(() => ({
    customer: {
      type: 'select',
      label: i18n.t('OPP.CUSTOMER'),
      required: true,
      options: customers.map((customer) => ({
        label: `${customer.name} ${customer.primaryPhoneNumber}`,
        value: customer.primaryPhoneNumber,
      })),
      validator: yup.string().required().oneOf(
        customers.map((customer) => customer.primaryPhoneNumber),
      ),
    },
    name: {
      type: 'text',
      label: i18n.t('OPP.NAME'),
      required: true,
      validator: yup.string().required(),
    },
    description: {
      type: 'text',
      label: i18n.t('OPP.DESCRIPTION'),
      required: false,
    },
    source: {
      type: 'select',
      label: i18n.t('OPP.SOURCE'),
      required: true,
      options: opportunitySources.map((source) => ({
        label: i18n.t(`OPP.${source}`),
        value: source,
      })),
      validator: yup.string().required().oneOf(opportunitySources),
    },
    status: {
      type: 'select',
      label: i18n.t('OPP.STATUS'),
      required: true,
      options: opportunityStatuses.map((status) => ({
        label: i18n.t(`OPP.${status}`),
        value: status,
      })),
      validator: yup.string().required().oneOf(opportunityStatuses),
    },
    estimatedRevenue: {
      type: 'number',
      label: i18n.t('OPP.ESTIMATED_REVENUE'),
      required: false,
      validator: yup.number().min(0),
    },
    estimatedConfirmDate: {
      type: 'date',
      label: i18n.t('OPP.ESTIMATED_CONFIRM_DATE'),
      required: false,
      validator: yup.date(),
    },
    potential: {
      type: 'select',
      label: i18n.t('OPP.POTENTIAL_RATE'),
      required: false,
      options: opportunityPotentials.map((potential) => ({
        label: i18n.t(`OPP.${potential}`),
        value: potential,
      })),
      validator: yup.string().oneOf(opportunityPotentials),
    },
    owner: {
      type: 'text',
      label: i18n.t('OPP.OWNER'),
      required: true,
      validator: yup.string().required(),
    },
  }), [customers]);
  const onSubmit = useCallback((formData: UnpackNestedValue<OpportunityFormData>) => {
    console.log('formData', formData);
    if (opportunity) {
      // TODO: Update opportunity
    } else {
      // TODO: Create new opportunity
    }
  }, [opportunity]);
  return (
    <SidebarForm<OpportunityFormData>
      schema={schema}
      open={open}
      defaultValues={opportunityFormData}
      size="lg"
      title={opportunity ? i18n.t('OPP.UPDATE_OPPORTUNITY') : i18n.t('OPP.CREATE_OPPORTUNITY')}
      toggleSidebar={toggleSidebar}
      onClosed={onClosed}
      onSubmit={onSubmit}
    />
  );
}
