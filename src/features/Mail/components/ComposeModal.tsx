import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import {
  Button,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Form,
  FormFeedback,
  Input,
  Label,
  Modal,
  ModalBody,
  Spinner,
  UncontrolledButtonDropdown,
} from 'reactstrap';
import { Minus, Paperclip, X } from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@redux/store';
import { mailActions } from '@redux/slices/mailSlice';
import { Controller, useForm } from 'react-hook-form';
import TagsInput from '@components/Input/TagsInput';
import { SendMailFormData } from '@domain/entities/mail/SendMailFormData';
import { useSelectedMailAccount, useSelectedMailbox, useUploadedAttachments } from '@hooks/mail';
import classNames from 'classnames';
import LazyImage from '@components/Image/LazyImage';
import {
  FORWARD_PREFIX, getFileThumbnail, MAXIMUM_ATTACHMENT_SIZE, REPLY_PREFIX,
} from '@utils/MailUtils';
import { getFileSizeText } from '@utils/FileUtils';
import { MailAttachment } from '@domain/entities/mail/MailAttachment';
import { useTranslation } from 'react-i18next';
import toasty from '@components/Toasty/Toasty';
import * as yup from 'yup';
import { ValidationError } from 'yup';
import { MailMessage } from '@domain/entities/mail/MailMessage';
import { MailAddress } from '@domain/entities/mail/MailAddress';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export interface ComposeProps {
  mail: MailMessage,
  type: 'new' | 'reply' | 'reply_all' | 'forward' | 'draft',
}

