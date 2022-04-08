// ** React Import
import React, { useEffect, useState } from 'react';

// ** Third Party Components
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

// ** Store & Actions
import nationalities from '@assets/json/countries.json';
import toasty from '@components/Toasty/Toasty';
import {
  LeadEnum, MaritalEnum, SexEnum, SourceEnum, StatusEnum, VocativeEnum,
} from '@domain/entities/Lead';
import { leadActions } from '@redux/slices/leadSlice';
import { RootState } from '@redux/store';
import { Maybe } from 'graphql/jsutils/Maybe';
import { useDispatch, useSelector } from 'react-redux';
import { AssertsShape, ObjectShape, TypeOfShape } from 'yup/lib/object';
import { AnyObject, Optionals } from 'yup/lib/types';
import LeadSidebar from './LeadSidebar';
// ** Third Party Components

const {
  addLead, initAddLeadForm, updateLead, initUpdateLeadForm,
} = leadActions;

interface Country {
  name: string,
  nationality: string,
  countryCode: string,
}

interface Province {
  name: string,
}

interface CountryOption {
  label: string,
  value: Country,
}

type FormData = {
  [key: string]: any | null } &
{ country: CountryOption | null } &
{ otherPhoneNumbers: any[] } &
{ nationality: CountryOption | null };

const leadSexes : string[] = Object.keys(SexEnum) as Array<keyof typeof SexEnum>;
const leadVocatives : string[] = Object.keys(VocativeEnum) as Array<keyof typeof VocativeEnum>;
const leadStatuses : string[] = Object.keys(StatusEnum) as Array<keyof typeof StatusEnum>;
const leadTypes : string[] = Object.keys(LeadEnum) as Array<keyof typeof LeadEnum>;
const leadMaritals : string[] = Object.keys(MaritalEnum) as Array<keyof typeof MaritalEnum>;
const leadSources : string[] = Object.keys(SourceEnum) as Array<keyof typeof SourceEnum>;

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
declare module 'yup' {
  interface ObjectSchema<
    TShape extends ObjectShape,
    TContext extends AnyObject = AnyObject,
    TIn extends Maybe<TypeOfShape<TShape>> = TypeOfShape<TShape>,
    TOut extends Maybe<AssertsShape<TShape>> = AssertsShape<TShape> | Optionals<TIn>,
  > extends yup.BaseSchema<TIn, TContext, TOut> {
    isValidCountry(message: string): ObjectSchema<TShape, TContext, TIn, TOut>
    isValidSelect(array: string[], message: string): ObjectSchema<TShape, TContext, TIn, TOut>
  }
}
function isValidCountry(message: string) {
  return yup.object().test('test-country', message, (value: any, context: any) => {
    const { path, createError } = context;
    const REQUIRED_ERROR_MESSAGE: string = 'Country is invalid';

    if (!value || !value.value) {
      return createError({ path, message: message ?? REQUIRED_ERROR_MESSAGE });
    }

    return true;
  });
}

function isValidSelect(array: string[], message: string) {
  return yup.object().test('test-select', message, (value: any, context: any) => {
    const { path, createError } = context;
    const REQUIRED_ERROR_MESSAGE: string = 'Field is invalid';

    if (!value || !value.value) {
      return createError({ path, message: message ?? REQUIRED_ERROR_MESSAGE });
    } if (!array.includes(value.value)) {
      return createError({ path, message: message ?? REQUIRED_ERROR_MESSAGE });
    }

    return true;
  });
}

yup.addMethod(yup.object, 'isValidCountry', isValidCountry);
yup.addMethod(yup.object, 'isValidSelect', isValidSelect);

const phoneRegex = /^\(?(\d{3})\)?[-. ]?(\d{3})[-. ]?(\d{4})$/;

//  Yup schema for validate create lead
const LeadSchema = yup.object().shape({
  name: yup.string().required(),
  otherPhoneNumbers: yup.array().of(
    yup.object().shape({
      value: yup.string().matches(phoneRegex, { message: 'Phone number format is invalid.' }),
    }),
  ),
  email: yup.string().email(),
  birthday: yup.date(),
  vocative: yup.object().shape({
    value: yup.string().required(),
  }).required(),
  nationality: yup.object().nullable().isValidCountry('Nationality format is invalid.'),
  country: yup.object().nullable().isValidCountry('Country format is invalid.'),
  sex: yup.object().isValidSelect(leadSexes, 'Sex is invalid'),
  maritalStatus: yup.object().isValidSelect(leadMaritals, 'Marital status is invalid'),
  status: yup.object().isValidSelect(leadStatuses, 'Lead status is invalid'),
  source: yup.object().isValidSelect(leadSources, 'Lead source is invalid'),
  tags: yup.array().of(yup.object()),
  enabled: yup.object().required(),
});

export interface SidebarNewLeadProps {
  toggleSidebar: () => void,
  open: boolean,
}

