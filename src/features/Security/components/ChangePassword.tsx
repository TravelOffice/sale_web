import React from 'react';
import {
  Card, CardHeader, CardTitle, CardBody, Button,
} from 'reactstrap';
import { getSSOPage } from '@utils/EnvUtils';
import i18n from 'i18next';

export default function ChangePassword() {
  const SSO_PAGE = getSSOPage();
  const handleChangePassword = () => {
    window.location.replace(`${SSO_PAGE}/change-password?redirect_uri=${window.location.origin}`);
  };

  return (
    <>
      <Card>
        <CardHeader className="border-bottom">
          <CardTitle tag="h4">{i18n.t('COMMON.CHANGE_PASSWORD_TITLE')}</CardTitle>
        </CardHeader>
        <CardBody className="my-2 py-25">
          <Button color="primary" onClick={() => handleChangePassword()}>
            {i18n.t('COMMON.CHANGE_PASSWORD_BUTTON')}
          </Button>
        </CardBody>
      </Card>
    </>
  );
}
