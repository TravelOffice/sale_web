import React, { useCallback, useEffect } from 'react';
import {
  Card, CardBody, CardHeader, CardTitle, Col, Form, Label, Row,
} from 'reactstrap';
import { useParams } from 'react-router-dom';
import i18n from '@config/i18n';
import FormItemSelect from '@components/Form/FormItemSelect';
import FormItemInput from '@components/Form/FormItemInput';
import LoadingButton from '@components/LoadingButton/LoadingButton';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { customerPresenter } from '@adapter/presenters';
import { honorificOptions } from '@utils/LeadUtils';
import toasty from '@components/Toasty/Toasty';
import { UpdateCustomerFormData } from '@domain/entities/customer/Customer';
import {
  customerLevelOptions,
  customerSourceOptions,
  maritalStatusOptions,
  sexOptions,
  updateCustomerSchema,
} from '@utils/CustomerUtils';
import { useAllSaleOptions } from '@hooks/users';
import renderSkeleton from '@components/Skeleton/Skeleton';

export interface EditCustomerTabParams {
  customerId: string,
}

export default function CustomerDetailTab() {
  const queryClient = useQueryClient();
  const { customerId } = useParams<EditCustomerTabParams>();
  const {
    data: customer,
    isLoading,
  } = useQuery(['customers', customerId], async () => customerPresenter.getCustomer(customerId));
  const saleOptions = useAllSaleOptions();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UpdateCustomerFormData>({ resolver: yupResolver(updateCustomerSchema) });

  useEffect(() => {
    if (customer) reset(customer);
  }, [customer]);

  const updateCustomerMutation = useMutation({
    mutationKey: ['updateCustomer'],
    mutationFn: async (
      formData: UpdateCustomerFormData,
    ) => customerPresenter.updateCustomer(customerId, formData),
    onSuccess: (newCustomer) => {
      queryClient.setQueryData(['customers', customerId], newCustomer);
      toasty.show({
        type: 'success',
        title: i18n.t('COMMON.SUCCESS'),
        message: i18n.t('CUSTOMER.EDIT_CUSTOMER_SUCCESSFULLY', { customerName: newCustomer.name }),
      });
    },
    onError: (error: Error) => {
      toasty.show({
        type: 'error',
        message: error.message,
        title: i18n.t('COMMON.ERROR'),
      });
    },
  });

  // const history = useHistory();
  const handleOnSubmit = useCallback((formData: UpdateCustomerFormData) => {
    updateCustomerMutation.mutate(formData);
  }, []);
  return (
    <div className="to-table-container">
      <Form onSubmit={handleSubmit(handleOnSubmit)}>
        <Row>
          <Col sm={12}>
            <Card>
              <CardHeader>
                <CardTitle tag="h4">{i18n.t('CUSTOMER.EDIT_CUSTOMER')}</CardTitle>
              </CardHeader>
              <CardBody>
                {
                  isLoading ? (
                    renderSkeleton()
                  ) : (
                    <>
                      <div className="divider divider-start divider-primary">
                        <div
                          className="divider-text text-primary fw-bolder"
                        >
                          {i18n.t('CUSTOMER.CUSTOMER_INFORMATION')}
                        </div>
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
                        <Label sm="3" for="primaryPhoneNumber">
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
                        <Label sm="3" for="assigneeId">
                          {i18n.t('CUSTOMER.ASSIGNEE')}
                        </Label>
                        <Col sm="9">
                          <FormItemSelect
                            control={control}
                            name="assigneeId"
                            errors={errors}
                            placeholder={i18n.t('CUSTOMER.ASSIGNEE')}
                            options={saleOptions}
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
                        <Col sm="4">
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
                        <Label sm="3" for="level">
                          {i18n.t('CUSTOMER.LEVEL')}
                        </Label>
                        <Col sm="4">
                          <FormItemSelect
                            control={control}
                            name="level"
                            errors={errors}
                            placeholder={i18n.t('CUSTOMER.LEVEL')}
                            options={customerLevelOptions}
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

                      <Row className="mb-1">
                        <Label sm="3" for="birthday">
                          {i18n.t('CUSTOMER.BIRTHDAY')}
                        </Label>
                        <Col sm="9">
                          <FormItemInput
                            control={control}
                            name="birthday"
                            errors={errors}
                            placeholder={i18n.t('CUSTOMER.BIRTHDAY')}
                            inputType="text"
                          />
                        </Col>
                      </Row>

                      <Row className="mb-1">
                        <Label sm="3" for="source">
                          {i18n.t('CUSTOMER.SOURCE')}
                        </Label>
                        <Col sm="4">
                          <FormItemSelect
                            control={control}
                            name="source"
                            errors={errors}
                            placeholder={i18n.t('CUSTOMER.SOURCE')}
                            options={customerSourceOptions}
                          />
                        </Col>
                      </Row>

                      <Row className="mb-1">
                        <Label sm="3" for="name">
                          {i18n.t('CUSTOMER.MARITAL_STATUS')}
                        </Label>
                        <Col sm="4">
                          <FormItemSelect
                            control={control}
                            name="maritalStatus"
                            errors={errors}
                            placeholder={i18n.t('CUSTOMER.MARITAL_STATUS')}
                            options={maritalStatusOptions}
                          />
                        </Col>
                      </Row>

                      <Row className="mb-1">
                        <Label sm="3" for="address">
                          {i18n.t('CUSTOMER.INTEREST')}
                        </Label>
                        <Col sm="9">
                          <FormItemInput
                            control={control}
                            name="interest"
                            errors={errors}
                            placeholder={i18n.t('CUSTOMER.INTEREST')}
                            inputType="text"
                          />
                        </Col>
                      </Row>

                      <Row className="mb-1">
                        <Label sm="3" for="group">
                          {i18n.t('CUSTOMER.GROUP')}
                        </Label>
                        <Col sm="9">
                          <FormItemInput
                            control={control}
                            name="group"
                            errors={errors}
                            placeholder={i18n.t('CUSTOMER.GROUP')}
                            inputType="text"
                          />
                        </Col>
                      </Row>

                      <Row className="mb-1">
                        <Label sm="3" for="group">
                          {i18n.t('CUSTOMER.GENITIVE')}
                        </Label>
                        <Col sm="9">
                          <FormItemInput
                            control={control}
                            name="genitive"
                            errors={errors}
                            placeholder={i18n.t('CUSTOMER.GENITIVE')}
                            inputType="text"
                          />
                        </Col>
                      </Row>

                      <Row className="mb-1">
                        <Label sm="3" for="group">
                          {i18n.t('CUSTOMER.TAX_CODE')}
                        </Label>
                        <Col sm="9">
                          <FormItemInput
                            control={control}
                            name="taxCode"
                            errors={errors}
                            placeholder={i18n.t('CUSTOMER.TAX_CODE')}
                            inputType="text"
                          />
                        </Col>
                      </Row>

                      <Row>
                        <Col className="d-flex" md={{ size: 9, offset: 3 }}>
                          <LoadingButton
                            loading={updateCustomerMutation.isLoading}
                            className="me-1"
                            color="primary"
                            type="submit"
                            disabled={updateCustomerMutation.isLoading}
                          >
                            {i18n.t('COMMON.SUBMIT')}
                          </LoadingButton>
                        </Col>
                      </Row>
                    </>
                  )
                }
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Form>
    </div>
  );
}
