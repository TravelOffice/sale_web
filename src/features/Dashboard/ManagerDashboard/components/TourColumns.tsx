import { TableColumn } from 'react-data-table-component';
import { DepartureTour, ExtendedDepartureTour } from '@domain/entities/tour';
import i18n from '@config/i18n';
import { Link } from 'react-router-dom';
import { generateEditableUrlForTour, generateI18nForDepartureTourOperation } from '@utils/TousOperationUtils';
import {
  Calendar, Edit, MapPin, Share2,
} from 'react-feather';
import { Badge, Button, UncontrolledTooltip } from 'reactstrap';
import moment from 'moment/moment';
import React from 'react';
import TourOperationStatus from '@domain/entities/tour/TourOperationstatus';
import { useQuery } from '@tanstack/react-query';
import { tourTemplatePresenter } from '@adapter/presenters';
import generateMarketplacePostUrl from '@utils/MarketplaceUtils';
import { getMarketplacePage } from '@utils/EnvUtils';
import { TOUR_TEMPLATE_INDEX } from '@utils/Constants';

const tourOperationStatusColors: Record<TourOperationStatus, string> = {
  WAITING_FOR_OPERATION: 'light-secondary',
  PROCESSING: 'light-warning',
  TRANSFERRED: 'light-info',
  COMPLETED: 'light-success',
};

const TourColumns: TableColumn<ExtendedDepartureTour>[] = [
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
    name: i18n.t('TOURS_OPERATION.TOUR_FILL_RATES'),
    minWidth: '150px',
    maxWidth: '200px',
    sortField: 'tourLocation',
    cell: (departureTour: ExtendedDepartureTour) => (
      <>
        5/
        {departureTour.visitorCount}
      </>
    ),
  },
  {
    name: i18n.t('COMMON.MARKETPLACE'),
    minWidth: '150px',
    cell: (tour: DepartureTour) => {
      // The text `#` is not allowed in the URL, so we need to replace it with `%23`
      const tourTemplateId = `${TOUR_TEMPLATE_INDEX}%23${tour.tourTemplateCode}`;
      const { data: linkedPostOnMarketplace } = useQuery({
        queryKey: ['linkedPostOnMarketplace', tourTemplateId],
        queryFn: () => tourTemplatePresenter.getLinkedPostOnMarketplaceInfo(tourTemplateId),
      });
      const isMarketplaceAvailable = linkedPostOnMarketplace?.isAvailable;
      const totalOffers = linkedPostOnMarketplace?.totalOffers || 0;
      const openUrl = () => {
        if (isMarketplaceAvailable) {
          window.open(generateMarketplacePostUrl());
        } else {
          window.open(getMarketplacePage());
        }
      };

      return (
        <div>
          <Button
            outline
            id={`tour-template-marketplace-info-${tour.code}`}
            color={isMarketplaceAvailable ? 'primary' : 'secondary'}
            size="sm"
            onClick={openUrl}
          >
            <Share2 size={12} />
          </Button>
          <UncontrolledTooltip
            placement="top"
            target={`tour-template-marketplace-info-${tour.code}`}
          >
            {
              isMarketplaceAvailable
                ? i18n.t('MARKETPLACE.MARKETPLACE_INFO_TOOLTIP', {
                  totalOffers,
                  modelName: i18n.t('COMMON.TOUR_TEMPLATE'),
                }) : i18n.t('MARKETPLACE.MARKETPLACE_INFO_NOT_AVAILABLE', { modelName: i18n.t('COMMON.TOUR_TEMPLATE') })
            }
          </UncontrolledTooltip>
        </div>
      );
    },
  },
];

export default TourColumns;
