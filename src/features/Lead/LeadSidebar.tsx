// ** React Import
import React, { useState } from 'react';

// ** Custom Components
import RightSideBar from '@components/RightSideBar/RightSideBar';

// ** Utils
import { selectThemeColors } from '@utils/Utils';

// ** Third Party Components
import classnames from 'classnames';
import { Control, Controller } from 'react-hook-form';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';

// ** Reactstrap Imports
import Input from '@components/Input/Input';
import {
  Button, Form, FormFeedback, Label,
} from 'reactstrap';

// ** Store & Actions
import nationalities from '@assets/json/countries.json';
import provinces from '@assets/json/provinces.json';
import {
  LeadEnum, MaritalEnum, SexEnum, SourceEnum, StatusEnum, VocativeEnum,
} from '@domain/entities/Lead';
import Flatpickr from 'react-flatpickr';
import MultiplePhoneNumbersInput from './MultiplePhoneNumbersInput';
// ** Third Party Components

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
  errors: any,
  open: boolean,
  control: Control<FormData, any>,
  register: any,
  defaultValues : FormData,
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
          <Flatpickr className={classnames('form-control', { 'is-invalid': errors.birthday })} name="birthday" id="birthday" defaultValue={defaultValues.birthday} />
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
                  onChange={(e: any) => {
                    setCountry(e.value);
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
                onChange={(e: any) => {
                  setProvince(e.value);
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
                options={(Object.keys(StatusEnum) as Array<keyof typeof StatusEnum>).map(
                  (item) => ({ label: item, value: item }),
                )}
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
                options={(Object.keys(SexEnum) as Array<keyof typeof SexEnum>).map(
                  (item) => ({ label: item, value: item }),
                )}
                theme={selectThemeColors}
                className={classnames('react-select', { 'is-invalid': errors.sex === null })}
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
                options={(Object.keys(SourceEnum) as Array<keyof typeof SourceEnum>).map(
                  (item) => ({ label: item, value: item }),
                )}
                theme={selectThemeColors}
                className={classnames('react-select', { 'is-invalid': errors !== null && errors.source === null })}
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
                options={(Object.keys(MaritalEnum) as Array<keyof typeof MaritalEnum>).map(
                  (item) => ({ label: item, value: item }),
                )}
                theme={selectThemeColors}
                className={classnames('react-select', { 'is-invalid': errors !== null && errors.maritalStatus === null })}
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
                className={classnames('react-select', { 'is-invalid': errors !== null && errors.tags === null })}
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
                className={classnames('react-select', { 'is-invalid': errors !== null && errors.enabled === null })}
                {...field}
              />
            )}
          />
          {errors.enabled && <FormFeedback>{errors.enabled.message}</FormFeedback>}
        </div>
        <Button type="submit" className="me-1" color="primary">
          Submit
        </Button>
        <Button type="reset" color="secondary" outline onClick={toggleSidebar}>
          Cancel
        </Button>
      </Form>
    </RightSideBar>
  );
};

export default LeadSidebar;
