import React from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import { Tab } from '@features/Customer/CustomerDetailPage';

export interface BookingDetailTabsProps {
  tabs: Tab[],
  activeTab: string,
  toggleTab: (tab: string) => void,
}

export interface TabProps {
  tab: Tab,
  isActive: boolean,
  onClick: () => void,
}

function TabItem(props: TabProps) {
  const { tab, isActive, onClick } = props;
  const { icon, title } = tab;
  return (
    <NavItem>
      <NavLink active={isActive} onClick={onClick}>
        {icon}
        <span className="fw-bold">{title}</span>
      </NavLink>
    </NavItem>
  );
}

export default function BookingTabs(props: BookingDetailTabsProps) {
  const { activeTab, toggleTab, tabs } = props;
  return (
    <Nav pills className="mb-2">
      {
        tabs.map((tab) => (
          <TabItem
            key={tab.id}
            tab={tab}
            isActive={tab.id === activeTab}
            onClick={() => toggleTab(tab.id)}
          />
        ))
      }
    </Nav>
  );
}
