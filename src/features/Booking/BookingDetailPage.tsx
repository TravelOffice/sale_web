import React, { ReactNode, useState } from 'react';
import { Activity, List, User } from 'react-feather';
import {
  Breadcrumb, BreadcrumbItem, Col, Row, TabContent, TabPane,
} from 'reactstrap';
import '@styles/react/libs/flatpickr/flatpickr.scss';
import '@styles/react/pages/page-account-settings.scss';
import '@styles/react/apps/app-todo.scss';
import i18n from '@config/i18n';
import { Link } from 'react-router-dom';
import BookingTabs from '@features/Booking/components/BookingTabs';
import BookingInfoCard from '@features/Booking/components/BookingInfoCard';
import BookingDetailTab from '@features/Booking/components/tabs/information/BookingDetailTab';
import CustomerDetailTab from '@features/Booking/components/tabs/Customer/CustomerDetailTab';
import BookingNotes from '@features/Booking/components/tabs/notes/BookingNotes';

export interface Tab {
  id: string,
  title: string,
  icon: ReactNode,
  pane: ReactNode,
}

export default function BookingDetail() {
  const tabs: Tab[] = [
    {
      id: 'information',
      icon: <List size={16} className="me-50" />,
      title: i18n.t('COMMON.INFORMATION'),
      pane: <BookingDetailTab />,
    },
    {
      id: 'customer',
      icon: <User size={16} className="me-50" />,
      title: i18n.t('BOOKING.CUSTOMER'),
      pane: <CustomerDetailTab />,
    },
    {
      id: 'notes',
      icon: <Activity size={16} className="me-50" />,
      title: i18n.t('BOOKING.NOTES'),
      pane: <BookingNotes />,
    },
  ];

  const [activeTab, setActiveTab] = useState(tabs[0].id);
  return (
    <>
      <Row>
        <Breadcrumb className="ms-1 mb-1">
          <BreadcrumbItem>
            <Link to="/">{i18n.t('COMMON.HOME')}</Link>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Link to="/apps/bookings/list">Booking</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>
            <span>{i18n.t('BOOKING.EDIT_BOOKING')}</span>
          </BreadcrumbItem>
        </Breadcrumb>
      </Row>
      <Row>
        <Col xs={4} className="d-flex flex-column">
          <BookingInfoCard />

        </Col>
        <Col xs={8} className="d-flex flex-column">
          <BookingTabs tabs={tabs} activeTab={activeTab} toggleTab={setActiveTab} />
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
