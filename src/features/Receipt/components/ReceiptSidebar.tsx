import React, { useCallback, useMemo } from 'react';
import SidebarForm, { FormSchema } from '@components/SidebarForm/SidebarForm';
import i18n from '@config/i18n';
import * as yup from 'yup';
import { UnpackNestedValue } from 'react-hook-form';
import {
  Receipt, ReceiptCreateFormData, ReceiptFormData, receiptStatusTypes, ReceiptUpdateFormData,
} from '@domain/entities/receipt/Receipt';
import { useMutation } from '@tanstack/react-query';
import { receiptPresenter } from '@adapter/presenters';
import toasty from '@components/Toasty/Toasty';

const defaultValues: ReceiptFormData = {
  paymentMethod: '',
  amount: 0,
  description: '',
  note: '',
};

export interface ReceiptSidebarProps {
  setOpenSidebar: (status: boolean) => void;
  toggleSidebar: () => void;
  open: boolean;
  receipt?: Receipt;
  onClosed: () => void;
  callback?: () => void;
}

/**
 * Custom hook to determine the form schema based on whether a receipt is provided or not.
 * @param receipt The receipt object, if available
 * @returns The form schema
 */
function useSchema(receipt: Receipt | undefined) {
  const commonElement = {
    paymentMethod: {
      type: 'text',
      label: i18n.t('RECEIPT.PAYMENT_METHOD'),
      required: true,
      validator: yup.string().required(i18n.t('COMMON.FIELD_IS_REQUIRED', { field: i18n.t('RECEIPT.PAYMENT_METHOD') })),
    },
    description: {
      type: 'text',
      label: i18n.t('RECEIPT.DESCRIPTION'),
      required: true,
      validator: yup.string().required(i18n.t('COMMON.FIELD_IS_REQUIRED', { field: i18n.t('RECEIPT.DESCRIPTION') })),
    },
    amount: {
      type: 'currency-input',
      label: i18n.t('RECEIPT.AMOUNT'),
      required: true,
      validator: yup
        .number()
        .integer(i18n.t('MESSAGE.REQUIRED_INTEGER_MESSAGE', { field: i18n.t('RECEIPT.AMOUNT') }))
        .min(1, i18n.t('MESSAGE.MIN_VALUE_MESSAGE', { field: i18n.t('RECEIPT.AMOUNT'), value: 1 }))
        .required(i18n.t('COMMON.FIELD_IS_REQUIRED', { field: i18n.t('RECEIPT.AMOUNT') })),
    },
    note: {
      type: 'text',
      label: i18n.t('RECEIPT.NOTE'),
      required: false,
    },
  };
  const updateElement = {
    code: {
      type: 'text',
      label: i18n.t('RECEIPT.CODE'),
      required: true,
      disabled: true,
      validator: yup.string().required(i18n.t('COMMON.FIELD_IS_REQUIRED', { field: i18n.t('RECEIPT.CODE') })),
      isShow: !!receipt,
    },
    ...commonElement,
    status: {
      type: 'select',
      label: i18n.t('RECEIPT.STATUS'),
      required: true,
      options: receiptStatusTypes.map((option) => ({
        label: i18n.t(`RECEIPT.${option}`),
        value: option,
      })),
      validator: yup.string().oneOf(receiptStatusTypes, i18n.t('MESSAGE.INVALID_MESSAGE')),
    },
  };
  return useMemo(() => {
    if (receipt) {
      return updateElement as FormSchema<ReceiptUpdateFormData>;
    }
    return commonElement as FormSchema<ReceiptCreateFormData>;
  }, [receipt]);
}

export default function ReceiptSidebar(props: ReceiptSidebarProps) {
  const {
    open, toggleSidebar, receipt, onClosed, callback,
  } = props;

  // Determine the initial form data based on whether a receipt is provided or not
  const receiptFormData: ReceiptFormData = useMemo(() => {
    if (receipt) {
      return {
        ...receipt,
      } as ReceiptUpdateFormData;
    }
    return defaultValues;
  }, [receipt]);

  const schema = useSchema(receipt);

  const createOrUpdateMutation = (
    data: Receipt,
  ): Promise<Receipt> => {
    if (receipt) {
      return receiptPresenter.updateReceipt({
        ...receipt,
        ...data,
        code: receipt.code,
      });
    }
    return receiptPresenter.createReceipt(data);
  };

  const {
    isLoading, mutate,
  } = useMutation({
    mutationFn: createOrUpdateMutation,
    onError: (error) => {
      toasty.show({
        title: i18n.t('COMMON.ERROR'),
        type: 'error',
        message: `${error}`,
      });
    },
    onSuccess: () => {
      toasty.show({
        title: i18n.t('COMMON.SUCCESS'),
        type: 'success',
        message: receipt ? i18n.t('RECEIPT.UPDATE_RECEIPT_SUCCESSFULLY') : i18n.t('RECEIPT.CREATE_RECEIPT_SUCCESSFULLY'),
      });
      callback?.();
    },
  });

  const onSubmit = useCallback(
    (formData: UnpackNestedValue<ReceiptFormData>) => mutate(formData as Receipt), [receipt],
  );

  return (
    <SidebarForm<ReceiptFormData>
      schema={schema}
      defaultValues={receiptFormData}
      title={receipt ? i18n.t('COMMON.EDIT') : i18n.t('COMMON.ADD')}
      open={open}
      size="lg"
      onSubmit={onSubmit}
      toggleSidebar={toggleSidebar}
      submitting={isLoading}
      onClosed={onClosed}
    />
  );
}
