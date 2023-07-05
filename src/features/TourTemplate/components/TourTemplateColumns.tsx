import React from 'react';
import i18n from '@config/i18n';
import { TableColumn } from 'react-data-table-component';
import { TourTemplate, TourType } from '@domain/entities/TourTemplate';
import { Link } from 'react-router-dom';
import {
  generateEditableUrlForTourTemplate,
  generateI18nForTourTemplate,
} from '@utils/TourTemplateUtils';
import { formatVND } from '@utils/CommonUtils';
import {
  Badge, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown,
} from 'reactstrap';
import { Archive, MoreVertical, Trash2 } from 'react-feather';
import moment from 'moment/moment';

const tourTemplateTypesColors: Record<TourType, string> = {
  INBOUND: 'light-primary',
  OUTBOUND: 'light-warning',
  INLAND: 'light-success',
};

const tourTemplateColumns: TableColumn<TourTemplate>[] = [
  {
    name: i18n.t('TOUR_TEMPLATE.CODE'),
    width: '80px',
    cell: (tourTemplate: TourTemplate) => (
      <Link to={generateEditableUrlForTourTemplate(tourTemplate)} className="user_name text-truncate text-body">
        <span className="fw-bolder">{tourTemplate.code}</span>
      </Link>
    ),
  },
  {
    name: i18n.t('TOUR_TEMPLATE.NAME'),
    minWidth: '150px',
    cell: (tourTemplate: TourTemplate) => tourTemplate.name,
  },
  {
    name: i18n.t('TOUR_TEMPLATE.TYPE'),
    minWidth: '70px',
    cell: (tourTemplate: TourTemplate) => (
      <Badge className="text-capitalize" color={tourTemplateTypesColors[tourTemplate.type]} pill>
        {generateI18nForTourTemplate(tourTemplate.type)}
      </Badge>
    ),
  },
  {
    name: i18n.t('TOUR_TEMPLATE.LOCATION'),
    minWidth: '150px',
    maxWidth: '180px',
    cell: (tourTemplate: TourTemplate) => (
      <div>
        <strong>{i18n.t('TOUR_TEMPLATE.STARTING_LOCATION')}</strong>
        {`: ${tourTemplate.startingLocation}`}
        <br />
        <strong>{i18n.t('TOUR_TEMPLATE.ENDING_LOCATION')}</strong>
        {`: ${tourTemplate.endingLocation}`}
        <br />
      </div>
    ),
  },
  {
    name: i18n.t('TOUR_TEMPLATE.DURATION'),
    minWidth: '150px',
    cell: (tourTemplate: TourTemplate) => (
      <div>
        <strong>{i18n.t('TOUR_TEMPLATE.DURATION_IN_DAYS')}</strong>
        {`: ${tourTemplate.durationInDays}`}
        <br />
        <strong>{i18n.t('TOUR_TEMPLATE.DURATION_IN_NIGHTS')}</strong>
        {`: ${tourTemplate.durationInNights}`}
        <br />
      </div>
    ),
  },
  {
    name: i18n.t('TOUR_TEMPLATE.PRICE'),
    minWidth: '300px',
    cell: (tourTemplate: TourTemplate) => (
      <div>
        <strong>{i18n.t('TOUR_TEMPLATE.ADULT_PRICE')}</strong>
        {': '}
        {tourTemplate.adultPrice ? formatVND(tourTemplate.adultPrice) : ''}
        <br />
        <strong>{i18n.t('TOUR_TEMPLATE.CHILD_8_11_PRICE')}</strong>
        {': '}
        {tourTemplate.child8to11Price ? formatVND(tourTemplate.child8to11Price) : ''}
        <br />
        <strong>{i18n.t('TOUR_TEMPLATE.CHILD_5_7_PRICE')}</strong>
        {': '}
        {tourTemplate.child5to7Price ? formatVND(tourTemplate.child5to7Price) : ''}
        <br />
        <strong>{i18n.t('TOUR_TEMPLATE.CHILD_UNDER_5_PRICE')}</strong>
        {': '}
        {tourTemplate.childUnder5Price ? formatVND(tourTemplate.childUnder5Price) : ''}
      </div>
    ),
  },
  {
    name: i18n.t('TOUR_TEMPLATE.CREATOR'),
    cell: (tourTemplate: TourTemplate) => (
      <div>
        <span>
          <strong>{i18n.t('TOUR_TEMPLATE.CREATOR')}</strong>
          {': '}
          <Link to={`/apps/users/${tourTemplate.creator}`} className="user_name text-truncate text-body">
            <span className="fw-bolder text-primary">{tourTemplate.creator}</span>
          </Link>
        </span>
        <br />
        <span>
          <strong>{i18n.t('COMMON.CREATED_AT')}</strong>
          {': '}
          {moment(tourTemplate.createdAt).format('hh:mm:ss DD/MM/YYYY')}
        </span>
      </div>
    ),
  },
  {
    name: i18n.t('COMMON.ACTIONS'),
    maxWidth: '120px',
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
