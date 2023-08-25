import React from 'react';
import { TourLocation } from '@domain/entities/tour';
import {
  Badge,
  DropdownItem, DropdownMenu, DropdownToggle, UncontrolledButtonDropdown,
} from 'reactstrap';
import { Edit, MoreVertical } from 'react-feather';
import i18n from '@config/i18n';

export interface TourLocationTableRowProps {
  tourLocation: TourLocation,
  onEdit: (tourLocation: TourLocation) => void,
}

export default function TourLocationTableRow(props: TourLocationTableRowProps) {
  const { tourLocation, onEdit } = props;
  return (
    <tr>
      <td className="fw-bolder">{tourLocation.code}</td>
      <td>{tourLocation.name}</td>
      <td>
        <Badge color={tourLocation.status === 'ENABLE' ? 'light-success' : 'light-danger'} pill>
          {i18n.t(`TOUR_LOCATION.${tourLocation.status}`)}
        </Badge>
      </td>
      <td>
        <UncontrolledButtonDropdown>
          <DropdownToggle className="icon-btn hide-arrow" color="transparent" size="sm" caret>
            <MoreVertical size={15} />
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem tag="div" onClick={() => onEdit(tourLocation)}>
              <Edit className="me-50" size={15} />
              {' '}
              <span className="align-middle">{i18n.t('COMMON.EDIT')}</span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledButtonDropdown>
      </td>
    </tr>
  );
}
