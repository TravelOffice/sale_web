/* eslint-disable no-unused-vars */
// ** React Import
// ** Store & Actions
import nationalities from '@assets/json/countries.json';
import provinces from '@assets/json/provinces.json';
// ** Reactstrap Imports
import Input from '@components/Input/Input';
// ** Custom Components
import RightSideBar from '@components/RightSideBar/RightSideBar';
import i18n from '@config/i18n';
import {
  leadMaritals,
  leadSexes,
  leadSources,
  leadStatuses,
  LeadType,
  leadVocatives,
  MaritalStatusType,
  SexType,
  SourceType,
  LeadStatusType,
  VocativeType,
  CustomerStatusType,
  LeadEnum,
  customerStatuses,
} from '@domain/entities/Lead';
// ** Utils
import { selectThemeColors } from '@utils/Utils';
// ** Third Party Components
import classnames from 'classnames';
import React, { useState } from 'react';
import Flatpickr from 'react-flatpickr';
import {
  Control, Controller, FieldErrors, UseFormRegister,
} from 'react-hook-form';
import Select, { SingleValue } from 'react-select';
import CreatableSelect from 'react-select/creatable';
import {
  Button, Form, FormFeedback, Label, Spinner,
} from 'reactstrap';
import MultiplePhoneNumbersInput from '@components/MultiplePhoneNumbersInput/MultiplePhoneNumbersInput';

export interface Country {
  name: string,
  nationality: string,
  countryCode: string,
}

export interface Province {
  name: string,
}

export interface CountryOption {
  label: string,
  value: Country,
}

export interface ProvinceOption {
  label: string,
  value: Province,
}
export interface CommonSelectOption<T> {
  label: string,
  value: T,
}

export interface EnabledOption {
  label: string,
  value: boolean,
}

export interface OtherPhoneNumbersOption {
  value: string
}

export type LeadFormData =
{ primaryPhoneNumber: string } &
{ name: string | undefined } &
{ vocative: CommonSelectOption<VocativeType> | undefined } &
{ birthday: Date | undefined } &
{ nationality: CountryOption | undefined } &
{ sex: CommonSelectOption<SexType> | undefined } &
{ maritalStatus: CommonSelectOption<MaritalStatusType> | undefined } &
{ email?: string } &
{ province: ProvinceOption | undefined } &
{ district?: string } &
{ ward?: string } &
{ address?: string } &
{ status: CommonSelectOption<LeadStatusType | CustomerStatusType> | undefined } &
{ tags?: Array<CommonSelectOption<string>> | undefined } &
{ creatorId?: string } &
{ creatorName?: string } &
{ assigneeId?: string } &
{ assigneeName?: string } &
{ source: CommonSelectOption<SourceType> | undefined } &
{ enabled: EnabledOption | undefined } &
{ type?: CommonSelectOption<LeadType> | undefined } &
{ country: CountryOption | undefined } &
{ otherPhoneNumbers: Array<OtherPhoneNumbersOption> | undefined } &
{ nationality: CountryOption | undefined };

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

const getProvinces = (
  country: Country,
): Province[] => provinces.filter((item) => item.country === country.countryCode).map((item) => ({
  name: item.name,
}));

export interface LeadSidebarProps {
  handleSubmit: () => void,
  toggleSidebar: () => void,
  handleSidebarClosed: () => void,
  size: 'lg' | 'sm',
  title: string,
  errors: FieldErrors,
  open: boolean,
  control: Control<LeadFormData, any>,
  register: UseFormRegister<any>,
  defaultValues : LeadFormData,
  loadingState: string,
  isUpdate: boolean,
  leadType: LeadEnum,
}

