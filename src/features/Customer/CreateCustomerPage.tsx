import React, { useCallback } from 'react';
import {
  Breadcrumb, BreadcrumbItem, Card, CardBody, CardHeader, CardTitle, Col, Form, Label, Row,
} from 'reactstrap';
import i18n from '@config/i18n';
import { Link, useHistory } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { customerPresenter } from '@adapter/presenters';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import FormItemSelect from '@components/Form/FormItemSelect';
import FormItemInput from '@components/Form/FormItemInput';
import toasty from '@components/Toasty/Toasty';
import LoadingButton from '@components/LoadingButton/LoadingButton';
import { Trans } from 'react-i18next';
import { createCustomerSchema, generateI18nForCustomer } from '@utils/CustomerUtils';
import {
  CreateCustomerFormData,
  Customer,
  CustomerLevel,
  HonorificType,
  SexType,
} from '@domain/entities/customer/Customer';

const sexOptions = [
  { label: generateI18nForCustomer(SexType.MALE), value: SexType.MALE },
  { label: generateI18nForCustomer(SexType.FEMALE), value: SexType.FEMALE },
  { label: generateI18nForCustomer(SexType.OTHER), value: SexType.OTHER },
];

const levelOptions = [
  { label: generateI18nForCustomer(CustomerLevel.STANDARD), value: CustomerLevel.STANDARD },
  { label: generateI18nForCustomer(CustomerLevel.VIP), value: CustomerLevel.VIP },
  { label: generateI18nForCustomer(CustomerLevel.VVIP), value: CustomerLevel.VVIP },
];

const honorificOptions = [
  { label: generateI18nForCustomer(HonorificType.MR_OLD), value: HonorificType.MR_OLD },
  { label: generateI18nForCustomer(HonorificType.MRS_OLD), value: HonorificType.MRS_OLD },
  { label: generateI18nForCustomer(HonorificType.MR_YOUNG), value: HonorificType.MR_YOUNG },
  { label: generateI18nForCustomer(HonorificType.MRS_YOUNG), value: HonorificType.MRS_YOUNG },
];

const defaultValues: CreateCustomerFormData = {
  email: '',
  primaryPhoneNumber: '',
  name: '',
  address: '',
  sex: undefined,
  honorific: undefined,
  level: CustomerLevel.STANDARD,
  socialLink: '',
};

