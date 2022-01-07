import React from 'react';
import { MoreHorizontal } from 'react-feather';
import { MenuHeader } from '@domain/entities/MenuLinkItem';

export interface VerticalNavMenuSectionHeaderProps {
  item: MenuHeader,
}

export default function VerticalNavMenuSectionHeader(props: VerticalNavMenuSectionHeaderProps) {
  const { item } = props;
  return (
    <li className="navigation-header">
      <span>{item.header}</span>
      <MoreHorizontal className="feather-more-horizontal" />
    </li>
  );
}
