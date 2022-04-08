// ** React Import
import React, { useEffect, useState } from 'react';

// ** Third Party Components
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

// ** Store & Actions
import nationalities from '@assets/json/countries.json';
import toasty from '@components/Toasty/Toasty';
import { leadActions } from '@redux/slices/leadSlice';
import { RootState } from '@redux/store';
import { Maybe } from 'graphql/jsutils/Maybe';
import { useDispatch, useSelector } from 'react-redux';
import { AssertsShape, ObjectShape, TypeOfShape } from 'yup/lib/object';
import { AnyObject, Optionals } from 'yup/lib/types';
import moment from 'moment';
import {
  LeadEnum,
  leadMaritals,
  leadSexes,
  leadSources,
  leadStatuses,
  leadVocatives,
} from '@domain/entities/Lead';
import {
  BIRTHDAYFORMAT, ErrorMessage, PHONE_NUMBER_VALIDATION_REGEX,
} from '@utils/Constants';
import * as yup from 'yup';
import LeadSidebar, { Country, LeadFormData } from './LeadSidebar';
// ** Third Party Components

const {
  addLead, initAddLeadForm, updateLead, initUpdateLeadForm,
} = leadActions;

const countries : Country[] = nationalities.map((item) => ({
  name: item.en_short_name,
  nationality: item.nationality,
  countryCode: item.alpha_2_code,
}));

const getCountry = (countryCode: string): Country => {
  const country = nationalities.find((item) => item.alpha_2_code === countryCode)!;
  return {
    name: country.en_short_name,
    nationality: country.nationality,
    countryCode: country.alpha_2_code,
  };
};
const getNationality = (nationalityCode: string): Country => {
  const nationality = nationalities.find((item) => item.nationality === nationalityCode)!;
  return {
    name: nationality.en_short_name,
    nationality: nationality.nationality,
    countryCode: nationality.alpha_2_code,
  };
};

//  Yup validation
function isValidCountry(message: string) {
  return yup.object().test('test-country', message, (value: any, context: any) => {
    const { path, createError } = context;

    if (!value || !value.value) {
      return createError({ path, message: message ?? ErrorMessage.COUNTRY_INVALID_MESSAGE });
    }

    return true;
  });
}

function isValidSelect(array: string[], message: string) {
  return yup.object().test('test-select', message, (value: any, context: any) => {
    const { path, createError } = context;

    if (!value || !value.value) {
      return createError({ path, message: message ?? ErrorMessage.SELECT_FIELD_INVALID_MESSAGE });
    } if (!array.includes(value.value)) {
      return createError({ path, message: message ?? ErrorMessage.SELECT_FIELD_INVALID_MESSAGE });
    }

    return true;
  });
}

yup.addMethod(yup.object, 'isValidCountry', isValidCountry);
yup.addMethod(yup.object, 'isValidSelect', isValidSelect);

//  Yup schema for validate create lead
const LeadSchema = yup.object().shape({
  name: yup.string().required(),
  otherPhoneNumbers: yup.array().of(
    yup.object().shape({
      value: yup.string().matches(
        PHONE_NUMBER_VALIDATION_REGEX, { message: ErrorMessage.PHONE_INVALID_MESSAGE },
      ),
    }),
  ),
  email: yup.string().email(),
  birthday: yup.date(),
  vocative: yup.object().shape({
    value: yup.string().required(),
  }).required(),
  nationality: yup.object().nullable().isValidCountry(ErrorMessage.NATIONALITY_INVALID_MESSAGE),
  country: yup.object().nullable().isValidCountry(ErrorMessage.COUNTRY_INVALID_MESSAGE),
  sex: yup.object().isValidSelect(leadSexes, ErrorMessage.SEX_INVALID_MESSAGE),
  maritalStatus: yup.object().isValidSelect(leadMaritals, ErrorMessage.MARITAL_INVALID_MESSAGE),
  status: yup.object().isValidSelect(leadStatuses, ErrorMessage.LEAD_STATUS_INVALID_MESSAGE),
  source: yup.object().isValidSelect(leadSources, ErrorMessage.LEAD_SOURCE_INVALID_MESSAGE),
  tags: yup.array().of(yup.object()),
  enabled: yup.object().required(),
});

export interface SidebarNewLeadProps {
  toggleSidebar: () => void,
  open: boolean,
}

