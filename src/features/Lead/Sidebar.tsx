// ** React Import
import React, { useRef, useState } from 'react';

// ** Custom Components
import RightSideBar from '@components/RightSideBar/RightSideBar';

// ** Utils
import { selectThemeColors } from '@utils/Utils';

// ** Third Party Components
import Select, { GroupBase, OptionsOrGroups } from 'react-select';
import classnames from 'classnames';
import { useForm, Controller } from 'react-hook-form';

// ** Reactstrap Imports
import {
  Button, Label, FormText, Form,
} from 'reactstrap';
import Input from '@components/Input/Input';

// ** Store & Actions
import { useDispatch } from 'react-redux';
import { leadActions } from '@redux/slices/leadSlice';

const { addLead } = leadActions;

interface Data {
  fullName?: string,
  username?: string,
  country?: string,
  contact?: string,
  email?: string,
  company?: any,
}

interface Country {
  label: string,
  value: string
}

type FormData = { [key: string]: any | null } & { country: Country | null };

const defaultValues : FormData = {
  email: '',
  contact: '',
  company: '',
  fullName: '',
  username: '',
  country: null,
};

const countryOptions : Country[] = [
  { label: 'Australia', value: 'Australia' },
  { label: 'Bangladesh', value: 'Bangladesh' },
  { label: 'Belarus', value: 'Belarus' },
  { label: 'Brazil', value: 'Brazil' },
  { label: 'Canada', value: 'Canada' },
  { label: 'China', value: 'China' },
  { label: 'France', value: 'France' },
  { label: 'Germany', value: 'Germany' },
  { label: 'India', value: 'India' },
  { label: 'Indonesia', value: 'Indonesia' },
  { label: 'Israel', value: 'Israel' },
  { label: 'Italy', value: 'Italy' },
  { label: 'Japan', value: 'Japan' },
  { label: 'Korea', value: 'Korea' },
  { label: 'Mexico', value: 'Mexico' },
  { label: 'Philippines', value: 'Philippines' },
  { label: 'Russia', value: 'Russia' },
  { label: 'South', value: 'South' },
  { label: 'Thailand', value: 'Thailand' },
  { label: 'Turkey', value: 'Turkey' },
  { label: 'Ukraine', value: 'Ukraine' },
  { label: 'United Arab Emirates', value: 'United Arab Emirates' },
  { label: 'United Kingdom', value: 'United Kingdom' },
  { label: 'United States', value: 'United States' },
];

interface Animal {
  name: string;
  type: string;
  age: number;
}

const animals: Animal[] = [
  {
    name: 'Tom',
    type: 'dinosaur',
    age: 25,
  },
  {
    name: 'Alfred',
    type: 'turtle',
    age: 12,
  },
  {
    name: 'Jeff',
    type: 'snail',
    age: 19,
  },
];

const checkIsValid = (data : FormData) => Object.values(data).every((field) => (typeof field === 'object' ? field !== null : field.length > 0));

export interface SidebarNewUsersProps {
  toggleSidebar: () => void,
  open: boolean,
}

const SidebarNewUsers = (props: SidebarNewUsersProps) => {
  const {
    open,
    toggleSidebar,
  } = props;
  // ** States
  const [data, setData] = useState<any>(null);
  const [plan, setPlan] = useState('basic');
  const [role, setRole] = useState('subscriber');

  // ** Store Vars
  const dispatch = useDispatch();

  // ** Vars
  const {
    control,
    setValue,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  // ** Function to handle form submit
  const onSubmit = (formData : FormData) => {
    setData(formData);
    if (checkIsValid(formData)) {
      toggleSidebar();
      dispatch(
        addLead({
          role,
          avatar: '',
          status: 'active',
          email: formData.email,
          currentPlan: plan,
          billing: 'auto debit',
          company: formData.company,
          contact: formData.contact,
          fullName: formData.fullName,
          username: formData.username,
          country: formData.country!.value,
        }),
      );
    } else {
      Object.keys(formData).forEach((key) => {
        if (formData[key] === null) {
          setError('country', {
            type: 'manual',
          });
        }
        if (formData[key] !== null && formData[key].length === 0) {
          setError(key, {
            type: 'manual',
          });
        }
      });
    }
  };

  const handleSidebarClosed = () => {
    Object.keys(defaultValues).forEach((key) => {
      setValue(key, '');
    });
    setRole('subscriber');
    setPlan('basic');
  };

  return (
    <RightSideBar
      size="lg"
      open={open}
      title="New Lead"
      headerClassName="mb-1"
      contentClassName="pt-0"
      toggleSidebar={toggleSidebar}
      onClosed={handleSidebarClosed}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-1">
          <Label className="form-label" for="fullName">
            Full Name
            {' '}
            <span className="text-danger">*</span>
          </Label>
          <Controller
            name="fullName"
            control={control}
            render={({ field }) => (
              <Input id="fullName" placeholder="John Doe" invalid={errors.fullName && true} {...field} />
            )}
          />
        </div>
        <div className="mb-1">
          <Label className="form-label" for="username">
            Username
            {' '}
            <span className="text-danger">*</span>
          </Label>
          <Controller
            name="username"
            control={control}
            render={({ field }) => (
              <Input id="username" placeholder="johnDoe99" invalid={errors.username && true} {...field} />
            )}
          />
        </div>
        <div className="mb-1">
          <Label className="form-label" for="userEmail">
            Email
            {' '}
            <span className="text-danger">*</span>
          </Label>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input
                type="email"
                id="userEmail"
                placeholder="john.doe@example.com"
                invalid={errors.email && true}
                {...field}
              />
            )}
          />
          <FormText color="muted">You can use letters, numbers & periods</FormText>
        </div>

        <div className="mb-1">
          <Label className="form-label" for="contact">
            Contact
            {' '}
            <span className="text-danger">*</span>
          </Label>
          <Controller
            name="contact"
            control={control}
            render={({ field }) => (
              <Input id="contact" placeholder="(397) 294-5153" invalid={errors.contact && true} {...field} />
            )}
          />
        </div>
        <div className="mb-1">
          <Label className="form-label" for="company">
            Company
            {' '}
            <span className="text-danger">*</span>
          </Label>
          <Controller
            name="company"
            control={control}
            render={({ field }) => (
              <Input id="company" placeholder="Company Pvt Ltd" invalid={errors.company && true} {...field} />
            )}
          />
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
            render={({ field }) => (
              <Select
                isClearable={false}
                classNamePrefix="select"
                options={countryOptions}
                theme={selectThemeColors}
                className={classnames('react-select', { 'is-invalid': data !== null && data.country === null })}
                {...field}
              />
            )}
          />
        </div>
        <div className="mb-1">
          <Label className="form-label" for="user-role">
            User Role
          </Label>
          <Input type="select" id="user-role" name="user-role" value={role} onChange={(e: any) => setRole(e.target.value)}>
            <option value="subscriber">Subscriber</option>
            <option value="editor">Editor</option>
            <option value="maintainer">Maintainer</option>
            <option value="author">Author</option>
            <option value="admin">Admin</option>
          </Input>
        </div>
        <div className="mb-1">
          <Label className="form-label" for="select-plan">
            Select Plan
          </Label>
          <Input type="select" id="select-plan" name="select-plan" value={plan} onChange={(e: any) => setPlan(e.target.value)}>
            <option value="basic">Basic</option>
            <option value="enterprise">Enterprise</option>
            <option value="company">Company</option>
            <option value="team">Team</option>
          </Input>
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

export default SidebarNewUsers;
