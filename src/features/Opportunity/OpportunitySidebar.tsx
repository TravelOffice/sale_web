import React, { useCallback, useMemo } from 'react';
import SidebarForm, { FormSchema } from '@components/SidebarForm/SidebarForm';
import {
  Opportunity,
  opportunityPotentials,
  opportunitySources,
  opportunityStatuses,
} from '@domain/entities/opportunity/Opportunity';
import { useLeadAndCustomers } from '@hooks/customer';
import * as yup from 'yup';
import i18n from '@config/i18n';
import moment from 'moment';
import { DATE_FORMAT } from '@utils/Constants';
import { UnpackNestedValue } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { opportunityActions } from '@redux/slices/opportunitySlice';
import { getLeadById } from '@utils/LeadUtils';
import { RootState } from '@redux/store';
import { Customer, Lead } from '@domain/entities/Lead';

type OmitFields = 'customer' | 'closedLostReason' | 'actualCloseDate' | 'createdAt' | 'updatedAt' | 'notes' | 'task' | 'id' | 'leadName';
type OmittedOpportunityFormData = Omit<Opportunity, OmitFields>;
type FormData<T> = {
  [K in keyof T]: T[K] extends Date ? string : T[K]
};
type OpportunityFormData = FormData<OmittedOpportunityFormData>;

export interface OpportunitySidebarProps {
  toggleSidebar: () => void,
  open: boolean,
  opportunity?: Opportunity,
  onClosed: () => void,
  leadDetailId?: string,
}

const defaultValues: OpportunityFormData = {
  name: '',
  leadId: '',
  description: '',
  estimatedConfirmDate: moment().format(DATE_FORMAT),
  source: 'MARKETING',
  status: 'INITIALIZED',
  potential: 'MEDIUM',
  estimatedRevenue: 0,
};

function useSchema(leadsAndCustomers: Array<Lead | Customer>, leadDetailId: string | undefined) {
  const schema: FormSchema<OpportunityFormData> = useMemo(() => ({
    leadId: {
      type: 'select',
      label: i18n.t('OPP.CUSTOMER'),
      required: true,
      options: leadsAndCustomers.map((lead) => ({
        label: `${lead.name} ${lead.primaryPhoneNumber}`,
        value: lead.primaryPhoneNumber,
      })),
      validator: yup.string().required(i18n.t('OPP.FIELD_IS_REQUIRED', { field: i18n.t('OPP.CUSTOMER') })).oneOf(
        leadsAndCustomers.map((lead) => lead.primaryPhoneNumber),
      ),
      disabled: leadDetailId,
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
  }), [leadsAndCustomers]);
  return schema;
}

export default function OpportunitySidebar(props: OpportunitySidebarProps) {
  const {
    toggleSidebar, onClosed, open, opportunity, leadDetailId,
  } = props;
  const leadsAndCustomers = useLeadAndCustomers();
  const createOrUpdateOpportunityLoading = useSelector((
    state: RootState,
  ) => state.opportunity.createOrUpdateOpportunityLoading);
  const schema = useSchema(leadsAndCustomers, leadDetailId);
  const dispatch = useDispatch();
  const opportunityFormData: OpportunityFormData = useMemo(() => {
    if (opportunity) {
      // Edit opportunity
      return ({
        ...opportunity,
        estimatedConfirmDate: moment(opportunity.estimatedConfirmDate).format(DATE_FORMAT),
      });
    }
    // Create new opportunity
    return ({
      ...defaultValues,
      leadId: leadDetailId || '',
    });
  }, [opportunity, open]);
  const onSubmit = useCallback((formData: UnpackNestedValue<OpportunityFormData>) => {
    if (opportunity) {
      // Submit form to update the opportunity
      dispatch(opportunityActions.updateOpportunity({
        ...opportunity,
        ...formData,
      }));
    } else {
      // Submit form to create a new opportunity
      dispatch(opportunityActions.createOpportunity({
        ...formData,
        leadName: getLeadById(leadsAndCustomers, formData.leadId)?.name!,
      }));
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
      submitting={createOrUpdateOpportunityLoading}
    />
  );
}