const leadDefaultValues : LeadFormData = {
  primaryPhoneNumber: '',
  name: undefined,
  vocative: { label: leadVocatives[0], value: leadVocatives[0] },
  birthday: new Date(),
  nationality: { label: getNationality('Vietnamese').name, value: getNationality('Vietnamese') },
  sex: { label: leadSexes[0], value: leadSexes[0] },
  maritalStatus: { label: leadMaritals[0], value: leadMaritals[0] },
  otherPhoneNumbers: [],
  email: undefined,
  country: { label: getCountry('VN').name, value: getCountry('VN') },
  province: undefined,
  district: undefined,
  ward: undefined,
  address: undefined,
  status: { label: leadStatuses[0], value: leadStatuses[0] },
  tags: [],
  creatorId: undefined,
  creatorName: undefined,
  assigneeId: undefined,
  assigneeName: undefined,
  source: { label: leadSources[0], value: leadSources[0] },
  enabled: { label: 'TRUE', value: true },
};

const SidebarNewLead = (props: SidebarNewLeadProps) => {
  const {
    open,
    toggleSidebar,
  } = props;
  // ** States
  const addedLeadResponse = useSelector((state: RootState) => state.lead.addedLeadResponse);
  const addLeadState = useSelector((state: RootState) => state.lead.addLeadState);
  const [data, setData] = useState<any>(null);
  const dispatch = useDispatch();

  //  Yup schema for validate create lead
  const CreateLeadSchema = yup.object().shape({
    primaryPhoneNumber: yup.string().required().matches(
      PHONE_NUMBER_VALIDATION_REGEX, { message: ErrorMessage.PHONE_INVALID_MESSAGE },
    ),
  });

  const validationSchema = LeadSchema.concat(CreateLeadSchema);

  const defaultValues = leadDefaultValues;
  // ** Vars
  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({ defaultValues, resolver: yupResolver(validationSchema) });
  // ** Function to handle form submit
  const onSubmit = async (formData : LeadFormData) => {
    setData(formData);
    dispatch(
      addLead({
        primaryPhoneNumber: formData.primaryPhoneNumber!,
        name: formData.name!,
        vocative: formData.vocative!.value,
        birthday: formData.birthday ? moment(formData.birthday).format(BIRTHDAYFORMAT) : undefined,
        nationality: formData.nationality!.value.nationality,
        sex: formData.sex!.value,
        maritalStatus: formData.maritalStatus!.value,
        otherPhoneNumbers: formData.otherPhoneNumbers
          && formData.otherPhoneNumbers.length ? formData.otherPhoneNumbers.map(
            (item) => item.value,
          ) : [],
        email: formData.email && formData.email.length ? formData.email : undefined,
        country: formData.country ? formData.country?.value.countryCode : '',
        province: formData.province?.value.name,
        district: formData.district && formData.district.length ? formData.district : undefined,
        ward: formData.ward && formData.ward.length ? formData.ward : undefined,
        address: formData.address && formData.address.length ? formData.address : undefined,
        status: formData.status!.value,
        tags: formData.tags && formData.tags.length ? formData.tags.map(
          (item: { value: string; }) => item.value,
        ) : undefined,
        creatorId: undefined,
        creatorName: undefined,
        assigneeId: undefined,
        assigneeName: undefined,
        source: formData.source!.value,
        type: LeadEnum.LEAD,
        enabled: formData.enabled!.value,
      }),
    );
  };

  useEffect(() => {
    if (addLeadState === 'error') {
      toasty.show({ title: 'Error', type: 'error', message: `${addedLeadResponse?.errorMsg}` });
    } else if (addLeadState === 'finished') {
      toasty.show({ title: 'Success', type: 'success', message: `Create Lead ${addedLeadResponse?.lead?.name} successfully` });
      toggleSidebar();
    }
  }, [addLeadState]);

  const handleSidebarClosed = () => {
    dispatch(initAddLeadForm());
    reset(defaultValues);
  };

  return (
    <LeadSidebar
      size="lg"
      open={open}
      errors={errors}
      control={control}
      register={register}
      defaultValues={leadDefaultValues}
      isUpdate={false}
      title="New Lead"
      loadingState={addLeadState}
      toggleSidebar={toggleSidebar}
      handleSidebarClosed={handleSidebarClosed}
      handleSubmit={handleSubmit(onSubmit)}
    />
  );
};

