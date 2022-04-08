// ** React Import
import React, { useState } from 'react';

// ** Custom Components
import RightSideBar from '@components/RightSideBar/RightSideBar';

// ** Utils
import { selectThemeColors } from '@utils/Utils';

// ** Third Party Components
import classnames from 'classnames';
import {
  Control, Controller, FieldErrors, UseFormRegister,
} from 'react-hook-form';
import Select, { SingleValue } from 'react-select';
import CreatableSelect from 'react-select/creatable';

// ** Reactstrap Imports
import Input from '@components/Input/Input';
import {
  Button, Form, FormFeedback, Label, Spinner,
} from 'reactstrap';

// ** Store & Actions
import nationalities from '@assets/json/countries.json';
import provinces from '@assets/json/provinces.json';
import Flatpickr, { DateTimePickerProps } from 'react-flatpickr';
import {
  leadMaritals,
  leadSexes,
  leadSources,
  leadStatuses,
  LeadType,
  leadVocatives,
  MaritalStatusType, SexType, SourceType, StatusType, VocativeType,
} from '@domain/entities/Lead';
import MultiplePhoneNumbersInput from './MultiplePhoneNumbersInput';
// ** Third Party Components

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
{ status: CommonSelectOption<StatusType> | undefined } &
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
    handleSubmit,
    handleSidebarClosed,
    toggleSidebar,
  } = props;

  const [data, setData] = useState<any>(null);
  // Save the country to state to get the province
  const [country, setCountry] = useState<Country>(getCountry('VN'));
  const [province, setProvince] = useState<Province | null>(null);

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
            Full Name
            {' '}
            <span className="text-danger">*</span>
          </Label>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <input className={classnames('form-control', { 'is-invalid': errors.name })} id="name" placeholder="Your full name" {...field} />
            )}
          />
          {errors.name && <FormFeedback>{errors.name.message}</FormFeedback>}
        </div>
        <div className="mb-1">
          <Label className="form-label" for="vocative">
            Vocative Type
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
                options={leadVocatives.map((item) => ({ label: item, value: item }))}
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
            Primary Phone Number
            {' '}
            <span className="text-danger">*</span>
          </Label>
          <Controller
            name="primaryPhoneNumber"
            control={control}
            render={({ field }) => (
              <Input id="primaryPhoneNumber" disabled={isUpdate} placeholder="Your primary phone number" invalid={errors.primaryPhoneNumber} {...field} />
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
            Email
          </Label>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input
                type="email"
                id="email"
                placeholder="youremail@domain.com"
                invalid={errors && errors.email}
                {...field}
              />
            )}
          />
          {errors.email && <FormFeedback>{errors.email.message}</FormFeedback>}
        </div>
        <div className="mb-1">
          <Label className="form-label" for="birthday">
            Birthday
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
            Select Nationality
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
            Country
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
            Province
          </Label>
          <Controller
            name="province"
            control={control}
            render={({ field: { onChange, ...rest } }) => (
              <CreatableSelect
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
            District
          </Label>
          <Controller
            name="district"
            control={control}
            render={({ field }) => (
              <Input id="district" placeholder="Your district" invalid={errors.district && true} {...field} />
            )}
          />
        </div>
        <div className="mb-1">
          <Label className="form-label" for="ward">
            Ward
          </Label>
          <Controller
            name="ward"
            control={control}
            render={({ field }) => (
              <Input id="ward" placeholder="Your ward" invalid={errors.ward && true} {...field} />
            )}
          />
        </div>
        <div className="mb-1">
          <Label className="form-label" for="address">
            Address
          </Label>
          <Controller
            name="address"
            control={control}
            render={({ field }) => (
              <Input id="address" placeholder="Your address" invalid={errors.address && true} {...field} />
            )}
          />
        </div>
        <div className="mb-1">
          <Label className="form-label" for="status">
            Status Type
          </Label>
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <Select
                isClearable={false}
                classNamePrefix="select"
                options={leadStatuses.map((item) => ({ label: item, value: item }))}
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
            Sex Type
          </Label>
          <Controller
            name="sex"
            control={control}
            render={({ field }) => (
              <Select
                isClearable={false}
                classNamePrefix="select"
                options={leadSexes.map((item) => ({ label: item, value: item }))}
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
            Source Type
          </Label>
          <Controller
            name="source"
            control={control}
            render={({ field }) => (
              <Select
                isClearable={false}
                classNamePrefix="select"
                options={leadSources.map((item) => ({ label: item, value: item }))}
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
            Marital Type
          </Label>
          <Controller
            name="maritalStatus"
            control={control}
            render={({ field }) => (
              <Select
                isClearable={false}
                classNamePrefix="select"
                options={leadMaritals.map((item) => ({ label: item, value: item }))}
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
            Tags
          </Label>
          <Controller
            name="tags"
            control={control}
            render={({ field }) => (
              <CreatableSelect
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
        <div className="mb-1">
          <Label className="form-label" for="enabled">
            Lead Enabled
          </Label>
          <Controller
            name="enabled"
            control={control}
            render={({ field }) => (
              <Select
                isClearable={false}
                classNamePrefix="select"
                options={[
                  { label: 'TRUE', value: true },
                  { label: 'FALSE', value: false },
                ]}
                theme={selectThemeColors}
                className={classnames('react-select', { 'is-invalid': errors.enabled })}
                {...field}
              />
            )}
          />
          {errors.enabled && <FormFeedback>{errors.enabled.message}</FormFeedback>}
        </div>
        <Button type="submit" className="me-1" color="primary">
          {loadingState !== 'loading' ? 'Submit ' : 'Loading '}
          {loadingState === 'loading' ? (
            <Spinner
              style={{ width: '0.7rem', height: '0.7rem' }}
              type="grow"
              color="light"
            />
          ) : null }
        </Button>
        <Button type="reset" color="secondary" outline onClick={toggleSidebar}>
          Cancel
        </Button>
      </Form>
    </RightSideBar>
  );
};

export default LeadSidebar;
