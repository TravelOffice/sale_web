import React, { useCallback, useEffect, useMemo } from 'react';
import SidebarForm, { FormSchema } from '@components/SidebarForm/SidebarForm';
import {
  Lead,
  leadStatuses,
  LeadEnum,
  leadMaritals,
  leadSexes,
  leadSources,
  leadVocatives,
} from '@domain/entities/Lead';
import i18n from '@config/i18n';
import MultiplePhoneNumbersInput from '@components/MultiplePhoneNumbersInput/MultiplePhoneNumbersInput';
import * as yup from 'yup';
import { BIRTHDAYFORMAT, PHONE_NUMBER_VALIDATION_REGEX } from '@utils/Constants';
import {
  getCountries, getCountry, getNationality, getProvinces,
} from '@utils/LeadUtils';
import { UnpackNestedValue } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { leadActions } from '@redux/slices/leadSlice';
import { RootState } from '@redux/store';
import moment from 'moment';

type OmitFields = 'createdAt' | 'updatedAt' | 'assigneeId' | 'assigneeName' | 'creatorId' | 'creatorName' | 'enabled' | 'type';
type LeadFormData = Omit<Lead, OmitFields>;

const countries = getCountries();

const schema : FormSchema<LeadFormData> = {
  name: {
    type: 'text',
    label: i18n.t('LEAD.NAME'),
    required: true,
    validator: yup.string().required(i18n.t('MESSAGE.NAME_REQUIRE_MESSAGE')),
  },
  vocative: {
    type: 'select',
    label: i18n.t('LEAD.VOCATIVE'),
    required: true,
    options: leadVocatives.map((option) => ({
      label: i18n.t(`LEAD.${option}`),
      value: option,
    })),
    validator: yup.string().required(),
  },
  primaryPhoneNumber: {
    type: 'tel',
    label: i18n.t('LEAD.PHONE'),
    required: true,
    validator: yup.string().required(i18n.t('MESSAGE.PRIMARY_PHONE_REQUIRE_MESSAGE')).matches(
      PHONE_NUMBER_VALIDATION_REGEX, { message: i18n.t('MESSAGE.PHONE_INVALID_MESSAGE') },
    ),
  },
  otherPhoneNumbers: {
    type: 'tel',
    label: '',
    render: (field, inputSchema, control, errors) => (
      <MultiplePhoneNumbersInput
        fieldName={field.name}
        control={control}
        errors={errors}
        register={control.register}
      />
    ),
    required: false,
    validator: yup.array().of(
      yup.object().shape({
        value: yup.string().matches(
          PHONE_NUMBER_VALIDATION_REGEX, { message: i18n.t('MESSAGE.PHONE_INVALID_MESSAGE') },
        ),
      }),
    ),
  },
  email: {
    type: 'email',
    label: 'Email',
    required: false,
    validator: yup.string().email(),
  },
  birthday: {
    type: 'date',
    label: 'Birthday',
    required: false,
    validator: yup.date(),
  },
  nationality: {
    type: 'select',
    label: i18n.t('LEAD.NATIONALITY'),
    required: true,
    options: countries.map((option) => ({
      label: option.nationality,
      value: option.nationality,
    })),
    validator: yup.string().nullable().oneOf(countries.map((item) => item.nationality), i18n.t('MESSAGE.NATIONALITY_INVALID_MESSAGE')),
  },
  country: {
    type: 'select',
    label: i18n.t('LEAD.COUNTRY'),
    required: true,
    options: countries.map((option) => ({
      label: option.name,
      value: option.countryCode,
    })),
    validator: yup.string().nullable().oneOf(countries.map((item) => item.countryCode), i18n.t('MESSAGE.COUNTRY_INVALID_MESSAGE')),
  },
  province: {
    type: 'creatable-select',
    label: i18n.t('LEAD.PROVINCE'),
    required: false,
    getOptions: (formData) => getProvinces(formData.country).map((province) => ({
      label: province.name,
      value: province.name,
    })),
  },
  district: {
    type: 'text',
    label: i18n.t('LEAD.DISTRICT'),
    required: false,
  },
  ward: {
    type: 'text',
    label: i18n.t('LEAD.WARD'),
    required: false,
  },
  address: {
    type: 'text',
    label: i18n.t('LEAD.ADDRESS'),
    required: false,
  },
  status: {
    type: 'select',
    label: i18n.t('COMMON.STATUS'),
    required: true,
    options: leadStatuses.map((status) => ({
      label: i18n.t(`LEAD.${status}`),
      value: status,
    })),
    validator: yup.string().oneOf(leadStatuses, i18n.t('MESSAGE.LEAD_STATUS_INVALID_MESSAGE')),
  },
  sex: {
    type: 'select',
    label: i18n.t('LEAD.SEX'),
    required: true,
    options: leadSexes.map((option) => ({
      label: i18n.t(`LEAD.${option}`),
      value: option,
    })),
    validator: yup.string().oneOf(leadSexes, i18n.t('MESSAGE.SEX_INVALID_MESSAGE')),
  },
  source: {
    type: 'select',
    label: i18n.t('LEAD.SOURCE'),
    required: false,
    options: leadSources.map((option) => ({
      label: i18n.t(`LEAD.${option}`),
      value: option,
    })),
    validator: yup.string().oneOf(leadSources, i18n.t('MESSAGE.LEAD_SOURCE_INVALID_MESSAGE')),
  },
  maritalStatus: {
    type: 'select',
    label: i18n.t('LEAD.MARITAL'),
    required: false,
    options: leadMaritals.map((option) => ({
      label: i18n.t(`LEAD.${option}`),
      value: option,
    })),
    validator: yup.string().oneOf(leadMaritals, i18n.t('MESSAGE.MARITAL_INVALID_MESSAGE')),
  },
  tags: {
    type: 'creatable-select',
    label: i18n.t('LEAD.TAGS'),
    required: false,
    options: [],
    isMulti: true,
    validator: yup.array().of(yup.string()),
  },
};

