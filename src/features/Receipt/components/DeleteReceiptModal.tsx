import React from 'react';
import {
  Button, Modal, ModalBody, ModalFooter, ModalHeader, Spinner,
} from 'reactstrap';
import i18n from '@config/i18n';
import { Receipt } from '@domain/entities/receipt/Receipt';
import { useMutation } from '@tanstack/react-query';
import toasty from '@components/Toasty/Toasty';
import { receiptPresenter } from '@adapter/presenters';

export interface DeleteReceiptProps {
  receipt?: Receipt,
  openDeletionWarning: boolean,
  setOpenDeletionWarning: (open: boolean) => void,
  toggleDeletionWarningDialog: () => void,
  callback?: () => void,
}

export default function DeleteReceiptModal(props: DeleteReceiptProps) {
  const {
    receipt,
    callback,
    openDeletionWarning,
    setOpenDeletionWarning,
    toggleDeletionWarningDialog,
  } = props;

  const { isLoading, mutate } = useMutation({
    mutationFn: receiptPresenter.deleteReceipt,
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
        message: i18n.t('RECEIPT.DELETE_RECEIPT_SUCCESSFULLY'),
      });
      callback?.();
    },
  });

  const onDeleteReceipt = () => {
    if (receipt) mutate(receipt.code);
  };

  // Render results
  return (
    <>
      <Modal
        isOpen={openDeletionWarning}
        toggle={toggleDeletionWarningDialog}
        className="modal-dialog-centered"
        modalClassName="modal-warning"
      >
        <ModalHeader>{`${i18n.t('RECEIPT.DELETE_RECEIPT_WARNING_TITLE')} ${receipt?.code}`}</ModalHeader>
        <ModalBody>
          {i18n.t('RECEIPT.DELETE_RECEIPT_WARNING_MESSAGE') }
        </ModalBody>
        <ModalFooter>
          <Button outline color="secondary" onClick={() => setOpenDeletionWarning(!openDeletionWarning)}>
            {i18n.t('COMMON.CANCEL')}
          </Button>
          <Button color="warning" onClick={onDeleteReceipt}>
            { !isLoading ? i18n.t('COMMON.YES') : i18n.t('COMMON.LOADING')}
            { isLoading ? (
              <Spinner
                style={{ width: '0.7rem', height: '0.7rem' }}
                type="grow"
                color="light"
              />
            ) : null }
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
