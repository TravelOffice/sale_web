import i18n from '@config/i18n';
import AttachmentMessageType from '@domain/entities/chat/AttachmentMessageType';
import { RootState } from '@redux/store';
import { getFileExtension, getFileSizeAsText } from '@utils/FileUtils';
import React from 'react';
import { File, Volume2 } from 'react-feather';
import { useSelector } from 'react-redux';
import {
  Button, Modal, ModalBody, ModalFooter, ModalHeader,
} from 'reactstrap';

interface AttachmentMessagePreviewProps {
  attachment: File | null,
  attachmentType: AttachmentMessageType,
  onCancelSendingAttachment: () => void,
  onSubmitSendingAttachment: () => void,
}

export default function AttachmentMessagePreview(props: AttachmentMessagePreviewProps) {
  const isShowingAttachmentMsgPreview = useSelector(
    (state: RootState) => state.chat.showingAttachmentMsgPreview,
  );
  const {
    attachment, attachmentType, onCancelSendingAttachment, onSubmitSendingAttachment,
  } = props;

  const getShortAttachmentInfo = () => `${getFileSizeAsText(attachment)} - ${getFileExtension(attachment)}`;

  const renderAttachmentPreview = () => {
    switch (attachmentType) {
      case AttachmentMessageType.IMAGE:
        return <img className="w-100" style={{ objectFit: 'cover' }} src={attachment ? URL.createObjectURL(attachment) : ''} alt={attachment?.name} />;
      case AttachmentMessageType.AUDIO:
        return (
          <div className="d-flex flex-column">
            <Volume2 className="cursor-pointer text-secondary" size={120} />
            <p className="ps-2">
              {getShortAttachmentInfo()}
            </p>
          </div>
        );
      case AttachmentMessageType.VIDEO:
        return (
          <>
            {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
            <video className="w-100" controls>
              <source src={attachment ? URL.createObjectURL(attachment) : ''} />
            </video>
          </>
        );

      default:
        return (
          <div className="d-flex flex-column">
            <File className="cursor-pointer text-secondary" size={120} />
            <p className="ps-2">
              {getShortAttachmentInfo()}
            </p>
          </div>
        );
    }
  };

  const getModalSizeClass = () => {
    if (
      attachmentType === AttachmentMessageType.VIDEO
      || attachmentType === AttachmentMessageType.IMAGE
    ) {
      return 'modal-lg';
    }
    return '';
  };

  return (
    <>
      <Modal
        isOpen={isShowingAttachmentMsgPreview}
        className={
          `modal-dialog-centered ${getModalSizeClass()}`
        }
      >
        <ModalHeader toggle={onCancelSendingAttachment}>{attachment?.name}</ModalHeader>
        <ModalBody>
          <div className="d-flex flex-column align-items-center mt-1">
            {renderAttachmentPreview()}
          </div>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onCancelSendingAttachment}>{i18n.t('COMMON.CANCEL')}</Button>
          <Button color="primary" onClick={onSubmitSendingAttachment}>{i18n.t('CHAT.SEND_MESAGE')}</Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
