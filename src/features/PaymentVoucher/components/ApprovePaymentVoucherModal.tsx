import {
  Button, Modal, ModalBody, ModalFooter, ModalHeader, Spinner,
} from 'reactstrap';
import React, { MouseEventHandler } from 'react';
import i18n from '@config/i18n';
import { PAYMENT_VOUCHER_QUERY_KEY, useCurrentPaymentVoucher, useOpenApproveModal } from '@hooks/paymentVoucher';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { paymentVoucherActions } from '@redux/slices/paymentVoucherSlice';
import { useDispatch } from 'react-redux';
import { formatVND } from '@utils/CommonUtils';
import { Link } from 'react-router-dom';
import toasty from '@components/Toasty/Toasty';
import { approvePaymentVoucherUseCase } from '@domain/useCases';

const ApprovePaymentVoucherModal = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const paymentVoucher = useCurrentPaymentVoucher();
  const openApproveModal = useOpenApproveModal();

  const closeApproveFormModal = () => {
    dispatch(paymentVoucherActions.unSelectPaymentVoucher());
    dispatch(paymentVoucherActions.setOpenApproveModal(false));
  };

  const { mutate: approvePaymentVoucherMutate, isLoading } = useMutation({
    mutationFn: async (
      paymentVoucherCode: string,
    ) => approvePaymentVoucherUseCase.invoke(paymentVoucherCode),
    onSuccess: () => {
      toasty.show({
        title: i18n.t('COMMON.SUCCESS'),
        type: 'success',
        message: i18n.t('PAYMENT_VOUCHER.APPROVE_PAYMENT_VOUCHER_SUCCESSFULLY_MSG'),
      });
      queryClient.invalidateQueries([PAYMENT_VOUCHER_QUERY_KEY]);
    },
    onError: (error: Error) => {
      toasty.show({
        title: i18n.t('COMMON.ERROR'),
        type: 'error',
        message: error.message,
      });
    },
    onSettled: () => dispatch(paymentVoucherActions.setOpenApproveModal(false)),
  });

  const onApprovePaymentVoucher: MouseEventHandler = (e) => {
    e.preventDefault();
    if (paymentVoucher) {
      approvePaymentVoucherMutate(paymentVoucher?.code);
    }
  };

  return (
    <div className="demo-inline-spacing">
      <div>
        <Modal
          isOpen={openApproveModal}
          toggle={closeApproveFormModal}
          className="modal-dialog-centered"
          modalClassName="modal-primary"
          key="confirm-receive-modal"
        >
          <ModalHeader toggle={closeApproveFormModal}>{i18n.t('PAYMENT_VOUCHER.CONFIRM_APPROVE_PAYMENT_VOUCHER_TITLE')}</ModalHeader>
          <ModalBody>
            {i18n.t('PAYMENT_VOUCHER.CONFIRM_APPROVE_PAYMENT_VOUCHER_MSG')}
            <ul>
              <li>
                <b>
                  {i18n.t('PAYMENT_VOUCHER.CODE')}
                  :
                  {' '}
                </b>
                {paymentVoucher?.code}
              </li>
              <li>
                <b>
                  {i18n.t('PAYMENT_VOUCHER.AMOUNT')}
                  :
                  {' '}
                </b>
                {formatVND(paymentVoucher?.amount || 0)}
              </li>
              <li>
                <b>
                  {i18n.t('PAYMENT_VOUCHER.RECEIVER')}
                  :
                  {' '}
                </b>
                <Link to={`/apps/suppliers/${paymentVoucher?.receiverId}/edit`} className="text-truncate text-body">
                  <span className="fw-bolder text-primary">{paymentVoucher?.receiverName}</span>
                </Link>
              </li>
              <li>
                <b>
                  {i18n.t('PAYMENT_VOUCHER.CREATOR')}
                  :
                  {' '}
                </b>
                <Link to={`/apps/user/view/${paymentVoucher?.creatorId}`} className="text-truncate text-body">
                  <span className="fw-bolder text-primary">{paymentVoucher?.creatorName}</span>
                </Link>
              </li>
              <li>
                <b>
                  {i18n.t('PAYMENT_VOUCHER.ATTACHMENT')}
                  :
                  {' '}
                </b>
                <a
                  href={paymentVoucher?.attachment}
                  className="user_name text-truncate text-body"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="fw-bolder text-primary">
                    {i18n.t('PAYMENT_VOUCHER.DOWNLOAD_ATTACHMENT')}
                  </span>
                </a>
              </li>
            </ul>
          </ModalBody>
          <ModalFooter>
            <Button outline color="danger" onClick={closeApproveFormModal}>
              {i18n.t('COMMON.CANCEL')}
            </Button>
            <Button disabled={isLoading} color="primary" onClick={onApprovePaymentVoucher}>
              {isLoading ? (<Spinner size="sm" type="grow" color="light" />) : null}
              {!isLoading ? i18n.t('COMMON.CONFIRM') : i18n.t('COMMON.LOADING')}
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </div>
  );
};

export default ApprovePaymentVoucherModal;
