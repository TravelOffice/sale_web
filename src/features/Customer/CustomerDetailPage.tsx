import React, { ReactNode, useState } from 'react';
import { List, ShoppingCart, User } from 'react-feather';
import {
  Breadcrumb, BreadcrumbItem, Col, Row, TabContent, TabPane,
} from 'reactstrap';
import '@styles/react/libs/flatpickr/flatpickr.scss';
import '@styles/react/pages/page-account-settings.scss';
import '@styles/react/apps/app-todo.scss';
import i18n from '@config/i18n';
import CustomerTabs from '@features/Customer/components/CustomerTabs';
import CustomerInfoCard from '@features/Customer/components/CustomerInfoCard';
import { Link } from 'react-router-dom';
import DetailTab from '@features/Customer/components/tabs/information/DetailTab';
import LeadsTab from '@features/Customer/components/tabs/lead/LeadsTab';

export interface Tab {
  id: string,
  title: string,
  icon: ReactNode,
  pane: ReactNode,
}

const tabs: Tab[] = [
  {
    id: 'information',
    icon: <List size={16} className="me-50" />,
    title: i18n.t('COMMON.INFORMATION'),
    pane: <DetailTab />,
  },
  {
    id: 'lead',
    icon: <User size={16} className="me-50" />,
    title: 'Lead',
    pane: <LeadsTab />,
  },
  {
    id: 'booking',
    icon: <ShoppingCart size={16} className="me-50" />,
    title: 'Booking',
    pane: <div>Coming soon</div>,
  },
];

export default function CustomerDetail() {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  return (
    <>
      <Row>
        <Breadcrumb className="ms-1 mb-1">
          <BreadcrumbItem>
            <Link to="/">{i18n.t('COMMON.HOME')}</Link>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Link to="/apps/customer/list">Customer</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>
            <span>{i18n.t('CUSTOMER.EDIT_CUSTOMER')}</span>
          </BreadcrumbItem>
        </Breadcrumb>
      </Row>
      <Row>
        <Col xs={4} className="d-flex flex-column">
          <CustomerInfoCard />
        </Col>
        <Col xs={8} className="d-flex flex-column">
          <CustomerTabs tabs={tabs} activeTab={activeTab} toggleTab={setActiveTab} />
          <TabContent className="h-100" activeTab={activeTab}>
            {
              tabs.map((tab) => (
                <TabPane className="h-100" key={tab.id} tabId={tab.id}>
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
