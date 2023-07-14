import React from 'react';
import i18n from '@config/i18n';
import { TableColumn } from 'react-data-table-component';
import { Link } from 'react-router-dom';
import {
  Badge, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown,
} from 'reactstrap';
import {
  ArrowDown, ArrowUpRight, Calendar, Edit, MapPin, MoreVertical,
} from 'react-feather';
import moment from 'moment';
import TourOperationStatus from '@domain/entities/tour/TourOperationstatus';
import { ExtendedDepartureTour } from '@domain/entities/tour';
import { generateI18nForDepartureTour, generateOperationUrlForTour } from '@utils/TousOperationUtils';

const tourOperationStatusColors: Record<TourOperationStatus, string> = {
  WAITING_FOR_OPERATION: 'light-secondary',
  PROCESSING: 'light-warning',
  TRANSFERRED: 'light-info',
  COMPLETED: 'light-success',
};

const departureTourColumns: TableColumn<ExtendedDepartureTour>[] = [
  {
    name: i18n.t('TOURS_OPERATION.CODE_TT'),
    width: '220px',
    sortable: true,
    sortField: 'code',
    cell: (departureTour: ExtendedDepartureTour) => {
      const { operationStatus, code } = departureTour;
      return (
        <div>
          <Link to={generateOperationUrlForTour(departureTour)} className="text-truncate text-body text-center">
            <span className="fw-bolder">{code}</span>
            <ArrowUpRight size={16} />
          </Link>
          {' '}
          <Badge className="text-capitalize" color={tourOperationStatusColors[operationStatus]}>
            {generateI18nForDepartureTour(operationStatus)}
          </Badge>
        </div>
      );
    },
  },
  {
    name: i18n.t('TOURS_OPERATION.TOUR_INFORMATION'),
    minWidth: '80px',
    sortable: true,
    sortField: 'tourInformation',
    cell: (departureTour: ExtendedDepartureTour) => (
      <div className="d-flex justify-content-left align-items-center">
        <div className="d-flex flex-column">
          <span className="fw-bolder text-primary pb-0">
            {departureTour.name}
          </span>
          <span>
            <Calendar size={14} className="text-secondary" />
            {' '}
            {moment(departureTour.startDate).format('DD/MM/YYYY')}
          </span>
        </div>
      </div>
    ),
  },
  {
    name: i18n.t('TOURS_OPERATION.TOUR_LOCATION'),
    minWidth: '150px',
    sortField: 'tourLocation',
    cell: (departureTour: ExtendedDepartureTour) => {
      const { startingLocationName, endingLocationName } = departureTour;
      return (
        <div>
          <div className="d-flex align-items-center">
            <MapPin size={14} />
            {' '}
            {`${startingLocationName} - ${endingLocationName} `}
          </div>
        </div>
      );
    },
  },
  {
    name: i18n.t('TOURS_OPERATION.OPERATOR'),
    minWidth: '150px',
    sortField: 'assigneeId',
    cell: (departureTour: ExtendedDepartureTour) => {
      console.log(departureTour);
      return (
        <div />
      );
    },
  },
  {
    name: i18n.t('TOURS_OPERATION.PROCESS'),
    maxWidth: '200px',
    sortable: true,
    sortField: 'note',
    cell: (departureTour: ExtendedDepartureTour) => {
      console.log(departureTour);
      return (<></>);
    },
  },
  {
    name: i18n.t('COMMON.ACTIONS'),
    maxWidth: '120px',
    cell: (departureTour: ExtendedDepartureTour) => (
      <div className="column-action">
        <UncontrolledDropdown>
          <DropdownToggle tag="div" className="btn btn-sm">
            <MoreVertical size={14} className="cursor-pointer" />
          </DropdownToggle>
          <DropdownMenu container="body">
            <DropdownItem tag={Link} className="w-100" to={generateOperationUrlForTour(departureTour)}>
              <Edit size={14} className="me-50" />
              <span className="align-middle">{i18n.t('TOURS_OPERATION.OPERATE')}</span>
            </DropdownItem>
            <DropdownItem
              disabled
              tag="a"
              href="/"
              className="w-100"
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              <ArrowDown size={14} className="me-50" />
              <span className="align-middle">{i18n.t('COMMON.EXPORT')}</span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    ),
  },
];

export default departureTourColumns;
