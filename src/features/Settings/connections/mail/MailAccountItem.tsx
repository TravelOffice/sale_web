import React, { useCallback, useState } from 'react';
import { MailAccount } from '@domain/entities/mail/MailAccount';
import { capitalizeFirstLetter } from '@utils/CommonUtils';
import { getMailProviderLogo } from '@utils/MailUtils';
import { X } from 'react-feather';
import LoadingButton from '@components/LoadingButton/LoadingButton';
import { mailPresenter } from '@adapter/presenters';
import { useMutationWithNotification } from '@hooks/common';
import { useTranslation } from 'react-i18next';
import {
  Button, Modal, ModalBody, ModalFooter, ModalHeader,
} from 'reactstrap';
import { useDispatch } from 'react-redux';
import { mailActions } from '@redux/slices/mailSlice';

export interface MailAccountItemProps extends React.HTMLAttributes<HTMLDivElement> {
  mailAccount: MailAccount,
}

export default function MailAccountItem(props: MailAccountItemProps) {
  const { mailAccount, className } = props;

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const { t } = useTranslation();
  const dispatch = useDispatch();

  const unlinkMailAccountMutation = useMutationWithNotification({
    mutationFn: () => mailPresenter.unlinkMailAccount(mailAccount),
    successMessage: () => t('MAIL.UNLINK_MAIL_ACCOUNT_SUCCESSFULLY', { mailAddress: mailAccount.email }),
  });

  const handleOnDelete = useCallback(() => {
    setShowDeleteDialog(false);
    unlinkMailAccountMutation.mutateAsync().finally(() => {
      dispatch(mailActions.refreshMailAccountList());
    });
  }, [mailAccount]);

  return (
    <div className={className}>
      <div className="flex-shrink-0">
        <img
          className="me-1"
          src={getMailProviderLogo(mailAccount.provider)}
          alt=""
          height="38"
          width="38"
        />
      </div>
      <div className="d-flex align-item-center justify-content-between flex-grow-1">
        <div className="me-1">
          <p className="fw-bolder mb-0">{capitalizeFirstLetter(mailAccount.name)}</p>
          <span>{mailAccount.email}</span>
        </div>
        <div className="mt-50 mt-sm-0">
          <LoadingButton
            outline
            className="btn-icon btn-outline-danger"
            onClick={() => setShowDeleteDialog(true)}
            loading={unlinkMailAccountMutation.isLoading}
            disabled={unlinkMailAccountMutation.isLoading}
          >
            <X color="red" className="font-medium-3" />
          </LoadingButton>
        </div>
        <Modal
          isOpen={showDeleteDialog}
          toggle={() => setShowDeleteDialog(!showDeleteDialog)}
          className="modal-dialog-centered"
          modalClassName="modal-danger"
        >
          <ModalHeader toggle={() => setShowDeleteDialog(!showDeleteDialog)}>
            {t('MAIL.UNLINK_MAIL_ACCOUNT')}
          </ModalHeader>
          <ModalBody>
            {t('MAIL.UNLINK_MAIL_ACCOUNT_WARNING')}
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" outline onClick={() => setShowDeleteDialog(!showDeleteDialog)}>
              {t('COMMON.CANCEL')}
            </Button>
            <Button color="danger" onClick={handleOnDelete}>
              {t('COMMON.UNLINK')}
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </div>
  );
}
