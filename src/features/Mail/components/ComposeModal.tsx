import React, {
  useCallback, useEffect, useState,
} from 'react';
import {
  Button,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Form,
  Input,
  Label,
  Modal,
  ModalBody, Spinner,
  UncontrolledButtonDropdown,
} from 'reactstrap';
import {
  Minus, Paperclip, X,
} from 'react-feather';
import { Editor } from 'react-draft-wysiwyg';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@redux/store';
import { mailActions } from '@redux/slices/mailSlice';
import { Controller, useForm } from 'react-hook-form';
import TagsInput from '@components/Input/TagsInput';
import draftToHtml from 'draftjs-to-html';
import { SendMailFormData } from '@domain/entities/mail/SendMailFormData';
import { useSelectedMailAccount, useUploadedAttachments } from '@hooks/mail';
import classNames from 'classnames';
import LazyImage from '@components/Image/LazyImage';
import { getFileThumbnail, MAXIMUM_ATTACHMENT_SIZE } from '@utils/MailUtils';
import { getFileSizeText } from '@utils/FileUtils';
import { MailAttachment } from '@domain/entities/mail/MailAttachment';
import { useTranslation } from 'react-i18next';
import toasty from '@components/Toasty/Toasty';

export default function ComposeModal() {
  const [ccOpen, setCCOpen] = useState(false);
  const [bccOpen, setBCCOpen] = useState(false);
  const [files, setFiles] = useState<File[]>();
  const mailAccount = useSelectedMailAccount();
  const sending = useSelector((state: RootState) => state.mail.isSendingMail);
  const uploadedFiles = useUploadedAttachments();
  const { t } = useTranslation();

  const { control, getValues, setValue } = useForm<SendMailFormData>({});
  useEffect(() => {
    if (mailAccount) {
      setValue('from', [{ personal: '', address: mailAccount.email }]);
      setValue('subject', '');
    }
  }, [mailAccount]);

  const dispatch = useDispatch();
  const composeModalOpen = useSelector((state: RootState) => state.mail.composeModalOpen);

  const toggleCompose = useCallback(() => {
    dispatch(mailActions.toggleComposeModal());
  }, [composeModalOpen]);

  const toggleCC = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setCCOpen(!ccOpen);
  };

  const toggleBCC = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setBCCOpen(!bccOpen);
  };

  const togglePopUp = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    toggleCompose();
  };

  const onSubmit = useCallback(() => {
    // Discard submit when sending email
    if (sending) {
      return;
    }
    // Discard submit when uploading file
    if (Object.values(uploadedFiles).find((file) => file.uploading)) {
      return;
    }
    const formData = getValues() as SendMailFormData;
    const request = { ...formData, attachments: Object.values(uploadedFiles) };
    dispatch(mailActions.sendMail(request));
  }, [uploadedFiles]);

  const onFilesChanged = useCallback((fileList: FileList | null) => {
    if (!fileList) return;
    const distinctFileList: File[] = [];
    const distinctFilenames: string[] = [];
    for (let i = 0; i < fileList.length; i += 1) {
      const file = fileList.item(i);
      if (file) {
        if (file.size > MAXIMUM_ATTACHMENT_SIZE) {
          toasty.show({
            title: t('COMMON.ERROR'),
            type: 'error',
            message: t('MAIL.FILE_TOO_BIG'),
          });
          return;
        }
        if (!distinctFilenames.includes(file.name)) {
          distinctFilenames.push(file.name);
          distinctFileList.push(file);
        }
      }
    }
    setFiles(distinctFileList);
  }, []);

  useEffect(() => {
    if (!files) return;
    const currentUploadedFiles = { ...uploadedFiles };
    files.map(async (file) => {
      const fileUpload = currentUploadedFiles[file.name];
      if (!fileUpload || !fileUpload.uploading) {
        dispatch(mailActions.uploadAttachment(file));
      }
    });
  }, [files]);

  const removeAttachment = useCallback((fileName: string) => {
    dispatch(mailActions.removeAttachment(fileName));
  }, []);

  const onClosed = useCallback(() => {
    dispatch((mailActions.resetComposeModal()));
  }, []);

  return (
    <Modal
      scrollable
      fade={false}
      keyboard={false}
      backdrop={false}
      id="compose-mail"
      container=".content-right"
      className="modal-lg"
      isOpen={composeModalOpen}
      contentClassName="p-0"
      toggle={toggleCompose}
      modalClassName="modal-sticky"
      onClosed={onClosed}
    >
      <div className="modal-header">
        <h5 className="modal-title">{ t('MAIL.COMPOSE') }</h5>
        <div className="modal-actions">
          <a href="/" className="text-body me-75" onClick={togglePopUp}>
            <Minus size={14} />
          </a>
          <a href="/" className="text-body" onClick={togglePopUp}>
            <X size={14} />
          </a>
        </div>
      </div>
      <ModalBody className="flex-grow-1 p-0">
        <Form className="compose-form">
          <div className="compose-mail-form-field">
            <Label for="email-to" className="form-label">
              {t('MAIL.TO')}
              :
            </Label>
            <div className="flex-grow-1">
              <Controller
                control={control}
                name="to"
                render={({ field: { onChange, ...rest } }) => (
                  <TagsInput
                    onChanged={(tags: string[]) => onChange(tags.map((tag) => ({
                      address: tag,
                      personal: '',
                    })))}
                    {...rest}
                  />
                )}
              />
            </div>
            <div>
              <a href="/" className="toggle-cc text-body me-1" onClick={toggleCC}>
                {t('MAIL.CC')}
              </a>
              <a href="/" className="toggle-cc text-body" onClick={toggleBCC}>
                {t('MAIL.BCC')}
              </a>
            </div>
          </div>
          {ccOpen ? (
            <div className="compose-mail-form-field cc-wrapper">
              <Label for="email-cc" className="form-label">
                {t('MAIL.CC')}
                :
              </Label>
              <div className="flex-grow-1">
                <Controller
                  control={control}
                  name="cc"
                  render={({ field: { onChange, ...rest } }) => (
                    <TagsInput
                      onChanged={(tags: string[]) => onChange(tags.map((tag) => ({
                        address: tag,
                        personal: '',
                      })))}
                      {...rest}
                    />
                  )}
                />
              </div>
              <div>
                <a href="/" className="toggle-cc text-body" onClick={toggleCC}>
                  <X size={14} />
                </a>
              </div>
            </div>
          ) : null}
          {bccOpen ? (
            <div className="compose-mail-form-field cc-wrapper">
              <Label for="email-bcc" className="form-label">
                {t('MAIL.BCC')}
                :
              </Label>
              <div className="flex-grow-1">
                <Controller
                  control={control}
                  name="bcc"
                  render={({ field: { onChange, ...rest } }) => (
                    <TagsInput
                      onChanged={(tags: string[]) => onChange(tags.map((tag) => ({
                        address: tag,
                        personal: '',
                      })))}
                      {...rest}
                    />
                  )}
                />
              </div>
              <div>
                <a href="/" className="toggle-cc text-body" onClick={toggleBCC}>
                  <X size={14} />
                </a>
              </div>
            </div>
          ) : null}
          <div className="compose-mail-form-field">
            <Label for="email-subject" className="form-label">
              {t('MAIL.SUBJECT')}
              :
            </Label>
            <Controller
              control={control}
              name="subject"
              render={({ field }) => (
                <Input id="email-subject" placeholder="" {...field} />
              )}
            />
          </div>
          <div id="message-editor">
            <Controller
              control={control}
              name="htmlContent"
              render={({ field: { onChange } }) => (
                <Editor
                  placeholder={t('MAIL.MESSAGE_CONTENT')}
                  toolbarClassName="rounded-0"
                  wrapperClassName="toolbar-bottom"
                  editorClassName="rounded-0 border-0"
                  toolbar={{
                    options: ['inline', 'textAlign', 'list'],
                    inline: {
                      inDropdown: false,
                      options: ['bold', 'italic', 'underline', 'strikethrough'],
                    },
                  }}
                  onChange={(contentState) => onChange(draftToHtml(contentState))}
                />
              )}
            />
          </div>
          <div className="mail-attachments">
            {
              Object.keys(uploadedFiles).length > 0 ? (
                <div className="d-flex align-items-center mb-1">
                  <Paperclip size={16} />
                  <h5 className="fw-bolder text-body mb-0 ms-50">
                    {Object.keys(uploadedFiles).length}
                    {' '}
                    {Object.keys(uploadedFiles).length > 1 ? t('MAIL.ATTACHMENTS') : t('MAIL.ATTACHMENT')}
                  </h5>
                </div>
              ) : null
            }
            <div className="d-flex flex-column list-attachments">
              {
                Object.values(uploadedFiles).map((file: MailAttachment, index) => (
                  <div
                    key={file.name}
                    className={classNames('text-primary', { 'mb-50': index + 1 !== Object.keys(uploadedFiles).length })}
                  >
                    <LazyImage lazySrc={getFileThumbnail(file.name)} alt={file.name} width="16" className="me-50" />
                    <span className="fw-bolder align-text-top">{file.name}</span>
                    {
                        file.size
                          ? <span className="font-small-2 ms-25">{`(${getFileSizeText(file.size)})`}</span> : null
                      }
                    {' '}
                    {
                        file.uploading
                          ? (
                            <Spinner
                              style={{ width: '0.7rem', height: '0.7rem' }}
                              color="blue"
                            />
                          )
                          : <X size={15} onClick={() => removeAttachment(file.name)} />
                      }
                    <span className="font-small-2 ms-25 cursor-pointer" />
                  </div>
                ))
              }
            </div>
          </div>
          <div className="compose-footer-wrapper">
            <div className="btn-wrapper d-flex align-items-center">
              <UncontrolledButtonDropdown direction="up" className="me-1">
                <Button color="primary" onClick={onSubmit} disabled={sending}>
                  {!sending ? t('MAIL.SEND') : t('MAIL.SENDING')}
                </Button>
                <DropdownToggle className="dropdown-toggle-split" color="primary" caret />
                <DropdownMenu end>
                  <DropdownItem href="/" tag="a" onClick={togglePopUp}>
                    {t('MAIL.SCHEDULE_SEND')}
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledButtonDropdown>
              <div className="email-attachment">
                <Label className="mb-0" for="attach-email-item">
                  <Paperclip className="cursor-pointer ms-50" size={18} />
                  <input
                    type="file"
                    name="attach-email-item"
                    id="attach-email-item"
                    hidden
                    onChange={(e) => onFilesChanged(e.target.files)}
                  />
                </Label>
              </div>
            </div>
            <div className="footer-action d-flex align-items-center" />
          </div>
        </Form>
      </ModalBody>
    </Modal>
  );
}
