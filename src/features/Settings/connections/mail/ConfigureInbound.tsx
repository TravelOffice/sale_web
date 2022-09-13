import React, { useCallback, useEffect, useState } from 'react';
import { Controller, FieldPath, useWatch } from 'react-hook-form';
import {
  Button,
  Col, FormFeedback, Input, Label, Row,
} from 'reactstrap';
import Select from 'react-select';
import { inboundSslModes, mailProtocols } from '@domain/entities/mail/MailAccount';
import classnames from 'classnames';
import InputPasswordToggle from '@components/Input/InputPasswordToggle';
import { LinkEmailStepProps } from '@features/Settings/connections/mail/LinkEmailStepProps';
import { LinkEmailFormData } from '@domain/entities/formData/LinkEmailFormData';
import { ValidationError } from 'yup';
import { ArrowLeft, ArrowRight } from 'react-feather';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import i18n from '@config/i18n';
import { getDefaultInboundPort } from '@utils/MailUtils';

const schema = yup.object().shape({
  protocol: yup.string()
    .required(i18n.t('COMMON.FIELD_IS_REQUIRED', { field: i18n.t('MAIL.PROTOCOL') }))
    .oneOf([...mailProtocols], i18n.t('COMMON.INVALID_ONE_OF', { field: i18n.t('MAIL.PROTOCOL'), values: mailProtocols.join(', ') })),
  inboundHost: yup.string()
    .required(i18n.t('COMMON.FIELD_IS_REQUIRED', { field: i18n.t('MAIL.INBOUND_HOST') })),
  inboundSslMode: yup.string()
    .required(i18n.t('COMMON.FIELD_IS_REQUIRED', { field: i18n.t('MAIL.INBOUND_SSL_MODE') }))
    .oneOf([...inboundSslModes], i18n.t('COMMON.INVALID_ONE_OF', { field: i18n.t('MAIL.INBOUND_SSL_MODE'), values: inboundSslModes.join(', ') })),
  inboundPort: yup.number()
    .required(i18n.t('COMMON.FIELD_IS_REQUIRED', { field: i18n.t('MAIL.INBOUND_PORT') }))
    .min(25, i18n.t('COMMON.INVALID_MIN', { field: i18n.t('MAIL.INBOUND_PORT'), min: 25 }))
    .max(995, i18n.t('COMMON.INVALID_MAX', { field: i18n.t('MAIL.INBOUND_PORT'), max: 995 })),
  inboundUser: yup.string()
    .required(i18n.t('COMMON.FIELD_IS_REQUIRED', { field: i18n.t('MAIL.INBOUND_USERNAME') })),
  inboundPassword: yup.string()
    .required(i18n.t('COMMON.FIELD_IS_REQUIRED', { field: i18n.t('MAIL.INBOUND_PASSWORD') })),
});