const leadDefaultValues : FormData = {
  primaryPhoneNumber: '',
  name: '',
  vocative: { label: leadVocatives[0], value: leadVocatives[0] },
  birthday: undefined,
  nationality: { label: getNationality('Vietnamese').name, value: getNationality('Vietnamese') },
  sex: { label: leadSexes[0], value: leadSexes[0] },
  maritalStatus: { label: leadMaritals[0], value: leadMaritals[0] },
  otherPhoneNumbers: [],
  email: '',
  country: { label: getCountry('VN').name, value: getCountry('VN') },
  province: '',
  district: '',
  ward: '',
  address: '',
  status: { label: leadStatuses[0], value: leadStatuses[0] },
  tags: [],
  createrId: '',
  createrName: '',
  assigneeId: '',
  assigneeName: '',
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
    primaryPhoneNumber: yup.string().required().matches(phoneRegex, { message: 'Primary phone number format is invalid.' }),
  });

  const validationSchema = LeadSchema.concat(CreateLeadSchema);

  const defaultValues = leadDefaultValues;
  // ** Vars
  const {
    control,
    setValue,
    setError,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ defaultValues, resolver: yupResolver(validationSchema) });
  // ** Function to handle form submit
  const onSubmit = async (formData : FormData) => {
    setData(formData);
    dispatch(
      addLead({
        primaryPhoneNumber: formData.primaryPhoneNumber!,
        name: formData.name!,
        vocative: formData.vocative!.value,
        birthday: formData.birthday ? new Date(formData.birthday).getTime() : undefined,
        nationality: formData.nationality!.value.nationality,
        sex: formData.sex!.value,
        maritalStatus: formData.maritalStatus!.value,
        otherPhoneNumbers: formData.otherPhoneNumbers.length ? formData.otherPhoneNumbers.map(
          (item) => item.value,
        ) : undefined,
        email: formData.email && formData.email.length ? formData.email : undefined,
        country: formData.country?.value.countryCode,
        province: formData.province?.value,
        district: formData.district && formData.district.length ? formData.district : undefined,
        ward: formData.ward && formData.ward.length ? formData.ward : undefined,
        address: formData.address && formData.address.length ? formData.address : undefined,
        status: formData.status!.value,
        tags: formData.tags.length ? formData.tags.map(
          (item: { value: string; }) => item.value,
        ) : undefined,
        createrId: undefined,
        createrName: undefined,
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
    Object.keys(defaultValues).forEach((key) => {
      setValue(key, defaultValues[key]);
    });
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

  const defaultValues: FormData = leadDefaultValues;
  // ** Store Vars
  const dispatch = useDispatch();

  //  Yup schema for validate create lead
  const UpdateLeadSchema = yup.object().shape({
  });

  const validationSchema = LeadSchema.concat(UpdateLeadSchema);

  // ** Vars
  const {
    control,
    setValue,
    setError,
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({ defaultValues, resolver: yupResolver(validationSchema) });

  useEffect(() => {
    if (lead) {
      reset({
        primaryPhoneNumber: lead.primaryPhoneNumber!,
        name: lead.name!,
        vocative: { label: lead.vocative!, value: lead.vocative! },
        birthday: lead.birthday ?? undefined,
        nationality: {
          label: getNationality(lead.nationality).nationality,
          value: getNationality(lead.nationality),
        },
        sex: { label: lead.sex!, value: lead.sex! },
        maritalStatus: { label: lead.maritalStatus, value: lead.maritalStatus },
        otherPhoneNumbers: lead.otherPhoneNumbers.map((item) => ({
          value: item,
        })) ?? [],
        email: lead.email ?? '',
        country: { label: getCountry(lead.country).name, value: getCountry(lead.country) },
        province: lead.province ?? '',
        district: lead.district ?? '',
        ward: lead.ward ?? '',
        address: lead.address ?? '',
        status: { label: lead.status, value: lead.status },
        tags: lead.tags ? lead.tags.map((item) => ({ label: item, value: item })) : [],
        creatorId: lead.creatorId ?? '',
        creatorName: lead.creatorName ?? '',
        assigneeId: lead.assigneeId ?? '',
        assigneeName: lead.assigneeName ?? '',
        source: { label: lead.source, value: lead.source },
        enabled: lead.enabled ? { label: 'TRUE', value: true } : { label: 'FALSE', value: false },
      });
    } else {
      reset(leadDefaultValues);
    }
  }, [lead]);

  // ** Function to handle form submit
  const onSubmit = async (formData : FormData) => {
    setData(formData);
    dispatch(
      updateLead({
        primaryPhoneNumber: lead?.primaryPhoneNumber!,
        name: formData.name!,
        vocative: formData.vocative!.value,
        birthday: formData.birthday ?? undefined,
        nationality: formData.nationality!.value.nationality,
        sex: formData.sex!.value,
        maritalStatus: formData.maritalStatus!.value,
        otherPhoneNumbers: formData.otherPhoneNumbers.length ? formData.otherPhoneNumbers.map(
          (item) => item.value,
        ) : undefined,
        email: formData.email && formData.email.length ? formData.email : undefined,
        country: formData.country?.value.countryCode,
        province: formData.province?.value,
        district: formData.district && formData.district.length ? formData.district : undefined,
        ward: formData.ward && formData.ward.length ? formData.ward : undefined,
        address: formData.address && formData.address.length ? formData.address : undefined,
        status: formData.status!.value,
        tags: formData.tags.length ? formData.tags.map(
          (item: { value: string; }) => item.value,
        ) : undefined,
        createrId: undefined,
        createrName: undefined,
        assigneeId: undefined,
        assigneeName: undefined,
        source: formData.source!.value,
        type: LeadEnum.LEAD,
        enabled: formData.enabled.value,
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
    Object.keys(defaultValues).forEach((key) => {
      setValue(key, defaultValues[key]);
    });
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
      title={`Update Lead: ${defaultValues.name}`}
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
