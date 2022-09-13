import React, {
  ChangeEvent, useCallback, useEffect, useState,
} from 'react';
import { Controller, FieldPath, useWatch } from 'react-hook-form';
import { LinkEmailFormData } from '@domain/entities/formData/LinkEmailFormData';
import {
  Button, Col, FormFeedback, Input, Label, Row,
} from 'reactstrap';
import Select from 'react-select';
import { inboundSslModes, mailProtocols } from '@domain/entities/mail/MailAccount';
import classnames from 'classnames';
import InputPasswordToggle from '@components/Input/InputPasswordToggle';
import { ValidationError } from 'yup';
import { ArrowLeft, ArrowRight } from 'react-feather';
import { LinkEmailStepProps } from '@features/Settings/connections/mail/LinkEmailStepProps';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import i18n from '@config/i18n';
import { getDefaultOutboundPort } from '@utils/MailUtils';

const schema = yup.object().shape({
  outboundHost: yup.string()
    .required(i18n.t('COMMON.FIELD_IS_REQUIRED', { field: i18n.t('MAIL.OUTBOUND_HOST') })),
  outboundSslMode: yup.string()
    .required(i18n.t('COMMON.FIELD_IS_REQUIRED', { field: i18n.t('MAIL.OUTBOUND_SSL_MODE') }))
    .oneOf([...inboundSslModes], i18n.t('COMMON.INVALID_ONE_OF', { field: i18n.t('MAIL.PROTOCOL'), values: mailProtocols.join(', ') })),
  outboundPort: yup.number()
    .required(i18n.t('COMMON.FIELD_IS_REQUIRED', { field: i18n.t('MAIL.OUTBOUND_PORT') }))
    .min(25, i18n.t('COMMON.INVALID_MIN', { field: i18n.t('MAIL.OUTBOUND_PORT'), min: 25 }))
    .max(995, i18n.t('COMMON.INVALID_MAX', { field: i18n.t('MAIL.OUTBOUND_PORT'), max: 995 })),
  outboundUser: yup.string()
    .required(i18n.t('COMMON.FIELD_IS_REQUIRED', { field: i18n.t('MAIL.OUTBOUND_USERNAME') })),
  outboundPassword: yup.string()
    .required(i18n.t('COMMON.FIELD_IS_REQUIRED', { field: i18n.t('MAIL.OUTBOUND_PASSWORD') })),
});

