import React, { useCallback, useState } from 'react';
import { useSelectedMailAccount, useSelectedMailbox } from '@hooks/mail';
import { Trash } from 'react-feather';
import { MailSearchResult } from '@domain/entities/mail/MailSearchResult';
import { useDispatch } from 'react-redux';
import { mailActions } from '@redux/slices/mailSlice';
import { MailMessage } from '@domain/entities/mail/MailMessage';
import {
  Button, Modal, ModalBody, ModalFooter, ModalHeader,
} from 'reactstrap';
import i18n from '@config/i18n';

export interface DeleteMailProps {
  mails: MailSearchResult[] | MailMessage[],
  callback?: () => void,
}

export default function DeleteMailButton(props: DeleteMailProps) {
  const { mails, callback } = props;
  const [openDeletionWarning, setOpenDeletionWarning] = useState(false);
  const dispatch = useDispatch();
  const currentMailAccount = useSelectedMailAccount();
  const selectedMailbox = useSelectedMailbox();
  const isPermanentlyDelete = selectedMailbox === 'DELETE';

  // Delete selected messages
  const deleteMails = useCallback(() => {
    if (currentMailAccount && mails.length > 0) {
      dispatch(mailActions.deleteMail({
        email: currentMailAccount?.email,
        mailbox: selectedMailbox,
        messagesId: mails.map((mail: MailMessage | MailSearchResult) => mail.messageId),
      }));
      callback?.();
    }
  }, [mails]);

  // Toggle deletion warning dialog
  const toggleDeletionWarningDialog = () => {
    setOpenDeletionWarning(!openDeletionWarning);
  };

  // Render results
  return (
    <>
      <span className="action-icon" onClick={isPermanentlyDelete ? toggleDeletionWarningDialog : deleteMails}>
        <Trash size={18} />
      </span>
      <Modal
        isOpen={openDeletionWarning}
        toggle={toggleDeletionWarningDialog}
        className="modal-dialog-centered"
        modalClassName="modal-warning"
      >
        <ModalHeader toggle={toggleDeletionWarningDialog}>{mails.length === 1 ? i18n.t('MAIL.DELETE_MAIL_WARNING_TITLE') : i18n.t('MAIL.DELETE_MAILS_WARNING_TITLE', { count: mails.length })}</ModalHeader>
        <ModalBody>
          {mails.length === 1 ? i18n.t('MAIL.DELETE_MAIL_WARNING_MESSAGE') : i18n.t('MAIL.DELETE_MAILS_WARNING_MESSAGE', { count: mails.length }) }
        </ModalBody>
        <ModalFooter>
          <Button outline color="secondary" onClick={() => setOpenDeletionWarning(!openDeletionWarning)}>
            {i18n.t('COMMON.CANCEL')}
          </Button>
          <Button color="warning" onClick={deleteMails}>
            {i18n.t('COMMON.YES')}
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