export default function ConfigureInbound(props: LinkEmailStepProps) {
  const { form, stepper } = props;
  const [errors, setErrors] = useState<Partial<Record<FieldPath<LinkEmailFormData>, string>>>({});
  const { control, setValue, getValues } = form;
  const [inboundProtocol, sslMode] = useWatch({ control, name: ['protocol', 'inboundSslMode'] });
  const { t } = useTranslation();
  useEffect(() => {
    setValue('inboundPort', getDefaultInboundPort(inboundProtocol, sslMode));
  }, [inboundProtocol, sslMode]);
  const onNext = useCallback(() => {
    const [
      protocol, inboundHost, inboundSslMode,
      inboundPort, inboundUser, inboundPassword,
    ] = getValues(['protocol', 'inboundHost', 'inboundSslMode', 'inboundPort', 'inboundUser', 'inboundPassword']);
    schema.validate({
      protocol, inboundHost, inboundSslMode, inboundPort, inboundUser, inboundPassword,
    }, { abortEarly: false }).then(() => {
      setErrors({});
      stepper.next();
    }).catch((err: ValidationError) => {
      setErrors(err.inner.reduce((a, v) => ({ ...a, [v.path!]: v.message }), {}));
    });
  }, []);

  return (
    <>
      <div className="mb-1">
        <Label className="form-label" for="protocol">
          {t('MAIL.PROTOCOL')}
          {' '}
          <span className="text-danger">*</span>
        </Label>
        <Controller
          name="protocol"
          control={control}
          render={({ field: { value, onChange, ...rest } }) => (
            <Select
              isClearable={false}
              classNamePrefix="select"
              options={mailProtocols.map((protocol) => ({ label: protocol, value: protocol }))}
              className={classnames('react-select', { 'is-invalid': errors.protocol })}
              value={{ label: value, value }}
              onChange={(newValue) => onChange(newValue?.value)}
              {...rest}
            />
          )}
        />
        {errors.protocol && <FormFeedback>{errors.protocol}</FormFeedback>}
      </div>
      <div className="mb-1">
        <Label className="form-label" for="inboundHost">
          {t('MAIL.INBOUND_HOST')}
          {' '}
          <span className="text-danger">*</span>
        </Label>
        <Controller
          name="inboundHost"
          control={control}
          render={({ field }) => (
            <Input id="inboundHost" type="text" placeholder={t('MAIL.INBOUND_HOST')} invalid={!!errors.inboundHost} {...field} />
          )}
        />
        {errors.inboundHost && <FormFeedback>{errors.inboundHost}</FormFeedback>}
      </div>
      <Row>
        <Col md={8}>
          <div className="mb-1">
            <Label className="form-label" for="inboundSslMode">
              {t('MAIL.INBOUND_SSL_MODE')}
              {' '}
              <span className="text-danger">*</span>
            </Label>
            <Controller
              name="inboundSslMode"
              control={control}
              render={({ field: { value, onChange, ...rest } }) => (
                <Select
                  isClearable={false}
                  classNamePrefix="select"
                  options={inboundSslModes.map((mode) => ({ label: mode, value: mode }))}
                  className={classnames('react-select', { 'is-invalid': errors.inboundSslMode })}
                  value={{ label: value, value }}
                  onChange={(newValue) => onChange(newValue?.value)}
                  {...rest}
                />
              )}
            />
            {errors.inboundSslMode && <FormFeedback>{errors.inboundSslMode}</FormFeedback>}
          </div>
        </Col>
        <Col md={4}>
          <div className="mb-1">
            <Label className="form-label" for="inboundPort">
              {t('MAIL.INBOUND_PORT')}
              {' '}
              <span className="text-danger">*</span>
            </Label>
            <Controller
              name="inboundPort"
              control={control}
              render={({ field }) => (
                <Input id="inboundPort" type="number" placeholder={t('MAIL.INBOUND_PORT')} invalid={!!errors.inboundPort} {...field} />
              )}
            />
            {errors.inboundPort && <FormFeedback>{errors.inboundPort}</FormFeedback>}
          </div>
        </Col>
      </Row>
      <div className="mb-1">
        <Label className="form-label" for="inboundUser">
          {t('MAIL.INBOUND_USERNAME')}
          {' '}
          <span className="text-danger">*</span>
        </Label>
        <Controller
          name="inboundUser"
          control={control}
          render={({ field }) => (
            <Input id="inboundUser" type="text" placeholder={t('MAIL.INBOUND_USERNAME')} invalid={!!errors.inboundUser} {...field} />
          )}
        />
        {errors.inboundUser && <FormFeedback>{errors.inboundUser}</FormFeedback>}
      </div>
      <div className="mb-1">
        <Label className="form-label" for="inboundPassword">
          {t('MAIL.INBOUND_PASSWORD')}
          {' '}
          <span className="text-danger">*</span>
        </Label>
        <Controller
          name="inboundPassword"
          control={control}
          render={({ field }) => (
            <InputPasswordToggle id="inboundPassword" placeholder={t('MAIL.INBOUND_PASSWORD')} invalid={!!errors.inboundPassword} {...field} />
          )}
        />
        {errors.inboundPassword && <FormFeedback>{errors.inboundPassword}</FormFeedback>}
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