export default function ConfigureOutbound(props: LinkEmailStepProps) {
  const { form, stepper } = props;
  const {
    control, setValue, getValues,
  } = form;
  const sslMode = useWatch({ control, name: 'outboundSslMode' });
  const [errors, setErrors] = useState<Partial<Record<FieldPath<LinkEmailFormData>, string>>>({});
  const [useInboundUsername, setUseInboundUsername] = useState(false);
  const { t } = useTranslation();
  useEffect(() => {
    setValue('outboundPort', getDefaultOutboundPort(sslMode));
  }, [sslMode]);
  const onNext = useCallback(() => {
    const [
      outboundHost, outboundSslMode,
      outboundPort, outboundUser, outboundPassword,
    ] = getValues(['outboundHost', 'outboundSslMode', 'outboundPort', 'outboundUser', 'outboundPassword']);
    schema.validate({
      outboundHost, outboundSslMode, outboundPort, outboundUser, outboundPassword,
    }, { abortEarly: false }).then(() => {
      setErrors({});
      stepper.next();
    }).catch((err: ValidationError) => {
      setErrors(err.inner.reduce((a, v) => ({ ...a, [v.path!]: v.message }), {}));
    });
  }, []);

  const onUseInboundUsernameAndPassword = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setUseInboundUsername(event.target.checked);
  }, []);
  const [inboundUser, inboundPassword] = useWatch({ control, name: ['inboundUser', 'inboundPassword'] });

  useEffect(() => {
    if (useInboundUsername) {
      // Update `outboundUser` and `outboundPassword` whenever `inboundUser`
      // `inboundPassword` changed
      setValue('outboundUser', getValues('inboundUser'));
      setValue('outboundPassword', getValues('inboundPassword'));
    }
  }, [useInboundUsername, inboundUser, inboundPassword]);

  return (
    <>
      <div className="mb-1">
        <Label className="form-label" for="outboundHost">
          {t('MAIL.OUTBOUND_HOST')}
          {' '}
          <span className="text-danger">*</span>
        </Label>
        <Controller
          name="outboundHost"
          control={control}
          render={({ field }) => (
            <Input id="outboundHost" type="text" placeholder={t('MAIL.OUTBOUND_HOST')} invalid={!!errors.outboundHost} {...field} />
          )}
        />
        {errors.outboundHost && <FormFeedback>{errors.outboundHost}</FormFeedback>}
      </div>
      <Row>
        <Col md={8}>
          <div className="mb-1">
            <Label className="form-label" for="outboundSslMode">
              {t('MAIL.OUTBOUND_SSL_MODE')}
              {' '}
              <span className="text-danger">*</span>
            </Label>
            <Controller
              name="outboundSslMode"
              control={control}
              render={({ field: { value, onChange, ...rest } }) => (
                <Select
                  isClearable={false}
                  classNamePrefix="select"
                  options={inboundSslModes.map((mode) => ({ label: mode, value: mode }))}
                  className={classnames('react-select', { 'is-invalid': errors.outboundSslMode })}
                  value={{ label: value, value }}
                  onChange={(newValue) => onChange(newValue?.value)}
                  {...rest}
                />
              )}
            />
            {errors.outboundSslMode && <FormFeedback>{errors.outboundSslMode}</FormFeedback>}
          </div>
        </Col>
        <Col md={4}>
          <div className="mb-1">
            <Label className="form-label" for="outboundPort">
              {t('MAIL.OUTBOUND_PORT')}
              {' '}
              <span className="text-danger">*</span>
            </Label>
            <Controller
              name="outboundPort"
              control={control}
              render={({ field }) => (
                <Input id="outboundPort" min={25} max={995} type="number" placeholder={t('MAIL.OUTBOUND_PORT')} invalid={!!errors.outboundPort} {...field} />
              )}
            />
            {errors.outboundPort && <FormFeedback>{errors.outboundPort}</FormFeedback>}
          </div>
        </Col>
      </Row>
      <div className="form-check form-switch mb-1">
        <Input type="switch" id="use-inbound-username-password" onChange={onUseInboundUsernameAndPassword} />
        <Label className="form-check-label" for="use-inbound-username-password">
          {t('MAIL.USE_INBOUND_USER')}
        </Label>
      </div>
      <div className="mb-1">
        <Label className="form-label" for="outboundUser">
          {t('MAIL.OUTBOUND_USERNAME')}
          {' '}
          <span className="text-danger">*</span>
        </Label>
        <Controller
          name="outboundUser"
          control={control}
          render={({ field }) => (
            <Input disabled={useInboundUsername} id="outboundUser" type="text" placeholder={t('MAIL.OUTBOUND_USERNAME')} invalid={!!errors.outboundUser} {...field} />
          )}
        />
        {errors.outboundUser && <FormFeedback>{errors.outboundUser}</FormFeedback>}
      </div>
      <div className="mb-1">
        <Label className="form-label" for="outboundPassword">
          {t('MAIL.OUTBOUND_PASSWORD')}
          {' '}
          <span className="text-danger">*</span>
        </Label>
        <Controller
          name="outboundPassword"
          control={control}
          render={({ field }) => (
            <InputPasswordToggle disabled={useInboundUsername} id="outboundPassword" placeholder={t('MAIL.OUTBOUND_PASSWORD')} invalid={!!errors.outboundPassword} {...field} />
          )}
        />
        {errors.outboundPassword && <FormFeedback>{errors.outboundPassword}</FormFeedback>}
      </div>
      <div className="d-flex justify-content-between mt-2">
        <Button color="secondary" outline onClick={() => stepper.prev()}>
          <ArrowLeft size={14} className="rotate-rtl align-middle me-sm-50 me-0" />
          <div className="align-middle d-sm-inline-block d-none">{t('COMMON.PREVIOUS')}</div>
        </Button>
        <Button color="primary" onClick={onNext}>
          <div className="align-middle d-sm-inline-block d-none">{t('COMMON.NEXT')}</div>
          <ArrowRight size={14} className="rotate-rtl align-middle ms-sm-50 ms-0" />
        </Button>
      </div>
    </>
  );
}