const LeadSidebar = (props: LeadSidebarProps) => {
  const {
    open,
    size,
    title,
    control,
    register,
    errors,
    defaultValues,
    isUpdate,
    loadingState,
    leadType,
    handleSubmit,
    handleSidebarClosed,
    toggleSidebar,
  } = props;

  // Save the country to state to get the province
  const [country, setCountry] = useState<Country>(getCountry('VN'));
  const [province, setProvince] = useState<Province | null>(null);

  const genderStatusSelect = ():
  { label: string, value: LeadStatusType | CustomerStatusType }[] => {
    if (leadType === LeadEnum.LEAD) {
      return leadStatuses.map((item) => ({ label: i18n.t(`LEAD.${item}`) ?? item, value: item }));
    }
    return customerStatuses.map((item) => ({ label: i18n.t(`CUSTOMER.${item}`) ?? item, value: item }));
  };

  return (
    <RightSideBar
      size={size}
      open={open}
      title={title}
      headerClassName="mb-1"
      contentClassName="pt-0"
      toggleSidebar={toggleSidebar}
      onClosed={handleSidebarClosed}
    >
      <Form onSubmit={handleSubmit}>
        <div className="mb-1">
          <Label className="form-label" for="name">
            {i18n.t('LEAD.NAME')}
            {' '}
            <span className="text-danger">*</span>
          </Label>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <input className={classnames('form-control', { 'is-invalid': errors.name })} id="name" {...field} />
            )}
          />
          {errors.name && <FormFeedback>{errors.name.message}</FormFeedback>}
        </div>
        <div className="mb-1">
          <Label className="form-label" for="vocative">
            {i18n.t('LEAD.VOCATIVE')}
            {' '}
            <span className="text-danger">*</span>
          </Label>
          <Controller
            name="vocative"
            control={control}
            render={({ field }) => (
              <Select
                isClearable={false}
                classNamePrefix="select"
                options={leadVocatives.map((item: VocativeType) => ({ label: i18n.t(`LEAD.${item}`) ?? item, value: item }))}
                theme={selectThemeColors}
                className={classnames('react-select', { 'is-invalid': errors.vocative })}
                {...field}
              />
            )}
          />
          {errors.vocative && <FormFeedback>{errors.vocative.message}</FormFeedback>}
        </div>
        <div className="mb-1">
          <Label className="form-label" for="primaryPhoneNumber">
            {i18n.t('LEAD.PHONE')}
            {' '}
            <span className="text-danger">*</span>
          </Label>
          <Controller
            name="primaryPhoneNumber"
            control={control}
            render={({ field }) => (
              <Input id="primaryPhoneNumber" disabled={isUpdate} invalid={errors.primaryPhoneNumber} {...field} />
            )}
          />
          {errors.primaryPhoneNumber
          && <FormFeedback>{errors.primaryPhoneNumber.message}</FormFeedback>}
        </div>
        <div className="mb-1">
          <MultiplePhoneNumbersInput fieldName="otherPhoneNumbers" control={control} errors={errors} register={register} />
        </div>
        <div className="mb-1">
          <Label className="form-label" for="email">
            {i18n.t('LEAD.EMAIL')}
          </Label>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input
                type="email"
                id="email"
                invalid={errors && errors.email}
                {...field}
              />
            )}
          />
          {errors.email && <FormFeedback>{errors.email.message}</FormFeedback>}
        </div>
        <div className="mb-1">
          <Label className="form-label" for="birthday">
            {i18n.t('LEAD.BIRTHDAY')}
          </Label>
          <Controller
            name="birthday"
            control={control}
            render={({ field: { value, ...rest } }) => (
              <Flatpickr className={classnames('form-control', { 'is-invalid': errors.birthday })} name="birthday" id="birthday" defaultValue={value?.toISOString()} />
            )}
          />
          {errors.birthday && <FormFeedback>{errors.birthday.message}</FormFeedback>}
        </div>
        <div className="mb-1">
          <Label className="form-label" for="nationality">
            {i18n.t('LEAD.NATIONALITY')}
            {' '}
            <span className="text-danger">*</span>
          </Label>
          <Controller
            name="nationality"
            control={control}
            render={({ field }) => (
              <Select
                isClearable={false}
                classNamePrefix="select"
                options={countries.map(
                  (item) => ({ label: item.nationality, value: item }),
                )}
                theme={selectThemeColors}
                className={classnames('react-select', { 'is-invalid': errors.nationality })}
                {...field}
              />
            )}
          />
          {errors.nationality
          && <FormFeedback>{(errors.nationality as any).message}</FormFeedback>}
        </div>
        <div className="mb-1">
          <Label className="form-label" for="country">
            {i18n.t('LEAD.COUNTRY')}
            {' '}
            <span className="text-danger">*</span>
          </Label>
          <Controller
            name="country"
            control={control}
            render={({ field }) => {
              const { onChange, value, ...rest } = field;
              return (
                <Select
                  placeholder={i18n.t('COMMON.SELECT')}
                  isClearable={false}
                  classNamePrefix="select"
                  defaultValue={defaultValues.country}
                  options={countries.map((item) => ({ label: item.name, value: item }))}
                  theme={selectThemeColors}
                  onChange={(e: SingleValue<CountryOption>) => {
                    if (e) {
                      setCountry(e.value);
                    }
                    onChange(e);
                  }}
                  className={classnames('react-select', { 'is-invalid': errors && errors.country })}
                  {...rest}
                />
              );
            }}
          />
          {errors.country && <FormFeedback>{(errors.country as any).message}</FormFeedback>}
        </div>
        <div className="mb-1">
          <Label className="form-label" for="province">
            {i18n.t('LEAD.PROVINCE')}
          </Label>
          <Controller
            name="province"
            control={control}
            render={({ field: { onChange, ...rest } }) => (
              <CreatableSelect
                placeholder={i18n.t('COMMON.SELECT')}
                formatCreateLabel={(userInput) => `Create province: ${userInput}`}
                isClearable={false}
                classNamePrefix="select"
                options={getProvinces(country).map(
                  (item) => ({ label: item.name, value: item }),
                )}
                onChange={(e: SingleValue<ProvinceOption>) => {
                  if (e) {
                    setProvince(e.value);
                  }
                  onChange(e);
                }}
                theme={selectThemeColors}
                className={classnames(
                  'react-select', { 'is-invalid': errors.province },
                )}
                {...rest}
              />
            )}
          />
        </div>
        <div className="mb-1">
          <Label className="form-label" for="district">
            {i18n.t('LEAD.DISTRICT')}
          </Label>
          <Controller
            name="district"
            control={control}
            render={({ field }) => (
              <Input id="district" invalid={errors.district && true} {...field} />
            )}
          />
        </div>
        <div className="mb-1">
          <Label className="form-label" for="ward">
            {i18n.t('LEAD.WARD')}
          </Label>
          <Controller
            name="ward"
            control={control}
            render={({ field }) => (
              <Input id="ward" invalid={errors.ward && true} {...field} />
            )}
          />
        </div>
        <div className="mb-1">
          <Label className="form-label" for="address">
            {i18n.t('LEAD.ADDRESS')}
          </Label>
          <Controller
            name="address"
            control={control}
            render={({ field }) => (
              <Input id="address" invalid={errors.address && true} {...field} />
            )}
          />
        </div>
        <div className="mb-1">
          <Label className="form-label" for="status">
            {i18n.t('COMMON.STATUS')}
          </Label>
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <Select
                placeholder={i18n.t('COMMON.SELECT')}
                isClearable={false}
                classNamePrefix="select"
                options={genderStatusSelect()}
                theme={selectThemeColors}
                className={classnames('react-select', { 'is-invalid': errors.status })}
                {...field}
              />
            )}
          />
          {errors.status && <FormFeedback>{errors.status.message}</FormFeedback>}
        </div>
        <div className="mb-1">
          <Label className="form-label" for="sex">
            {i18n.t('LEAD.SEX')}
          </Label>
          <Controller
            name="sex"
            control={control}
            render={({ field }) => (
              <Select
                isClearable={false}
                classNamePrefix="select"
                options={leadSexes.map((item) => ({ label: i18n.t(`LEAD.${item}`) ?? item, value: item }))}
                theme={selectThemeColors}
                className={classnames('react-select', { 'is-invalid': errors.sex })}
                {...field}
              />
            )}
          />
          {errors.status && <FormFeedback>{errors.status.message}</FormFeedback>}
        </div>
        <div className="mb-1">
          <Label className="form-label" for="source">
            {i18n.t('LEAD.SOURCE')}
          </Label>
          <Controller
            name="source"
            control={control}
            render={({ field }) => (
              <Select
                isClearable={false}
                classNamePrefix="select"
                options={leadSources.map((item) => ({ label: i18n.t(`LEAD.${item}`) ?? item, value: item }))}
                theme={selectThemeColors}
                className={classnames('react-select', { 'is-invalid': errors.source })}
                {...field}
              />
            )}
          />
          {errors.source && <FormFeedback>{errors.source.message}</FormFeedback>}
        </div>
        <div className="mb-1">
          <Label className="form-label" for="maritalStatus">
            {i18n.t('LEAD.MARITAL')}
          </Label>
          <Controller
            name="maritalStatus"
            control={control}
            render={({ field }) => (
              <Select
                isClearable={false}
                classNamePrefix="select"
                options={leadMaritals.map((item) => ({ label: i18n.t(`LEAD.${item}`) ?? 'SINGLE', value: item }))}
                theme={selectThemeColors}
                className={classnames('react-select', { 'is-invalid': errors.maritalStatus })}
                {...field}
              />
            )}
          />
          {errors.maritalStatus && <FormFeedback>{errors.maritalStatus.message}</FormFeedback>}
        </div>
        <div className="mb-1">
          <Label className="form-label" for="tags">
            {i18n.t('LEAD.TAGS')}
          </Label>
          <Controller
            name="tags"
            control={control}
            render={({ field }) => (
              <CreatableSelect
                placeholder={i18n.t('COMMON.SELECT')}
                isMulti
                formatCreateLabel={(userInput) => `Create new tag: ${userInput}`}
                isClearable={false}
                classNamePrefix="select"
                theme={selectThemeColors}
                className={classnames('react-select', { 'is-invalid': errors.tags })}
                {...field}
              />
            )}
          />
          {errors.tags && <FormFeedback>{(errors.tags as any).message}</FormFeedback>}
        </div>
        <Button type="submit" className="me-1" color="primary">
          {loadingState !== 'loading' ? i18n.t('COMMON.SUBMIT') : i18n.t('COMMON.LOADING')}
          {loadingState === 'loading' ? (
            <Spinner
              style={{ width: '0.7rem', height: '0.7rem' }}
              type="grow"
              color="light"
            />
          ) : null }
        </Button>
        <Button type="reset" color="secondary" outline onClick={toggleSidebar}>
          {i18n.t('COMMON.CANCEL')}
        </Button>
      </Form>
    </RightSideBar>
  );
};

export default LeadSidebar;