export interface SidebarUpdateLeadProps {
  toggleSidebar: () => void,
  open: boolean,
}
const SidebarUpdateLead = (props: SidebarUpdateLeadProps) => {
  const {
    open,
    toggleSidebar,
  } = props;
  // ** States
  const updatedLeadResponse = useSelector((state: RootState) => state.lead.updatedLeadResponse);
  const updateLeadState = useSelector((state: RootState) => state.lead.updateLeadState);
  const lead = useSelector((state: RootState) => state.lead.selectedLead);
  const [data, setData] = useState<any>(null);

  const defaultValues: LeadFormData = leadDefaultValues;
  // ** Store Vars
  const dispatch = useDispatch();

  //  Yup schema for validate create lead
  const UpdateLeadSchema = yup.object().shape({
  });

  const validationSchema = LeadSchema.concat(UpdateLeadSchema);

  // ** Vars
  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({ defaultValues, resolver: yupResolver(validationSchema) });

  useEffect(() => {
    if (lead) {
      reset({
        ...lead,
        vocative: { label: lead.vocative!, value: lead.vocative! },
        birthday: lead.birthday ? new Date(lead.birthday) : undefined,
        nationality: {
          label: getNationality(lead.nationality).nationality,
          value: getNationality(lead.nationality),
        },
        sex: { label: lead.sex!, value: lead.sex! },
        maritalStatus: { label: lead.maritalStatus!, value: lead.maritalStatus! },
        otherPhoneNumbers: lead.otherPhoneNumbers.map((item) => ({
          value: item,
        })),
        country: { label: getCountry(lead.country).name, value: getCountry(lead.country) },
        province: lead.province
          ? { label: lead.province, value: { name: lead.province } } : undefined,
        status: { label: lead.status, value: lead.status },
        tags: lead.tags ? lead.tags.map((item) => ({ label: item, value: item })) : [],
        source: { label: lead.source, value: lead.source },
        enabled: lead.enabled ? { label: 'TRUE', value: true } : { label: 'FALSE', value: false },
        type: lead.type ? { label: lead.type, value: lead.type } : undefined,
      });
    } else {
      reset(leadDefaultValues);
    }
  }, [lead]);

  // ** Function to handle form submit
  const onSubmit = async (formData : LeadFormData) => {
    setData(formData);
    dispatch(
      updateLead({
        ...lead!,
        name: formData.name!,
        vocative: formData.vocative!.value,
        birthday: formData.birthday ? moment(formData.birthday).format(BIRTHDAYFORMAT) : undefined,
        nationality: formData.nationality!.value.nationality,
        sex: formData.sex!.value,
        maritalStatus: formData.maritalStatus!.value,
        otherPhoneNumbers: formData.otherPhoneNumbers
        && formData.otherPhoneNumbers.length ? formData.otherPhoneNumbers.map(
            (item) => item.value,
          ) : [],
        email: formData.email && formData.email.length ? formData.email : undefined,
        country: formData.country && formData.country.value ? formData.country?.value.countryCode : '',
        province: formData.province?.value.name,
        district: formData.district && formData.district.length ? formData.district : undefined,
        ward: formData.ward && formData.ward.length ? formData.ward : undefined,
        address: formData.address && formData.address.length ? formData.address : undefined,
        status: formData.status!.value,
        tags: formData.tags && formData.tags.length ? formData.tags.map(
          (item: { value: string; }) => item.value,
        ) : undefined,
        source: formData.source!.value,
        type: LeadEnum.LEAD,
        enabled: formData.enabled ? formData.enabled.value : true,
      }),
    );
  };

  useEffect(() => {
    if (updateLeadState === 'error') {
      toasty.show({ title: 'Error', type: 'error', message: `${updatedLeadResponse?.errorMsg}` });
    } else if (updateLeadState === 'finished') {
      toasty.show({ title: 'Success', type: 'success', message: `Update Lead ${updatedLeadResponse?.lead?.name} successfully` });
      toggleSidebar();
    }
  }, [updateLeadState]);

  const handleSidebarClosed = () => {
    dispatch(initUpdateLeadForm());
    reset(leadDefaultValues);
  };

  return (
    <LeadSidebar
      size="lg"
      open={open}
      errors={errors}
      control={control}
      register={register}
      defaultValues={defaultValues}
      isUpdate
      loadingState={updateLeadState}
      title={`Update Lead: ${lead?.name}`}
      toggleSidebar={toggleSidebar}
      handleSidebarClosed={handleSidebarClosed}
      handleSubmit={handleSubmit(onSubmit)}
    />
  );
};

const CreateUpdateLeadSidebar = {
  SidebarNewLead,
  SidebarUpdateLead,
};

export default CreateUpdateLeadSidebar;
