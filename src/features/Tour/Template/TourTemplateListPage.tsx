import React, { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { tourPresenter, tourTemplatePresenter } from '@adapter/presenters';
import {
  ButtonProps,
  Card, CardBody, CardHeader, CardTitle, Col, Row,
} from 'reactstrap';
import i18n from '@config/i18n';
import Table from '@components/Table/Table';
import { filterTourTemplates } from '@utils/TourTemplateUtils';
import { TourTemplate } from '@domain/entities/TourTemplate';
import { HandleDataState } from '@redux/slices/others/HandleDataState';
import { ExpanderComponentProps } from 'react-data-table-component/dist/src/DataTable/types';
import { formatVND } from '@utils/CommonUtils';
import moment from 'moment/moment';
import tourTemplateColumns from '@features/Tour/Template/components/TourTemplateColumns';
import { useHistory } from 'react-router-dom';
import { TourLocation } from '@domain/entities/tour';
import TourTemplateFilter, { TourTemplateFilterParams } from './components/TourTemplateFilter';

const TourTemplateExpandableRow: React.FC<ExpanderComponentProps<TourTemplate>> = (
  { data }:ExpanderComponentProps<TourTemplate>,
) => (
  <div className="container py-xxl-1">
    <Row>
      <Col md={6}>
        <strong>{i18n.t('TOUR_TEMPLATE.PRICE')}</strong>
        <ul>
          <li>{`${i18n.t('TOUR_TEMPLATE.ADULT_PRICE')}: ${formatVND(data.adultPrice)}`}</li>
          {data.child8to11Price && <li>{`${i18n.t('TOUR_TEMPLATE.CHILD_8_11_PRICE')}: ${formatVND(data.child8to11Price)}`}</li>}
          {data.child5to7Price && <li>{`${i18n.t('TOUR_TEMPLATE.CHILD_5_7_PRICE')}: ${formatVND(data.child5to7Price)}`}</li>}
          {data.childUnder5Price && <li>{`${i18n.t('TOUR_TEMPLATE.CHILD_5_7_PRICE')}: ${formatVND(data.childUnder5Price)}`}</li>}
        </ul>
        <br />
        <strong>{i18n.t('TOUR_TEMPLATE.CREATOR')}</strong>
        <ul>
          <li>{`${i18n.t('TOUR_TEMPLATE.CREATOR')}: ${data.creator}`}</li>
          <li>{`${i18n.t('COMMON.CREATED_AT')}: ${moment(data.createdAt).format('DD/MM/YYYY')}`}</li>
        </ul>
      </Col>
      <Col md={6}>
        <strong>{i18n.t('TOUR_TEMPLATE.POLICIES_AND_REGULATIONS')}</strong>
        <ul>
          <li>{`${i18n.t('TOUR_TEMPLATE.INCLUSION_AND_EXCLUSION')}: ${data.policiesAndRegulations.inclusionAndExclusion || ''}`}</li>
          <li>{`${i18n.t('TOUR_TEMPLATE.POLICY_CONDITIONS_AND_EXTRA_FEE')}: ${data.policiesAndRegulations.policyConditionsAndExtraFee || ''}`}</li>
          <li>{`${i18n.t('TOUR_TEMPLATE.CANCELLATION_TERMS')}: ${data.policiesAndRegulations.cancellationTerms || ''}`}</li>
        </ul>
      </Col>
    </Row>
  </div>
);

export default function TourTemplateListPage() {
  const [filterParams, setFilterParams] = useState<TourTemplateFilterParams>();
  const {
    data: allTourTemplates, isFetching, isFetched, isError, refetch,
  } = useQuery(
    ['tour-templates'], async () => tourTemplatePresenter.getAllTourTemplates(),
  );
  const { data: toursLocationData } = useQuery(['toursLocation'], async () => tourPresenter.getAllToursLocation());
  const getLocationFromCode = (code: string) => {
    if (!toursLocationData) return '';
    const location = toursLocationData.find(
      (item: TourLocation) => item.code === code,
    ) as TourLocation;
    return location ? location.name : '';
  };

  const fetchTourTemplatesState: HandleDataState = useMemo(() => {
    if (isFetching) return 'loading';
    if (isFetched) return 'finished';
    if (isError) return 'error';
    return 'init';
  }, [isFetching, isFetched, isError]);

  const tourTemplates = useMemo(() => {
    if (!allTourTemplates) return [];
    const tourTemplateList: Array<TourTemplate> = allTourTemplates?.map((item:TourTemplate) => ({
      ...item,
      startingLocation: getLocationFromCode(item.startingLocation),
      endingLocation: getLocationFromCode(item.endingLocation),
    }) as TourTemplate);
    if (!filterParams) return tourTemplateList;
    return filterTourTemplates(tourTemplateList, filterParams);
  }, [allTourTemplates, filterParams]);

  const history = useHistory();
  const tourTemplateBtnArr:Array<ButtonProps> = [
    {
      name: i18n.t('COMMON.ADD'),
      handleOnClick: () => { history.push('/apps/tour-templates/create'); },
    },
  ];

  return (
    <div className="to-table-container">
      <Card>
        <CardHeader>
          <CardTitle tag="h4">{i18n.t('COMMON.FILTER')}</CardTitle>
        </CardHeader>
        <CardBody>
          <TourTemplateFilter onFilter={(params) => setFilterParams(params)} />
        </CardBody>
      </Card>
      <Table<TourTemplate>
        data={tourTemplates}
        fetchDataState={fetchTourTemplatesState}
        columns={tourTemplateColumns}
        searchableColumns={['code', 'name', 'type', 'startingLocation', 'endingLocation', 'durationInDays', 'durationInNights']}
        sortColumnDefault="code"
        onPageChange={() => {}}
        onRefresh={() => { refetch(); }}
        expandableRows
        expandableRowsComponent={TourTemplateExpandableRow}
        extraButtons={tourTemplateBtnArr}
      />
    </div>
  );
}
