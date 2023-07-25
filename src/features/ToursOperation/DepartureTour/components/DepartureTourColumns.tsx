import React from 'react';
import i18n from '@config/i18n';
import { TableColumn } from 'react-data-table-component';
import { Link } from 'react-router-dom';
import {
  Badge, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown,
} from 'reactstrap';
import {
  ArrowDown, Calendar, Edit, MapPin, MoreVertical,
} from 'react-feather';
import moment from 'moment';
import TourOperationStatus from '@domain/entities/tour/TourOperationstatus';
import { ExtendedDepartureTour } from '@domain/entities/tour';
import { generateEditableUrlForTour, generateI18nForDepartureTourOperation } from '@utils/TousOperationUtils';
import DepartureTourOperatorCell from '@features/ToursOperation/DepartureTour/components/DepartureTourOperatorCell';
import DepartureTourActionCell from './DepartureTourActionCell';

const tourOperationStatusColors: Record<TourOperationStatus, string> = {
  WAITING_FOR_OPERATION: 'light-secondary',
  PROCESSING: 'light-warning',
  TRANSFERRED: 'light-info',
  COMPLETED: 'light-success',
};

const departureTourColumns: TableColumn<ExtendedDepartureTour>[] = [
  {
    name: i18n.t('TOURS_OPERATION.CODE_TT'),
    minWidth: '200px',
    sortable: true,
    sortField: 'code',
    cell: (departureTour: ExtendedDepartureTour) => {
      const { operationStatus, code } = departureTour;
      return (
        <div className="d-flex align-items-center">
          <Link to={generateEditableUrlForTour(departureTour)} className="text-truncate text-body d-flex align-items-center">
            <span className="fw-bolder">{code}</span>
            <Edit className="ms-25" size={16} />
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
    name: i18n.t('TOURS_OPERATION.TOUR_INFORMATION'),
    minWidth: '280px',
    sortable: true,
    sortField: 'tourInformation',
    cell: (departureTour: ExtendedDepartureTour) => (
      <div className="d-flex justify-content-left align-items-center">
        <div className="d-flex flex-column">
          <span className="fw-bolder text-primary pb-0">
            {departureTour.name}
          </span>
          <div className="d-flex align-items-center">
            <Calendar size={14} className="text-secondary" />
            <span className="ms-25">{moment(departureTour.startDate).format('DD/MM/YYYY')}</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    name: i18n.t('TOURS_OPERATION.TOUR_LOCATION'),
    minWidth: '250px',
    maxWidth: '280px',
    sortField: 'tourLocation',
    cell: (departureTour: ExtendedDepartureTour) => {
      const { startingLocationName, endingLocationName } = departureTour;
      return (
        <div>
          <div className="d-flex align-items-center">
            <MapPin size={14} />
            <span className="ms-25">{`${startingLocationName} - ${endingLocationName} `}</span>
          </div>
        </div>
      );
    },
  },
  {
    name: i18n.t('TOURS_OPERATION.OPERATOR'),
    minWidth: '220px',
    maxWidth: '250px',
    sortField: 'assigneeId',
    cell: (
      departureTour: ExtendedDepartureTour,
    ) => (<DepartureTourOperatorCell departureTour={departureTour} />),
  },
  {
    name: i18n.t('TOURS_OPERATION.OPERATION_ACTION'),
    minWidth: '250px',
    maxWidth: '280px',
    sortable: true,
    sortField: 'note',
    cell: (
      departureTour: ExtendedDepartureTour,
    ) => (<DepartureTourActionCell departureTour={departureTour} />),
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
            <DropdownItem tag={Link} className="w-100" to={generateEditableUrlForTour(departureTour)}>
              <Edit size={14} className="me-50" />
              <span className="align-middle">{i18n.t('COMMON.EDIT')}</span>
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
