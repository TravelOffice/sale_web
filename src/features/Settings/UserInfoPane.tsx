import React, { useCallback, useEffect } from 'react';
import {
  Button, Card, CardBody, CardHeader, CardTitle, Col, Form, Input, Label, Row, Spinner,
} from 'reactstrap';
import i18n from '@config/i18n';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { userPresenter } from '@adapter/presenters';
import toasty from '@components/Toasty/Toasty';
import { UpdateAccountFormData, User, UserStatusEnum } from '@domain/entities/User';
import UserInfoCard from '@features/Settings/components/UserInfoCard';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import renderSkeleton from '@components/Skeleton/Skeleton';
import FormItemInput from '@components/Form/FormItemInput';
import moment from 'moment';
import FormItemDatePicker from '@components/Form/FormItemDatePicker';
import { SexType } from '@domain/entities/customer/Customer';
import { generateI18nForCustomer } from '@utils/CustomerUtils';
import FormItemSelect from '@components/Form/FormItemSelect';
import FormItemFileInput from '@components/Form/FormItemFileInput';

export const updateAccountSchema = yup.object().shape({
  email: yup.string()
    .email(i18n.t('MESSAGE.EMAIL_INVALID_MESSAGE'))
    .required(i18n.t('MESSAGE.REQUIRED_FIELD_MESSAGE', { field: i18n.t('USER.EMAIL') })),
  phoneNumber: yup.string()
    .required(i18n.t('MESSAGE.REQUIRED_FIELD_MESSAGE', { field: i18n.t('USER.PHONE') })),
  lastName: yup.string()
    .required(i18n.t('MESSAGE.REQUIRED_FIELD_MESSAGE', { field: i18n.t('USER.LASTNAME') })),
  firstName: yup.string()
    .required(i18n.t('MESSAGE.REQUIRED_FIELD_MESSAGE', { field: i18n.t('LEAD.FIRSTNAME') })),
  address: yup.string(),
  sex: yup.string(),
  birthday: yup.date(),
  status: yup.string().oneOf(Object.values(UserStatusEnum)),
});

export const sexOptions = [
  { label: generateI18nForCustomer(SexType.MALE), value: SexType.MALE },
  { label: generateI18nForCustomer(SexType.FEMALE), value: SexType.FEMALE },
  { label: generateI18nForCustomer(SexType.OTHER), value: SexType.OTHER },
];

