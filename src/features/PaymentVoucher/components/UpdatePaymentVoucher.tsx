import {
  Button,
  Col,
  Form,
  FormFeedback,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  Spinner,
} from 'reactstrap';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  PaymentVoucherMethod,
  paymentVoucherMethodTypes,
  UpdatePaymentVoucherForm,
} from '@domain/entities/paymentVoucher/PaymentVoucher';
import i18n from '@config/i18n';
import FormItemInput from '@components/Form/FormItemInput';
import FormItemDatePicker from '@components/Form/FormItemDatePicker';
import CurrencyInput from 'react-currency-input-field';
import { convertCurrencyToNumber } from '@utils/CurrencyUtils';
import FormItemSelect from '@components/Form/FormItemSelect';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import FormItemFileInput from '@components/Form/FormItemFileInput';
import {
  PAYMENT_VOUCHER_QUERY_KEY,
  useCurrentPaymentVoucher,
  useOpenUpdateModal,
  useUpdatePaymentVoucherMutation,
} from '@hooks/paymentVoucher';
import { useQueryClient } from '@tanstack/react-query';
import { paymentVoucherActions } from '@redux/slices/paymentVoucherSlice';
import { useDispatch } from 'react-redux';

const methodOptions = [
  { label: i18n.t('PAYMENT_VOUCHER.CASH'), value: PaymentVoucherMethod.CASH },
  { label: i18n.t('PAYMENT_VOUCHER.TRANSFER'), value: PaymentVoucherMethod.TRANSFER },
];

const schema = yup.object().shape({
  amount: yup
    .number()
    .integer(i18n.t('MESSAGE.REQUIRED_INTEGER_MESSAGE', { field: i18n.t('PAYMENT_VOUCHER.AMOUNT') }))
    .min(1, i18n.t('MESSAGE.MIN_VALUE_MESSAGE', { field: i18n.t('PAYMENT_VOUCHER.AMOUNT'), value: 1 })),
  description: yup.string().required(i18n.t('COMMON.FIELD_IS_REQUIRED', { field: i18n.t('PAYMENT_VOUCHER.DESCRIPTION') })),
  method: yup.string()
    .required(i18n.t('COMMON.FIELD_IS_REQUIRED', { field: i18n.t('PAYMENT_VOUCHER.METHOD') }))
    .oneOf(paymentVoucherMethodTypes, i18n.t('MESSAGE.INVALID_MESSAGE')),
  signGroup: yup.string().required(i18n.t('COMMON.FIELD_IS_REQUIRED', { field: i18n.t('PAYMENT_VOUCHER.SIGN_GROUP') })),
});

