import React, { useCallback, useMemo } from 'react';
import SidebarForm, { FormSchema } from '@components/SidebarForm/SidebarForm';
import {
  Customer,
  customerStatuses,
  LeadEnum,
  leadMaritals,
  leadSexes,
  leadSources,
  leadVocatives,
} from '@domain/entities/Lead';
import i18n from '@config/i18n';
import MultiplePhoneNumbersInput from '@components/MultiplePhoneNumbersInput/MultiplePhoneNumbersInput';
import * as yup from 'yup';
import { BIRTHDAY_FORMAT, PHONE_NUMBER_VALIDATION_REGEX } from '@utils/Constants';
import {
  getCountries,
  getCountry,
  getNationality,
  getProvinces,
  OtherPhoneNumbersOption,
} from '@utils/LeadUtils';
import { UnpackNestedValue } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { customerActions } from '@redux/slices/customerSlice';
import { RootState } from '@redux/store';
import moment from 'moment';

type OmitFields = 'createdAt' | 'updatedAt' | 'assigneeId' | 'assigneeName' | 'creatorId' | 'creatorName' | 'enabled' | 'type' | 'tasks' | 'otherPhoneNumbers';
type CustomerFormData = Omit<Customer, OmitFields> & {
  otherPhoneNumbers: OtherPhoneNumbersOption[]
};

const countries = getCountries();

const defaultValues: CustomerFormData = {
  primaryPhoneNumber: '',
  name: '',
  vocative: leadVocatives[0],
  birthday: moment().format(BIRTHDAY_FORMAT),
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
  status: customerStatuses[0],
  tags: [],
  source: leadSources[0],
};

export interface CustomerSidebarProps {
  setOpenSidebar: (status: boolean) => void,
  toggleSidebar: () => void,
  open: boolean,
  customer?: Customer,
  onClosed: () => void,
}

function useSchema(customer: Customer | undefined) {
  const schema: FormSchema<CustomerFormData> = useMemo(() => ({
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
      disabled: !!customer,
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
      options: customerStatuses.map((status) => ({
        label: i18n.t(`CUSTOMER.${status}`),
        value: status,
      })),
      validator: yup.string().oneOf(customerStatuses, i18n.t('MESSAGE.LEAD_STATUS_INVALID_MESSAGE')),
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
  }), [customer]);
  return schema;
}

export default function CustomerSidebar(props: CustomerSidebarProps) {
  const {
    open, toggleSidebar, customer, onClosed,
  } = props;
  const customerFormData = useMemo(() => {
    if (customer) {
      return {
        ...customer,
        otherPhoneNumbers: customer.otherPhoneNumbers.map((item) => ({ value: item })),
      };
    }
    return defaultValues;
  }, [customer]);

  const dispatch = useDispatch();
  const schema = useSchema(customer);
  const loading = useSelector((state: RootState) => state.customer.createOrUpdateCustomerLoading);
  const onSubmit = useCallback((formData: UnpackNestedValue<CustomerFormData>) => {
    if (customer) {
      // Edit customer
      dispatch(customerActions.updateCustomer({
        ...customer,
        ...formData,
        primaryPhoneNumber: customer.primaryPhoneNumber,
        otherPhoneNumbers: (formData.otherPhoneNumbers).map((phone) => phone.value),
        birthday: moment(formData.birthday).format(BIRTHDAY_FORMAT),
      }));
    } else {
      // Create customer
      dispatch(customerActions.addCustomer({
        ...formData,
        enabled: true,
        type: LeadEnum.CUSTOMER,
        otherPhoneNumbers: (formData.otherPhoneNumbers).map((phone) => phone.value),
        birthday: moment(formData.birthday).format(BIRTHDAY_FORMAT),
      }));
    }
  }, [customer]);
  return (
    <SidebarForm<CustomerFormData>
      schema={schema}
      defaultValues={customerFormData}
      title={customer ? i18n.t('CUSTOMER.EDIT_CUSTOMER') : i18n.t('CUSTOMER.ADD_CUSTOMER')}
      open={open}
      size="lg"
      onSubmit={onSubmit}
      toggleSidebar={toggleSidebar}
      submitting={loading}
      onClosed={onClosed}
    />
  );
}
