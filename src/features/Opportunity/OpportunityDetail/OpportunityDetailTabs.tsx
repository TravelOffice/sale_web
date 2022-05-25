import React from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import { OpportunityTab } from '@features/Opportunity/OpportunityDetail/OpportunityDetail';

export interface OpportunityDetailTabsProps {
  tabs: OpportunityTab[],
  activeTab: string,
  toggleTab: (tab: string) => void,
}

export interface OpportunityTabProps {
  tab: OpportunityTab,
  isActive: boolean,
  onClick: () => void,
}

function TabItem(props: OpportunityTabProps) {
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

export default function OpportunityDetailTabs(props: OpportunityDetailTabsProps) {
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