const defaultValues : LeadFormData = {
  primaryPhoneNumber: '',
  name: '',
  vocative: leadVocatives[0],
  birthday: moment().format(BIRTHDAYFORMAT),
  nationality: getNationality('Vietnamese').nationality,
  otherPhoneNumbers: [],
  sex: leadSexes[0],
  maritalStatus: leadMaritals[0],
  email: undefined,
  country: getCountry('VN').countryCode,
  province: undefined,
  district: undefined,
  ward: undefined,
  address: undefined,
  status: leadStatuses[0],
  tags: [],
  source: leadSources[0],
};

export interface LeadSidebarProps {
  toggleSidebar: () => void,
  open: boolean,
  lead?: Lead,
  onClosed: () => void,
}

export default function LeadSidebar(props: LeadSidebarProps) {
  const {
    open, toggleSidebar, lead, onClosed,
  } = props;
  const leadFormData = useMemo(() => {
    if (lead) {
      return lead;
    }
    return defaultValues;
  }, [lead]);
  const dispatch = useDispatch();
  const addLeadState = useSelector((state: RootState) => state.lead.addLeadState);
  const updateLeadState = useSelector((state: RootState) => state.lead.updateLeadState);
  const onSubmit = useCallback((formData: UnpackNestedValue<LeadFormData>) => {
    if (lead) {
      // Edit lead
      dispatch(leadActions.updateLead({
        ...lead,
        ...formData,
        birthday: moment(formData.birthday).format(BIRTHDAYFORMAT),
      }));
    } else {
      // Create lead
      dispatch(leadActions.addLead({
        ...formData,
        enabled: true,
        type: LeadEnum.LEAD,
        birthday: moment(formData.birthday).format(BIRTHDAYFORMAT),
      }));
    }
  }, [lead]);

  // Listen state changed effect when adding a lead
  useEffect(() => {
    if (addLeadState === 'finished') {
      toggleSidebar();
    }
  }, [addLeadState]);

  // Listen state changed effect when updating a lead
  useEffect(() => {
    if (updateLeadState === 'finished') {
      toggleSidebar();
    }
  }, [updateLeadState]);
  return (
    <SidebarForm<LeadFormData>
      schema={schema}
      defaultValues={leadFormData}
      title={lead ? i18n.t('LEAD.EDIT_LEAD') : i18n.t('LEAD.ADD_LEAD')}
      open={open}
      size="lg"
      onSubmit={onSubmit}
      toggleSidebar={toggleSidebar}
      submitting={addLeadState === 'loading'}
      onClosed={onClosed}
    />
  );
}
