import React from 'react';
import i18n from '@config/i18n';
import { TableColumn } from 'react-data-table-component';
import { DepartureTour } from '@domain/entities/tour/DepartureTour';
import { Link } from 'react-router-dom';
import { generateEditableUrlForDepartureTour, generateI18nForDepartureTour } from '@utils/DepartureTourUtils';
import {
  Badge, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown,
} from 'reactstrap';
import {
  Archive, ArrowUpRight, MoreVertical, Trash2,
} from 'react-feather';
import TourType from '@domain/entities/tour/TourType';
import moment from 'moment/moment';
import TourOperationStatus from '@domain/entities/tour/TourOperationstatus';
import { generateI18nForDepartureTourOperation } from '@utils/TousOperationUtils';

const departureTourTypesColors: Record<TourType, string> = {
  INBOUND: 'light-primary',
  OUTBOUND: 'light-warning',
  INLAND: 'light-success',
};

const tourOperationStatusColors: Record<TourOperationStatus, string> = {
  WAITING_FOR_OPERATION: 'light-secondary',
  PROCESSING: 'light-warning',
  TRANSFERRED: 'light-info',
  COMPLETED: 'light-success',
};

const formatDate = (date: number | string) => moment(date).format('hh:mm DD/MM/YYYY');

const departureTourColumns: TableColumn<DepartureTour>[] = [
  {
    name: i18n.t('DEPARTURE_TOUR.CODE_OP'),
    width: '250px',
    sortable: true,
    sortField: 'code',
    cell: (departureTour: DepartureTour) => {
      const { operationStatus, code } = departureTour;
      return (
        <div>
          <Link to={`/apps/tours/departure/${departureTour.code}/edit`} className="text-truncate text-body text-center">
            <span className="fw-bolder">{code}</span>
            <ArrowUpRight size={16} />
          </Link>
          {' '}
          <Badge className="text-capitalize" color={tourOperationStatusColors[operationStatus]}>
            {generateI18nForDepartureTourOperation(operationStatus)}
          </Badge>
        </div>
      );
    },
  },
  {
    name: i18n.t('DEPARTURE_TOUR.NAME'),
    minWidth: '250px',
    sortable: true,
    sortField: 'name',
    cell: (departureTour: DepartureTour) => departureTour.name,
  },
  {
    name: i18n.t('TOUR_TEMPLATE.TYPE'),
    minWidth: '150px',
    sortable: true,
    sortField: 'type',
    cell: (departureTour: DepartureTour) => (
      <Badge className="text-capitalize" color={departureTourTypesColors[departureTour.type]}>
        {generateI18nForDepartureTour(departureTour.type)}
      </Badge>
    ),
  },
  {
    name: i18n.t('TOUR_TEMPLATE.LOCATION'),
    minWidth: '200px',
    sortable: true,
    sortField: 'startingLocation',
    cell: (departureTour: DepartureTour) => `${departureTour.startingLocation} - ${departureTour.endingLocation}`,
  },
  {
    name: i18n.t('DEPARTURE_TOUR.DEPARTURE_DATE'),
    minWidth: '250px',
    sortable: true,
    sortField: 'startDate',
    cell: (departureTour: DepartureTour) => formatDate(departureTour.startDate),
  },
  {
    name: i18n.t('TOUR_TEMPLATE.DURATION'),
    minWidth: '200px',
    sortable: true,
    sortField: 'durationInDays',
    cell: (
      departureTour: DepartureTour,
    ) => `${departureTour.durationInDays}-${i18n.t('TOUR_TEMPLATE.DAY')}
                 ${departureTour.durationInNights}-${i18n.t('TOUR_TEMPLATE.NIGHT')}`,
  },
  {
    name: i18n.t('COMMON.ACTIONS'),
    width: '110px',
    cell: (departureTour: DepartureTour) => (
      <div className="column-action">
        <UncontrolledDropdown>
          <DropdownToggle tag="div" className="btn btn-sm">
            <MoreVertical size={14} className="cursor-pointer" />
          </DropdownToggle>
          <DropdownMenu container="body">
            <DropdownItem tag={Link} className="w-100" to={generateEditableUrlForDepartureTour(departureTour)}>
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

export default departureTourColumns;
