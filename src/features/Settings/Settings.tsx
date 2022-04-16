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
    pane: <ConnectionsTabContent />,
  },
  {
    id: 'security',
    icon: <Lock size={16} className="me-50" />,
    title: 'Security',
    pane: <ConnectionsTabContent />,
  },
  {
    id: 'billing',
    icon: <Bookmark size={16} className="me-50" />,
    title: 'Billing & Plans',
    pane: <ConnectionsTabContent />,
  },
  {
    id: 'notifications',
    icon: <Bell size={16} className="me-50" />,
    title: 'Notifications',
    pane: <ConnectionsTabContent />,
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
