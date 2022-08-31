import React, { useState } from 'react';
import Sidebar from '@features/Mail/components/Sidebar';
import '@styles/react/apps/app-email.scss';
import classnames from 'classnames';
import MailList from '@features/Mail/components/MailList';
import { useMails } from '@hooks/mail';

export default function AppMail() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const mails = useMails();
  return (
    <>
      <Sidebar sidebarOpen={sidebarOpen} />
      <div className="content-right">
        <div className="content-body">
          <div
            className={classnames('body-content-overlay', { show: false })}
            onClick={() => setSidebarOpen(false)}
          />
          <MailList onMenuClick={() => setSidebarOpen(true)} mails={mails} />
        </div>
      </div>
    </>
  );
}