export default function CreateCustomerPage() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateCustomerFormData>({
    resolver: yupResolver(createCustomerSchema), defaultValues,
  });

  const queryClient = useQueryClient();
  const history = useHistory();
  const createCustomerMutation = useMutation({
    mutationKey: ['createCustomer'],
    mutationFn: (formData: CreateCustomerFormData) => customerPresenter.addCustomer(formData),
    onSuccess: (customer: Customer) => {
      toasty.show({
        type: 'success',
        title: i18n.t('COMMON.SUCCESS'),
        message: i18n.t('CUSTOMER.ADD_CUSTOMER_SUCCESSFULLY', { customerName: customer.name }),
      });
      queryClient.setQueryData(['customers'], (customers: Customer[] | undefined) => {
        if (!customers) return [customer];
        return customers.concat(customer);
      });
      history.push(`/apps/customers/${customer.code}/edit`);
    },
    onError: (error: Error) => {
      toasty.show({
        type: 'error',
        message: error.message,
        title: i18n.t('COMMON.ERROR'),
      });
    },
  });

  const handleOnSubmit = useCallback((formData: CreateCustomerFormData) => {
    createCustomerMutation.mutate(formData);
  }, []);

  return (
    <div className="to-table-container">
      <Breadcrumb className="ms-1 mb-1">
        <BreadcrumbItem>
          <Link to="/">{i18n.t('COMMON.HOME')}</Link>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Link to="/apps/customers/list">Customer</Link>
        </BreadcrumbItem>
        <BreadcrumbItem active>
          <span>{i18n.t('CUSTOMER.ADD_CUSTOMER')}</span>
        </BreadcrumbItem>
      </Breadcrumb>
      <Form onSubmit={handleSubmit(handleOnSubmit)}>
        <Row>
          <Col sm={8}>
            <Card>
              <CardHeader>
                <CardTitle tag="h4">{i18n.t('CUSTOMER.ADD_CUSTOMER')}</CardTitle>
              </CardHeader>
              <CardBody>
                <div className="divider divider-start divider-primary">
                  <div className="divider-text text-primary fw-bolder">{i18n.t('CUSTOMER.CUSTOMER_INFORMATION')}</div>
                </div>
                <Row className="mb-1">
                  <Label sm="3" for="name">
                    {i18n.t('CUSTOMER.NAME')}
                    <span className="text-danger">*</span>
                  </Label>
                  <Col sm="3">
                    <FormItemSelect
                      control={control}
                      name="honorific"
                      errors={errors}
                      placeholder={i18n.t('CUSTOMER.HONORIFIC')}
                      options={honorificOptions}
                    />
                  </Col>
                  <Col sm="6">
                    <FormItemInput
                      control={control}
                      name="name"
                      errors={errors}
                      placeholder={i18n.t('CUSTOMER.NAME')}
                      inputType="text"
                    />
                  </Col>
                </Row>

                <Row className="mb-1">
                  <Label sm="3" for="phoneNumber">
                    {i18n.t('CUSTOMER.PHONE')}
                    <span className="text-danger">*</span>
                  </Label>
                  <Col sm="9">
                    <FormItemInput
                      control={control}
                      name="primaryPhoneNumber"
                      errors={errors}
                      placeholder={i18n.t('CUSTOMER.PHONE')}
                      inputType="tel"
                    />
                  </Col>
                </Row>

                <Row className="mb-1">
                  <Label sm="3" for="email">
                    {i18n.t('CUSTOMER.EMAIL')}
                  </Label>
                  <Col sm="9">
                    <FormItemInput
                      control={control}
                      name="email"
                      errors={errors}
                      placeholder={i18n.t('CUSTOMER.EMAIL')}
                      inputType="email"
                    />
                  </Col>
                </Row>

                <Row className="mb-1">
                  <Label sm="3" for="address">
                    {i18n.t('CUSTOMER.ADDRESS')}
                  </Label>
                  <Col sm="9">
                    <FormItemInput
                      control={control}
                      name="address"
                      errors={errors}
                      placeholder={i18n.t('CUSTOMER.ADDRESS')}
                      inputType="text"
                    />
                  </Col>
                </Row>

                <Row className="mb-1">
                  <Label sm="3" for="sex">
                    {i18n.t('CUSTOMER.SEX')}
                  </Label>
                  <Col sm="9">
                    <FormItemSelect
                      control={control}
                      name="sex"
                      errors={errors}
                      placeholder={i18n.t('CUSTOMER.SEX')}
                      options={sexOptions}
                    />
                  </Col>
                </Row>

                <Row className="mb-1">
                  <Label sm="3" for="sex">
                    {i18n.t('CUSTOMER.LEVEL')}
                  </Label>
                  <Col sm="9">
                    <FormItemSelect
                      control={control}
                      name="level"
                      errors={errors}
                      placeholder={i18n.t('CUSTOMER.LEVEL')}
                      options={levelOptions}
                    />
                  </Col>
                </Row>

                <Row className="mb-1">
                  <Label sm="3" for="socialLink">
                    {i18n.t('CUSTOMER.SOCIAL')}
                  </Label>
                  <Col sm="9">
                    <FormItemInput
                      control={control}
                      name="socialLink"
                      errors={errors}
                      placeholder={i18n.t('CUSTOMER.SOCIAL')}
                      inputType="url"
                    />
                  </Col>
                </Row>

                <Row>
                  <Col className="d-flex" md={{ size: 9, offset: 3 }}>
                    <LoadingButton
                      loading={createCustomerMutation.isLoading}
                      className="me-1"
                      color="primary"
                      type="submit"
                      disabled={createCustomerMutation.isLoading}
                    >
                      {i18n.t('COMMON.SUBMIT')}
                    </LoadingButton>
                  </Col>
                </Row>

              </CardBody>
            </Card>
          </Col>

          <Col sm={4}>
            <Card>
              <CardHeader>
                <CardTitle tag="h4">{i18n.t('COMMON.GUIDE')}</CardTitle>
              </CardHeader>
              <CardBody>
                <Trans
                  i18nKey="CUSTOMER.GUIDE_CREATE_CUSTOMER"
                  components={{ strong: <strong className="text-danger" /> }}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Form>
    </div>
  );
}