const PaymentVoucherUpdatePage = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const updatingPaymentVoucher = useCurrentPaymentVoucher();
  const openUpdateModal = useOpenUpdateModal();

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<UpdatePaymentVoucherForm>({
    resolver: yupResolver(schema),
  });

  const toggleUpdateFormModal = () => {
    dispatch(paymentVoucherActions.unSelectPaymentVoucher());
  };

  useEffect(() => {
    if (updatingPaymentVoucher) reset(updatingPaymentVoucher);
  }, [updatingPaymentVoucher]);
  const handleReset = () => {
    toggleUpdateFormModal();
    reset();
  };

  const { updatePaymentVoucherMutate, isLoading } = useUpdatePaymentVoucherMutation(
    () => {
      queryClient.invalidateQueries([PAYMENT_VOUCHER_QUERY_KEY]);
      handleReset();
    },
  );

  const onSubmit = (data: UpdatePaymentVoucherForm) => {
    updatePaymentVoucherMutate({
      ...data,
      code: updatingPaymentVoucher?.code!,
      receiverId: updatingPaymentVoucher?.receiverId!,
    });
  };

  return (
    <div className="demo-inline-spacing">
      <div>
        <Modal isOpen={openUpdateModal} toggle={() => toggleUpdateFormModal()} className="modal-dialog-centered">
          <Form onSubmit={handleSubmit(onSubmit)}>

            <ModalHeader toggle={() => toggleUpdateFormModal()}>
              {i18n.t('PAYMENT_VOUCHER.UPDATE_PAYMENT_VOUCHER')}
            </ModalHeader>
            <ModalBody>
              <Row>
                <Col md={5}>
                  <div className="mb-2">
                    <Label className="form-label" for="amount">
                      {i18n.t('PAYMENT_VOUCHER.AMOUNT')}
                      {' '}
                      <span className="text-danger">{' *'}</span>
                    </Label>
                    <Controller
                      name="amount"
                      control={control}
                      render={({ field: { onChange, ...rest } }) => (
                        <CurrencyInput
                          {...rest}
                          className={`form-control text-end ${errors.amount && 'is-invalid'}`}
                          onValueChange={(newValue) => {
                            const numericValue = convertCurrencyToNumber(newValue);
                            onChange(numericValue);
                          }}
                          decimalSeparator="."
                          groupSeparator=","
                        />
                      )}
                    />
                    {errors.amount
                      && <FormFeedback>{errors.amount.message}</FormFeedback>}
                  </div>
                </Col>
              </Row>
              <div className="mb-2">
                <Label className="form-label" for="description">
                  {i18n.t('PAYMENT_VOUCHER.DESCRIPTION')}
                  {' '}
                  <span className="text-danger">{' *'}</span>
                </Label>
                <FormItemInput
                  inputType="textarea"
                  control={control}
                  errors={errors}
                  name="description"
                />
              </div>
              <div className="mb-2">
                <Label className="form-label" for="note">
                  {i18n.t('PAYMENT_VOUCHER.NOTE')}
                </Label>
                <FormItemInput
                  inputType="textarea"
                  control={control}
                  errors={errors}
                  name="note"
                />
              </div>
              <div className="mb-2">
                <Label className="form-label" for="tourId">
                  {i18n.t('PAYMENT_VOUCHER.TOUR_ID')}
                </Label>
                <FormItemInput
                  control={control}
                  errors={errors}
                  name="tourId"
                />
              </div>
              <Row>
                <Col md={6}>
                  <div className="mb-2">
                    <Label className="form-label" for="deadline">
                      {i18n.t('PAYMENT_VOUCHER.DEADLINE')}
                    </Label>
                    <FormItemDatePicker
                      control={control}
                      errors={errors}
                      name="deadline"
                    />
                  </div>
                </Col>
                <Col md={6}>
                  <div className="mb-2">
                    <Label className="form-label" for="method">
                      {i18n.t('PAYMENT_VOUCHER.METHOD')}
                      {' '}
                      <span className="text-danger">{' *'}</span>
                    </Label>
                    <FormItemSelect
                      control={control}
                      name="method"
                      options={methodOptions}
                      isClearable
                      errors={errors}
                    />
                  </div>
                </Col>
              </Row>
              <Row>
                <div className="mb-2">
                  <Label className="form-label" for="signGroup">
                    {i18n.t('PAYMENT_VOUCHER.SIGN_GROUP')}
                    {' '}
                    <span className="text-danger">{' *'}</span>
                  </Label>
                  <FormItemInput
                    control={control}
                    errors={errors}
                    name="signGroup"
                  />
                </div>
                <Row>
                  <Col className="mb-2">
                    <FormItemInput
                      inputType="checkbox"
                      control={control}
                      name="includeTax"
                      errors={{}}
                    />
                    <Label className="form-label" for="includeTax">
                      &nbsp;
                      {i18n.t('PAYMENT_VOUCHER.INCLUDE_TAX')}
                    </Label>
                  </Col>
                  <Col className="mb-2">
                    <FormItemInput
                      inputType="checkbox"
                      control={control}
                      name="quickApproval"
                      errors={{}}
                    />
                    <Label className="form-label" for="quickApproval">
                      &nbsp;
                      {i18n.t('PAYMENT_VOUCHER.QUICk_APPROVE')}
                    </Label>
                  </Col>
                </Row>
              </Row>
              <div className="mb-2">
                <Label className="form-label" for="attachment">
                  {i18n.t('PAYMENT_VOUCHER.ATTACHMENT')}
                  :
                  {' '}
                </Label>
                <a
                  href={updatingPaymentVoucher?.attachment}
                  className="text-truncate text-body"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span
                    className="fw-bolder text-primary"
                  >
                    {updatingPaymentVoucher?.attachment?.split('/').pop()}
                  </span>
                </a>
                <FormItemFileInput
                  control={control}
                  errors={errors}
                  name="updatingAttachment"
                />
              </div>
            </ModalBody>
            <ModalFooter>
              <div className="d-flex justify-content-end">
                <Button type="reset" color="danger" className="me-1" outline onClick={handleReset}>
                  {i18n.t('COMMON.CANCEL')}
                </Button>
                <Button type="submit" className="me-1" color="primary">
                  {!isLoading ? i18n.t('PAYMENT_VOUCHER.UPDATE_PAYMENT_VOUCHER') : i18n.t('COMMON.LOADING')}
                  {isLoading ? (
                    <Spinner
                      style={{ width: '0.7rem', height: '0.7rem' }}
                      type="grow"
                      color="light"
                    />
                  ) : null}
                </Button>
              </div>
            </ModalFooter>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default PaymentVoucherUpdatePage;
