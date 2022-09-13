import React, { useCallback, useState } from 'react';
import { LinkEmailStepProps } from '@features/Settings/connections/mail/LinkEmailStepProps';
import { Button, Col } from 'reactstrap';
import {
  ArrowLeft, ArrowRight, Eye, EyeOff,
} from 'react-feather';
import { useWatch } from 'react-hook-form';
import { LinkEmailFormData } from '@domain/entities/formData/LinkEmailFormData';
import { useTranslation } from 'react-i18next';

function PasswordText(props: { password: string }) {
  const { password } = props;
  const [visibility, setVisibility] = useState(false);
  return (
    <>
      {visibility ? password : '*'.repeat(password.length)}
      {visibility ? (
        <EyeOff className="ms-1" size={14} onClick={() => setVisibility(false)} />
      ) : (
        <Eye className="ms-1" size={14} onClick={() => setVisibility(true)} />
      )}
    </>
  );
}

export default function Review(props: LinkEmailStepProps) {
  const { form, stepper } = props;
  const { control, handleSubmit } = form;
  const { t } = useTranslation();
  const data = useWatch({ control });
  const onSubmit = useCallback(() => {
    handleSubmit((formData: LinkEmailFormData) => {
      // TODO: Invoke API call to link email
      console.log('formData', formData);
    })();
  }, []);

  return (
    <>
      <Col className="p-0 mt-xl-0 mt-2">
        <table className="w-100">
          <tbody>
            <tr><h6 className="mb-2">{t('MAIL.DETAILS')}</h6></tr>
            <tr>
              <td className="pe-1">
                {t('MAIL.NAME')}
                :
              </td>
              <td>
                <span className="fw-bold">{data.name}</span>
              </td>
            </tr>
            <tr>
              <td className="pe-1">
                {t('MAIL.MAIL_ADDRESS')}
                :
              </td>
              <td><span className="fw-bold">{data.mailAddress}</span></td>
            </tr>
            <div className="mt-2" />
            <tr><h6 className="mb-2">{t('MAIL.CONFIGURE_INBOUND')}</h6></tr>
            <tr>
              <td className="pe-1">
                {t('MAIL.PROTOCOL')}
                :
              </td>
              <td>
                <span className="fw-bold">{data.protocol}</span>
              </td>
            </tr>
            <tr>
              <td className="pe-1">
                {t('MAIL.INBOUND_HOST')}
                :
              </td>
              <td>
                <span className="fw-bold">{data.inboundHost}</span>
              </td>
            </tr>
            <tr>
              <td className="pe-1">
                {t('MAIL.INBOUND_SSL_MODE')}
                :
              </td>
              <td><span className="fw-bold">{data.inboundSslMode}</span></td>
            </tr>
            <tr>
              <td className="pe-1">
                {t('MAIL.INBOUND_PORT')}
                :
              </td>
              <td><span className="fw-bold">{data.inboundPort}</span></td>
            </tr>
            <tr>
              <td className="pe-1">
                {t('MAIL.INBOUND_USERNAME')}
                :
              </td>
              <td><span className="fw-bold">{data.inboundUser}</span></td>
            </tr>
            <tr>
              <td className="pe-1">
                {t('MAIL.INBOUND_PASSWORD')}
                :
              </td>
              <td>
                <span className="fw-bold d-inline-flex align-items-center">
                  <PasswordText password={data.inboundPassword || ''} />
                </span>
              </td>
            </tr>
            <div className="mt-2" />
            <tr>
              <h6 className="mb-2">
                {t('MAIL.CONFIGURE_OUTBOUND')}
              </h6>
            </tr>
            <tr>
              <td className="pe-1">
                {t('MAIL.OUTBOUND_HOST')}
                :
              </td>
              <td><span className="fw-bold">{data.outboundHost}</span></td>
            </tr>
            <tr>
              <td className="pe-1">
                {t('MAIL.PROTOCOL')}
                :
              </td>
              <td><span className="fw-bold">{data.outboundSslMode}</span></td>
            </tr>
            <tr>
              <td className="pe-1">
                {t('MAIL.OUTBOUND_PORT')}
                :
              </td>
              <td><span className="fw-bold">{data.outboundPort}</span></td>
            </tr>
            <tr>
              <td className="pe-1">
                {t('MAIL.OUTBOUND_USERNAME')}
                :
              </td>
              <td><span className="fw-bold">{data.outboundUser}</span></td>
            </tr>
            <tr>
              <td className="pe-1">
                {t('MAIL.OUTBOUND_PASSWORD')}
                :
              </td>
              <td>
                <span className="fw-bold d-inline-flex align-items-center">
                  <PasswordText password={data.outboundPassword || ''} />
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </Col>
      <div className="d-flex justify-content-between mt-2">
        <Button color="secondary" outline onClick={() => stepper.prev()}>
          <ArrowLeft size={14} className="rotate-rtl align-middle me-sm-50 me-0" />
          <div className="align-middle d-sm-inline-block d-none">{t('COMMON.PREVIOUS')}</div>
        </Button>
        <Button color="success" onClick={onSubmit}>
          <div className="align-middle d-sm-inline-block d-none">{t('COMMON.SUBMIT')}</div>
          <ArrowRight size={14} className="rotate-rtl align-middle ms-sm-50 ms-0" />
        </Button>
      </div>
    </>
  );
}
