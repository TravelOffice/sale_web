import React from 'react';
import i18n from '@config/i18n';
import { TableColumn } from 'react-data-table-component';
import { TourTemplate, TourType } from '@domain/entities/TourTemplate';
import { Link } from 'react-router-dom';
import {
  generateEditableUrlForTourTemplate,
  generateI18nForTourTemplate,
} from '@utils/TourTemplateUtils';
import {
  Badge, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown,
} from 'reactstrap';
import { Archive, MoreVertical, Trash2 } from 'react-feather';

const tourTemplateTypesColors: Record<TourType, string> = {
  INBOUND: 'light-primary',
  OUTBOUND: 'light-warning',
  INLAND: 'light-success',
};

const tourTemplateColumns: TableColumn<TourTemplate>[] = [
  {
    name: i18n.t('TOUR_TEMPLATE.CODE'),
    width: '110px',
    sortable: true,
    sortField: 'code',
    cell: (tourTemplate: TourTemplate) => (
      <Link to={generateEditableUrlForTourTemplate(tourTemplate)} className="user_name text-truncate text-body">
        <span className="fw-bolder">{tourTemplate.code}</span>
      </Link>
    ),
  },
  {
    name: i18n.t('TOUR_TEMPLATE.NAME'),
    minWidth: '250px',
    sortable: true,
    sortField: 'name',
    cell: (tourTemplate: TourTemplate) => tourTemplate.name,
  },
  {
    name: i18n.t('TOUR_TEMPLATE.TYPE'),
    minWidth: '200px',
    sortable: true,
    sortField: 'type',
    cell: (tourTemplate: TourTemplate) => (
      <Badge className="text-capitalize" color={tourTemplateTypesColors[tourTemplate.type]} pill>
        {generateI18nForTourTemplate(tourTemplate.type)}
      </Badge>
    ),
  },
  {
    name: i18n.t('TOUR_TEMPLATE.LOCATION'),
    minWidth: '200px',
    sortable: true,
    sortField: 'startingLocation',
    cell: (tourTemplate: TourTemplate) => `${tourTemplate.startingLocation} - ${tourTemplate.endingLocation}`,
  },
  {
    name: i18n.t('TOUR_TEMPLATE.DURATION'),
    minWidth: '200px',
    sortable: true,
    sortField: 'durationInDays',
    cell: (
      tourTemplate: TourTemplate,
    ) => `${tourTemplate.durationInDays}-${i18n.t('TOUR_TEMPLATE.DAY')}
                 ${tourTemplate.durationInNights}-${i18n.t('TOUR_TEMPLATE.NIGHT')}`,
  },
  {
    name: i18n.t('COMMON.ACTIONS'),
    width: '110px',
    cell: (tourTemplate: TourTemplate) => (
      <div className="column-action">
        <UncontrolledDropdown>
          <DropdownToggle tag="div" className="btn btn-sm">
            <MoreVertical size={14} className="cursor-pointer" />
          </DropdownToggle>
          <DropdownMenu container="body">
            <DropdownItem tag={Link} className="w-100" to={generateEditableUrlForTourTemplate(tourTemplate)}>
              <Archive size={14} className="me-50" />
              <span className="align-middle">{i18n.t('COMMON.EDIT')}</span>
            </DropdownItem>
            <DropdownItem
              tag="a"
              href="/"
              className="w-100"
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              <Trash2 size={14} className="me-50" />
              <span className="align-middle">{i18n.t('COMMON.DELETE')}</span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    ),
  },
];

export default tourTemplateColumns;
