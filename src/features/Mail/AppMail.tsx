import React, { useState } from 'react';
import AppMailSidebar from '@features/Mail/components/AppMailSidebar';
import '@styles/react/apps/app-email.scss';
import classnames from 'classnames';
import ComposeModal from '@features/Mail/components/ComposeModal';
import AppMailContent from '@features/Mail/components/AppMailContent';

export default function AppMail() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
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
