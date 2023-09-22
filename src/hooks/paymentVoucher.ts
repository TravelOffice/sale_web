import { useMutation, useQuery } from '@tanstack/react-query';
import { paymentVoucherPresenter, tourPresenter } from '@adapter/presenters';
import toasty from '@components/Toasty/Toasty';
import i18n from 'i18next';
import {
  CreatePaymentVoucherForm,
  PaymentVoucher,
  UpdatePaymentVoucherForm,
} from '@domain/entities/paymentVoucher/PaymentVoucher';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@redux/store';
import { paymentVoucherActions } from '@redux/slices/paymentVoucherSlice';

export const PAYMENT_VOUCHER_QUERY_KEY = 'paymentVoucher';
export const usePaymentVouchers = () => useQuery(
  [PAYMENT_VOUCHER_QUERY_KEY], paymentVoucherPresenter.getAllPaymentVouchers,
);

export const usePaymentVouchersOfTour = (tourId: string) => useQuery(
  [PAYMENT_VOUCHER_QUERY_KEY, tourId], async () => tourPresenter.getPaymentVouchersByTour(tourId),
);

export const useCreatePaymentVoucherMutation = (onSuccessCallback: () => void) => {
  const handleSuccess = () => {
    toasty.show({
      title: i18n.t('COMMON.SUCCESS'),
      type: 'success',
      message: i18n.t('PAYMENT_VOUCHER.CREATE_PAYMENT_VOUCHER_SUCCESSFULLY'),
    });
    onSuccessCallback();
  };

  const { mutate: createMutate, isLoading: isCreatingPaymentVoucher } = useMutation({
    mutationFn: paymentVoucherPresenter.createPaymentVoucher,
    onSuccess: handleSuccess,
    onError: (error) => {
      toasty.show({
        title: i18n.t('COMMON.ERROR'),
        type: 'error',
        message: `${error}`,
      });
    },
  });

  const { mutate: uploadMutate, isLoading: isUploadingAttachment } = useMutation({
    mutationFn: (
      formValue: CreatePaymentVoucherForm,
    ) => paymentVoucherPresenter.uploadPaymentVoucherAttachment(formValue.attachment[0]),
    onSuccess: (data, variables: CreatePaymentVoucherForm) => {
      const paymentVoucherToAdd = {
        ...variables,
        attachment: data.cdn,
      } as PaymentVoucher;
      createMutate(paymentVoucherToAdd);
    },
    onError: (error) => {
      toasty.show({
        title: i18n.t('COMMON.ERROR'),
        type: 'error',
        message: `${error}`,
      });
    },
  });

  const createPaymentVoucherMutate = async (formValue: CreatePaymentVoucherForm) => {
    const isUploading = formValue.attachment.length >= 1;
    if (isUploading) {
      return uploadMutate(formValue);
    }
    // eslint-disable-next-line no-unused-vars
    const { attachment, ...rest } = formValue;
    return createMutate(rest as PaymentVoucher);
  };

  // Combine the isLoading variables
  const isLoading = isCreatingPaymentVoucher || isUploadingAttachment;

  return { createPaymentVoucherMutate, isLoading };
};

export const useUpdatePaymentVoucherMutation = (onSuccessCallback: () => void) => {
  const dispatch = useDispatch();
  const handleSuccess = () => {
    toasty.show({
      title: i18n.t('COMMON.SUCCESS'),
      type: 'success',
      message: i18n.t('PAYMENT_VOUCHER.UPDATE_PAYMENT_VOUCHER_SUCCESSFULLY'),
    });
    dispatch(paymentVoucherActions.unSelectPaymentVoucher);
    dispatch(paymentVoucherActions.setOpenUpdateModal(false));
    onSuccessCallback();
  };

  const { mutate: updateMutate, isLoading: isUpdatingPaymentVoucher } = useMutation({
    mutationFn: paymentVoucherPresenter.updatePaymentVoucher,
    onSuccess: handleSuccess,
    onError: (error) => {
      toasty.show({
        title: i18n.t('COMMON.ERROR'),
        type: 'error',
        message: `${error}`,
      });
    },
  });

  const { mutate: uploadMutate, isLoading: isUploadingAttachment } = useMutation({
    mutationFn: (
      formValue: UpdatePaymentVoucherForm,
    ) => paymentVoucherPresenter.uploadPaymentVoucherAttachment(formValue.updatingAttachment[0]),
    onSuccess: (data, variables: UpdatePaymentVoucherForm) => {
      const paymentVoucherToUpdate = {
        ...variables,
        attachment: data.cdn,
      } as PaymentVoucher;
      updateMutate(paymentVoucherToUpdate);
    },
    onError: (error) => {
      toasty.show({
        title: i18n.t('COMMON.ERROR'),
        type: 'error',
        message: `${error}`,
      });
    },
  });

  const updatePaymentVoucherMutate = async (formValue: UpdatePaymentVoucherForm) => {
    const isUploading = formValue.updatingAttachment.length >= 1;
    if (isUploading) {
      return uploadMutate(formValue);
    }
    // eslint-disable-next-line no-unused-vars
    const { updatingAttachment, ...rest } = formValue;
    return updateMutate(rest as PaymentVoucher);
  };

  // Combine the isLoading variables
  const isLoading = isUpdatingPaymentVoucher || isUploadingAttachment;

  return { updatePaymentVoucherMutate, isLoading };
};

export function useCurrentPaymentVoucher() {
  return useSelector((state: RootState) => state.paymentVoucher.currentPaymentVoucher);
}

export function useOpenUpdateModal() {
  return useSelector((state: RootState) => state.paymentVoucher.openUpdateModal);
}

export function useOpenApproveModal() {
  return useSelector((state: RootState) => state.paymentVoucher.openApproveModal);
}
