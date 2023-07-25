/**
 * Check if the given item has the given url
 * in one of its children
 *
 * @param item
 * @param activeUrl
 */
import { MenuLinkItem } from '@domain/entities/MenuLinkItem';

export const hasActiveChild = (item: MenuLinkItem, currentUrl: string) => {
  const { children } = item;

  if (!children) {
    return false;
  }

  for (let i = 0; i < children.length; i += 1) {
    const child = children[i];
    if (child.children && hasActiveChild(child, currentUrl)) {
      return true;
    }
    // Check if the child has a link and is active
    if (child && child.navLink && currentUrl
      && (child.navLink === currentUrl || currentUrl.includes(child.navLink))) {
      return true;
    }
  }
  return false;
};

/**
 * Check if nav-link is active
 * @param {Object} link nav-link object
 * @param currentURL
 * @param routerProps
 */
export const isNavLinkActive = (link: string, currentURL: string, routerProps: any) => {
  if (currentURL === link) {
    return true;
  }
  if (!routerProps) {
    return false;
  }
  return (routerProps.meta && routerProps.meta.navLink && routerProps.meta.navLink === link);
};

/**
 * Check if this is a children
 * of the given item
 *
 * @param children
 * @param openGroup
 * @param currentActiveGroup
 */
export const removeChildren = (
  children: MenuLinkItem[], openGroup: string[], currentActiveGroup: string[],
) => {
  children.forEach((child) => {
    if (!currentActiveGroup.includes(child.id)) {
      const index = openGroup.indexOf(child.id);
      if (index > -1) openGroup.splice(index, 1);
      if (child.children) removeChildren(child.children, openGroup, currentActiveGroup);
    }
  });
};
