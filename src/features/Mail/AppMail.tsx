import React, { useState } from 'react';
import AppMailSidebar from '@features/Mail/components/AppMailSidebar';
import '@styles/react/apps/app-email.scss';
import classnames from 'classnames';
import ComposeModal from '@features/Mail/components/ComposeModal';
import AppMailContent from '@features/Mail/components/AppMailContent';
import { useSelector } from 'react-redux';
import { RootState } from '@redux/store';
import { Button } from 'reactstrap';
import LazyImage from '@components/Image/LazyImage';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function AppMail() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { t } = useTranslation();
  const mailAccounts = useSelector((state: RootState) => state.mail.mailAccounts);
  const isFetchingMailAccounts = useSelector((
    state: RootState,
  ) => state.mail.isFetchingMailAccounts);
  const isEmptyMailAccounts = !isFetchingMailAccounts && mailAccounts.length === 0;

  if (isEmptyMailAccounts) {
    return (
      <div className="w-100 h-100 d-flex flex-column align-items-center justify-content-center">
        <LazyImage className="h-50" lazySrc={import('@assets/images/illustration/coming-soon/coming-soon.svg')} />
        <div className="misc-inner pt-2">
          <div className="w-100 text-center">
            <p className="mb-2 font-medium-3">{t('MAIL.NO_MAIL_ACCOUNTS')}</p>
            <Button color="primary" className="btn-sm-block mb-2" tag={Link} to="/apps/account-settings">
              {t('COMMON.GET_STARTED')}
            </Button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <>
      <AppMailSidebar sidebarOpen={sidebarOpen} />
      <div className="content-right">
        <div className="content-body">
          <div
            className={classnames('body-content-overlay', { show: false })}
            onClick={() => setSidebarOpen(false)}
          />
          <AppMailContent onMenuClick={() => setSidebarOpen(true)} />
          <ComposeModal />
        </div>
      </div>
    </>
  );
}