export default function ComposeModal() {
  const [ccOpen, setCCOpen] = useState(false);
  const [bccOpen, setBCCOpen] = useState(false);
  const [files, setFiles] = useState<File[]>();
  const mailAccount = useSelectedMailAccount();
  const [htmlContent, setHtmlContent] = useState('');
  const sending = useSelector((state: RootState) => state.mail.isSendingMail);
  const uploadedFiles = useUploadedAttachments();
  const { t } = useTranslation();
  const [validationError, setValidationError] = useState<string>();
  const schema = yup.object().shape({
    to: yup.array().min(1, t('MAIL.ERROR_TO_ADDRESSES')).of(yup.object().shape({
      address: yup.string().email(),
      personal: yup.string(),
    })),
  });
  const { control, getValues, setValue } = useForm<SendMailFormData>({});
  const composeModalData = useSelector((state: RootState) => state.mail.composeModalData);
  const [addresses, setAddresses] = useState<Record<'from' | 'to' | 'cc' | 'bcc', MailAddress[]>>({
    from: [],
    to: [],
    cc: [],
    bcc: [],
  });
  const selectedMailBox = useSelectedMailbox();

  const getReplySubject = (subject: string) => {
    let newSubject = subject;
    const fwdIndex = newSubject.toLowerCase().indexOf(FORWARD_PREFIX.toLowerCase());
    if (fwdIndex >= 0) {
      newSubject = subject.substring(fwdIndex + FORWARD_PREFIX.length);
    }
    return newSubject.toLowerCase().includes(REPLY_PREFIX.toLowerCase()) ? newSubject : `${REPLY_PREFIX}${newSubject}`;
  };

  const getForwardSubject = (subject: string) => {
    let newSubject = subject;
    const replyIndex = subject.toLowerCase().indexOf(REPLY_PREFIX.toLowerCase());
    if (replyIndex >= 0) {
      newSubject = subject.substring(replyIndex + REPLY_PREFIX.length);
    }
    return newSubject.toLowerCase().includes(FORWARD_PREFIX.toLowerCase()) ? newSubject : `${FORWARD_PREFIX}${newSubject}`;
  };

  const fetchHtmlContent = useCallback((message: MailMessage) => {
    if (message.htmlContent) {
      fetch(message.htmlContent)
        .then((res) => res.text())
        .then((content) => {
          setHtmlContent(content);
        });
    } else {
      setHtmlContent('');
    }
  }, []);

  const fetchAddresses = useCallback((message: MailMessage, type: string) => {
    if (message.metaData) {
      fetch(message.metaData).then((res) => res.json()).then((data) => {
        let { to, cc } = data;
        switch (type) {
          case 'reply':
            setValue('subject', getReplySubject(message.subject));
            to = message.from;
            cc = [];
            break;
          case 'reply_all':
            setValue('subject', getReplySubject(message.subject));
            if (!to.find(
              (mailAddress: MailAddress) => mailAddress.address === message.from[0].address,
            )) {
              to = message.from.concat(to);
            }
            break;
          case 'forward':
            setValue('subject', getForwardSubject(message.subject));
            to = [];
            cc = [];
            break;
          default:
            setValue('subject', message.subject);
            break;
        }
        setAddresses({ ...data, to, cc });
      });
    }
  }, []);
  const dispatch = useDispatch();
  const getAttachmentS3Key = (cdnUrl: string) => {
    const url = decodeURIComponent(cdnUrl);
    const mailCdn = 'https://mailcdn.traveloffice.shop/';
    const cdnIndex = url.indexOf(mailCdn);
    return url.substring(cdnIndex + mailCdn.length);
  };
  const forwardAttachments = (message: MailMessage) => {
    if (message.attachments) {
      const attachments = message.attachments.map((attachment: MailAttachment) => (
        { ...attachment, path: getAttachmentS3Key(attachment.path) }
      ));
      dispatch(mailActions.setUploadAttachments(attachments));
    }
  };

  useEffect(() => {
    if (mailAccount) {
      setValue('from', [{ personal: '', address: mailAccount.email }]);
    }
    const { mail, type } = composeModalData;
    if (mail) {
      fetchAddresses(mail, type);
      fetchHtmlContent(mail);
      if (type === 'forward') {
        forwardAttachments(mail);
      }
    }
  }, [mailAccount, composeModalData]);

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
    const { mail } = composeModalData;
    const request = {
      ...formData,
      attachments: Object.values(uploadedFiles),
      messageId: selectedMailBox === 'draft' ? mail.messageId : undefined,
    };
    try {
      schema.validateSync(request);
      dispatch(mailActions.sendMail(request));
      setValidationError('');
    } catch (e: any) {
      if (e instanceof ValidationError) {
        const error = e as ValidationError;
        setValidationError(error.message);
      }
    }
  }, [uploadedFiles, composeModalData]);

  const onDraftMail = useCallback((event: any) => {
    event.preventDefault();
    // Discard submit when uploading file
    if (Object.values(uploadedFiles).find((file) => file.uploading)) {
      return;
    }
    const formData = getValues() as SendMailFormData;
    const request = {
      ...formData,
      attachments: Object.values(uploadedFiles),
    };
    try {
      schema.validateSync(request);
      dispatch(mailActions.toggleComposeModal());
      dispatch(mailActions.draftMail(request));
      setValidationError('');
    } catch (e: any) {
      if (e instanceof ValidationError) {
        const error = e as ValidationError;
        setValidationError(error.message);
      }
    }
  }, [uploadedFiles, composeModalData]);

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
    setAddresses({
      from: [],
      to: [],
      cc: [],
      bcc: [],
    });
    setCCOpen(false);
    setBCCOpen(false);
    setValue('subject', '');
    setValidationError('');
    dispatch((mailActions.resetComposeModal()));
  }, []);

  const validateEmail = (value: string) => {
    const regExp = new RegExp(/^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/);
    return regExp.test(value);
  };

  const formAddresses = useMemo(() => ({
    to: addresses.to?.map((address) => address.address),
    cc: addresses.cc?.map((address) => address.address),
    bcc: addresses.bcc?.map((address) => address.address),
  }), [addresses]);

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
        <h5 className="modal-title">{t('MAIL.COMPOSE')}</h5>
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
          <div className="compose-addresses">
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
                      validate={validateEmail}
                      onChanged={(tags: string[]) => onChange(tags.map((tag) => ({
                        address: tag,
                        personal: '',
                      })))}
                      defaultTags={formAddresses.to}
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
                        validate={validateEmail}
                        onChanged={(tags: string[]) => onChange(tags.map((tag) => ({
                          address: tag,
                          personal: '',
                        })))}
                        defaultTags={formAddresses.cc}
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
                        validate={validateEmail}
                        onChanged={(tags: string[]) => onChange(tags.map((tag) => ({
                          address: tag,
                          personal: '',
                        })))}
                        defaultTags={formAddresses.bcc}
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
          </div>
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
                <CKEditor
                  editor={ClassicEditor}
                  data={htmlContent}
                  onChange={(event, editor) => onChange(editor.getData())}
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
          <div className="compose-form-feedback">
            <FormFeedback className={'form-feedback d-block '.concat(validationError ? 'visible' : 'invisible')}>
              {validationError}
            </FormFeedback>
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
                  <DropdownItem href="/" tag="a" onClick={onDraftMail}>
                    {t('MAIL.SAVE_DRAFT')}
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
