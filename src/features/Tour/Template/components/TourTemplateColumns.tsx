import React from 'react';
import i18n from '@config/i18n';
import { TableColumn } from 'react-data-table-component';
import { TourTemplate } from '@domain/entities/tour/TourTemplate';
import { Link } from 'react-router-dom';
import {
  generateEditableUrlForTourTemplate,
  generateI18nForTourTemplate,
} from '@utils/TourTemplateUtils';
import {
  Badge,
  Button,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
  UncontrolledTooltip,
} from 'reactstrap';
import {
  Archive, MoreVertical, Share2, Trash2,
} from 'react-feather';
import TourType from '@domain/entities/tour/TourType';
import { useQuery } from '@tanstack/react-query';
import generateMarketplacePostUrl from '@utils/MarketplaceUtils';
import { TOUR_TEMPLATE_INDEX } from '@utils/Constants';
import { tourTemplatePresenter } from '@adapter/presenters';
import { getMarketplacePage } from '@utils/EnvUtils';

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
    name: i18n.t('COMMON.MARKETPLACE'),
    minWidth: '150px',
    cell: (tourTemplate: TourTemplate) => {
      // The text `#` is not allowed in the URL, so we need to replace it with `%23`
      const tourTemplateId = `${TOUR_TEMPLATE_INDEX}%23${tourTemplate.code}`;
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
            id={`tour-template-marketplace-info-${tourTemplate.code}`}
            color={isMarketplaceAvailable ? 'primary' : 'secondary'}
            size="sm"
            onClick={openUrl}
          >
            <Share2 size={12} />
          </Button>
          <UncontrolledTooltip
            placement="top"
            target={`tour-template-marketplace-info-${tourTemplate.code}`}
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