export default function UserInfoPane() {
  const queryClient = useQueryClient();
  const {
    data: currentUser,
  } = useQuery(['currentUser'], async () => userPresenter.getCurrentUser());

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UpdateAccountFormData>({ resolver: yupResolver(updateAccountSchema) });

  useEffect(() => {
    if (currentUser) reset(currentUser);
  }, [currentUser]);

  const {
    mutate: updateCurrentUserMutation,
    isLoading,
  } = useMutation({
    mutationKey: ['updateCurrentUser'],
    mutationFn: async (
      formData: UpdateAccountFormData,
    ) => userPresenter.updateCurrentUser(formData),
    onSuccess: (updatedInfo: User) => {
      queryClient.setQueryData(['currentUser'], updatedInfo);
      toasty.show({
        type: 'success',
        title: i18n.t('COMMON.SUCCESS'),
        message: i18n.t('USER.UPDATE_ACCOUNT_SUCCESSFULLY'),
      });
    },
    onError: (error: Error) => {
      toasty.show({
        type: 'error',
        title: i18n.t('COMMON.ERROR'),
        message: error.message,
      });
    },
  });

  const handleCancel = () => {
    reset(currentUser);
  };

  const handleOnSubmit = useCallback(async (formData: UpdateAccountFormData) => {
    updateCurrentUserMutation(formData);
  }, []);

  return (
    <div className="to-table-container">
      <Form onSubmit={handleSubmit(handleOnSubmit)}>
        <Row>
          <Col md={4} className="d-flex flex-column">
            <UserInfoCard />
          </Col>
          <Col md={8}>
            <Card>
              <CardHeader>
                <CardTitle tag="h4">{i18n.t('USER.UPDATE_ACCOUNT')}</CardTitle>
              </CardHeader>
              <CardBody>
                { isLoading ? (
                  renderSkeleton()
                ) : (
                  <>
                    <Row className="mb-1">
                      <Label sm="3" for="attachment">
                        {i18n.t('USER.AVATAR')}
                      </Label>
                      <Col sm="7">
                        <FormItemFileInput
                          control={control}
                          errors={errors}
                          name="attachment"
                        />
                      </Col>
                    </Row>
                    <Row className="mb-1">
                      <Label sm="3" for="firstName">
                        {i18n.t('USER.FIRSTNAME')}
                        <span className="text-danger">*</span>
                      </Label>
                      <Col sm="7">
                        <FormItemInput
                          control={control}
                          name="firstName"
                          errors={errors}
                          placeholder={i18n.t('USER.FIRSTNAME')}
                          inputType="text"
                        />
                      </Col>
                    </Row>
                    <Row className="mb-1">
                      <Label sm="3" for="lastName">
                        {i18n.t('USER.LASTNAME')}
                        <span className="text-danger">*</span>
                      </Label>
                      <Col sm="7">
                        <FormItemInput
                          control={control}
                          name="lastName"
                          errors={errors}
                          placeholder={i18n.t('USER.LASTNAME')}
                          inputType="text"
                        />
                      </Col>
                    </Row>
                    <Row className="mb-1">
                      <Label sm="3" for="sex">
                        {i18n.t('CUSTOMER.SEX')}
                      </Label>
                      <Col sm="7">
                        <FormItemSelect
                          control={control}
                          name="sex"
                          errors={errors}
                          placeholder={i18n.t('USER.SEX')}
                          options={sexOptions}
                        />
                      </Col>
                    </Row>
                    <Row className="mb-1">
                      <Label sm="3" for="email">
                        {i18n.t('USER.EMAIL')}
                        <span className="text-danger">*</span>
                      </Label>
                      <Col sm="7">
                        <FormItemInput
                          control={control}
                          name="email"
                          errors={errors}
                          placeholder={i18n.t('USER.EMAIL')}
                          inputType="email"
                        />
                      </Col>
                    </Row>
                    <Row className="mb-1">
                      <Label sm="3" for="phoneNumber">
                        {i18n.t('USER.PHONE')}
                        <span className="text-danger">*</span>
                      </Label>
                      <Col sm="7">
                        <FormItemInput
                          control={control}
                          name="phoneNumber"
                          errors={errors}
                          placeholder={i18n.t('USER.PHONE')}
                          inputType="tel"
                        />
                      </Col>
                    </Row>
                    <Row className="mb-1">
                      <Label sm="3" for="birthday">
                        {i18n.t('USER.BIRTHDAY')}
                        <span className="text-danger">*</span>
                      </Label>
                      <Col sm="7">
                        <FormItemDatePicker
                          name="birthday"
                          control={control}
                          errors={errors}
                          placeholder={i18n.t('USER.BIRTHDAY')}
                          options={{
                            formatDate: (date) => moment(date).format('DD/MM/YYYY'),
                          }}
                        />
                      </Col>
                    </Row>
                    <Row className="mb-1">
                      <Label sm="3" for="address">
                        {i18n.t('USER.ADDRESS')}
                      </Label>
                      <Col sm="7">
                        <FormItemInput
                          control={control}
                          name="address"
                          errors={errors}
                          placeholder={i18n.t('USER.ADDRESS')}
                          inputType="text"
                        />
                      </Col>
                    </Row>
                    <Row className="mb-1">
                      <Label sm="3" for="address">
                        {i18n.t('CHAT_USER_SETTING.STATUS_TITLE')}
                      </Label>
                      <Col sm="7">
                        <Controller
                          control={control}
                          name="status"
                          render={({ field }) => (
                            <div className="demo-inline-spacing">
                              <ul className="list-unstyled user-status">
                                <li className="pb-1">
                                  <div className="form-check form-check-success">
                                    <Input
                                      {...field}
                                      type="radio"
                                      label="Online"
                                      id="user-online"
                                      value={UserStatusEnum.online}
                                      checked={field.value === UserStatusEnum.online}
                                    />
                                    <Label className="form-check-label" for="user-online">
                                      {i18n.t('CHAT_USER_SETTING.STATUS_ONLINE')}
                                    </Label>
                                  </div>
                                </li>
                                <li className="pb-1">
                                  <div className="form-check form-check-danger">
                                    <Input
                                      {...field}
                                      type="radio"
                                      id="user-busy"
                                      label="Do Not Disturb"
                                      value={UserStatusEnum.busy}
                                      checked={field.value === UserStatusEnum.busy}
                                    />
                                    <Label className="form-check-label" for="user-busy">
                                      {i18n.t('CHAT_USER_SETTING.STATUS_BUSY')}
                                    </Label>
                                  </div>
                                </li>
                                <li className="pb-1">
                                  <div className="form-check form-check-warning">
                                    <Input
                                      {...field}
                                      type="radio"
                                      label="Away"
                                      id="user-away"
                                      value={UserStatusEnum.away}
                                      checked={field.value === 'away'}
                                    />
                                    <Label className="form-check-label" for="user-away">
                                      {i18n.t('CHAT_USER_SETTING.STATUS_AWAY')}
                                    </Label>
                                  </div>
                                </li>
                                <li className="pb-1">
                                  <div className="form-check form-check-secondary">
                                    <Input
                                      {...field}
                                      type="radio"
                                      label="Offline"
                                      id="user-offline"
                                      value={UserStatusEnum.offline}
                                      checked={field.value === UserStatusEnum.offline}
                                    />
                                    <Label className="form-check-label" for="user-offline">
                                      {i18n.t('CHAT_USER_SETTING.STATUS_OFFLINE')}
                                    </Label>
                                  </div>
                                </li>
                              </ul>
                            </div>
                          )}
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col className="d-flex" md={{ size: 9, offset: 3 }}>
                        <Button type="reset" color="danger" className="me-1" outline onClick={handleCancel}>
                          {i18n.t('COMMON.CANCEL')}
                        </Button>
                        <Button type="submit" className="me-1" color="primary">
                          {!isLoading ? i18n.t('USER.UPDATE_ACCOUNT') : i18n.t('COMMON.LOADING')}
                          {isLoading ? (
                            <Spinner
                              style={{ width: '0.7rem', height: '0.7rem' }}
                              type="grow"
                              color="light"
                            />
                          ) : null}
                        </Button>
                      </Col>
                    </Row>
                  </>
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Form>
    </div>
  );
}
