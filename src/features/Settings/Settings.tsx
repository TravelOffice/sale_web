import React, { ReactNode, useState } from 'react';
import SettingTabs from '@features/Settings/SettingTabs';
import {
  Bell, Bookmark, Link2, Lock, User,
} from 'react-feather';
import {
  Col, Row, TabContent, TabPane,
} from 'reactstrap';
import '@styles/react/libs/flatpickr/flatpickr.scss';
import '@styles/react/pages/page-account-settings.scss';
import ConnectionsTabContent from '@features/Settings/ConnectionsTabContent';

export interface Tab {
  id: string,
  title: string,
  icon: ReactNode,
  pane: ReactNode,
}

const tabs : Tab[] = [
  {
    id: 'account',
    icon: <User size={16} className="me-50" />,
    title: 'Account',
    pane: <div>Coming soon</div>,
  },
  {
    id: 'security',
    icon: <Lock size={16} className="me-50" />,
    title: 'Security',
    pane: <div>Coming soon</div>,
  },
  {
    id: 'billing',
    icon: <Bookmark size={16} className="me-50" />,
    title: 'Billing & Plans',
    pane: <div>Coming soon</div>,
  },
  {
    id: 'notifications',
    icon: <Bell size={16} className="me-50" />,
    title: 'Notifications',
    pane: <div>Coming soon</div>,
  },
  {
    id: 'connections',
    icon: <Link2 size={16} className="me-50" />,
    title: 'Connections',
    pane: <ConnectionsTabContent />,
  },
];

export default function Settings() {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  return (
    <>
      <Row>
        <Col xs={12}>
          <SettingTabs tabs={tabs} activeTab={activeTab} toggleTab={setActiveTab} />
          <TabContent activeTab={activeTab}>
            {
              tabs.map((tab) => (
                <TabPane key={tab.id} tabId={tab.id}>
                  {tab.pane}
                </TabPane>
              ))
            }
          </TabContent>
        </Col>
      </Row>
    </>
  );
}
