import React, { ReactNode, useRef, useState } from 'react';
import { MenuItem, MenuLinkItem } from '@domain/entities/MenuLinkItem';
import classnames from 'classnames';
import PerfectScrollbar from 'react-perfect-scrollbar';
import VerticalMenuHeader from '@components/Sidebar/VerticalMenuHeader';
import VerticalMenuNavItems from '@components/Sidebar/VerticalMenuNavItems';

export interface SidebarProps {
  menuCollapsed: boolean,
  routerProps: any,
  menu?: ReactNode,
  currentActiveItem: string,
  skin: string,
  menuData: MenuItem[],
  menuVisibility: boolean,
  setMenuCollapsed: (collapsed: boolean) => void,
  setMenuVisibility: (visibility: boolean) => void,
}

export default function Sidebar(props: SidebarProps) {
  const {
    menuCollapsed, routerProps, menu, currentActiveItem, skin, menuData,
  } = props;
  const [groupOpen, setGroupOpen] = useState<string[]>([]);
  const [groupActive, setGroupActive] = useState<string[]>([]);
  const [currentActiveGroup, setCurrentActiveGroup] = useState<string[]>([]);
  const [activeItem, setActiveItem] = useState<string | undefined>(undefined);
  const [menuHover, setMenuHover] = useState(false);
  const shadowRef = useRef<HTMLDivElement>(null);
  const onMouseEnter = () => {
    setMenuHover(true);
  };
  const scrollMenu = (container: HTMLElement) => {
    const { current } = shadowRef;
    if (!current) {
      return;
    }
    const { classList } = current;
    if (!classList) {
      return;
    }
    if (shadowRef && container.scrollTop > 0) {
      if (!classList.contains('d-block')) {
        current.classList.add('d-block');
      }
    } else if (classList.contains('d-block')) {
      current.classList.remove('d-block');
    }
  };
  return (
    <>
      <div
        className={classnames('main-menu menu-fixed menu-accordion menu-shadow', {
          expanded: menuHover || !menuCollapsed,
          'menu-light': skin !== 'semi-dark' && skin !== 'dark',
          'menu-dark': skin === 'semi-dark' || skin === 'dark',
        })}
        onMouseEnter={onMouseEnter}
        onMouseLeave={() => setMenuHover(false)}
      >
        {menu || (
          <>
            {/* Vertical Menu Header */}
            <VerticalMenuHeader setGroupOpen={setGroupOpen} menuHover={menuHover} {...props} />
            {/* Vertical Menu Header Shadow */}
            <div className="shadow-bottom" ref={shadowRef} />
            {/* Perfect Scrollbar */}
            <PerfectScrollbar
              className="main-menu-content"
              options={{ wheelPropagation: false }}
              onScrollY={(container) => scrollMenu(container)}
            >
              <ul className="navigation navigation-main">
                <VerticalMenuNavItems
                  items={menuData}
                  menuData={menuData}
                  menuHover={menuHover}
                  groupOpen={groupOpen}
                  activeItem={activeItem}
                  groupActive={groupActive}
                  currentActiveGroup={currentActiveGroup}
                  routerProps={routerProps}
                  setGroupOpen={setGroupOpen}
                  menuCollapsed={menuCollapsed}
                  setActiveItem={setActiveItem}
                  setGroupActive={setGroupActive}
                  setCurrentActiveGroup={setCurrentActiveGroup}
                  currentActiveItem={currentActiveItem}
                />
              </ul>
            </PerfectScrollbar>
          </>
        )}
      </div>
    </>
  );
}

Sidebar.defaultProps = {
  menu: undefined,
};
