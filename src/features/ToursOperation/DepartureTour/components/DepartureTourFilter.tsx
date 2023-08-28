import React, { useEffect, useMemo } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col, Form, Input, Label, Row,
} from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { Controller, useForm, useWatch } from 'react-hook-form';
import i18n from '@config/i18n';
import { RefreshCw } from 'react-feather';
import TourOperationStatus from '@domain/entities/tour/TourOperationstatus';
import TourType from '@domain/entities/tour/TourType';
import { tourPresenter } from '@adapter/presenters';
import { useQuery } from '@tanstack/react-query';
import FormItemSelect from '@components/Form/FormItemSelect';

export interface DepartureTourFilterParams {
  code?: string,
  name?: string,
  type?: TourType,
  operationStatus?: TourOperationStatus,
  startingLocation?: string,
  endingLocation?: string,
}

export interface DepartureTourFilterProps {
  onFilter?: (params: DepartureTourFilterParams) => void,
}

const tourOperationStatusOptions = [
  { label: i18n.t('TOURS_OPERATION.WAITING_FOR_OPERATION'), value: TourOperationStatus.WAITING_FOR_OPERATION },
  { label: i18n.t('TOURS_OPERATION.PROCESSING'), value: TourOperationStatus.PROCESSING },
  { label: i18n.t('TOURS_OPERATION.TRANSFERRED'), value: TourOperationStatus.TRANSFERRED },
  { label: i18n.t('TOURS_OPERATION.COMPLETED'), value: TourOperationStatus.COMPLETED },
];

export default function DepartureTourFilter(props: DepartureTourFilterProps) {
  const { onFilter } = props;
  const { t } = useTranslation();
  const { control, reset } = useForm<DepartureTourFilterParams>({
    defaultValues: {
      code: '',
      name: '',
      operationStatus: undefined,
      startingLocation: '',
      endingLocation: '',
    },
  });

  const values = useWatch({ control });

  const { data: tourLocations } = useQuery(['toursLocation'], async () => tourPresenter.getAllToursLocation());
  const tourLocationOptions = useMemo(() => {
    const options = tourLocations?.map((source) => ({
      label: source.name,
      value: source.code,
    }));
    return options || [];
  }, [tourLocations]);

  useEffect(() => {
    if (onFilter) onFilter(values);
  }, [values]);

  return (
    <Form>
      <Card className="card-filter">
        <CardHeader>
          <CardTitle tag="h4">{i18n.t('COMMON.FILTER')}</CardTitle>
          <Button color="primary" onClick={() => reset()}>
            <RefreshCw size={14} />
            <span className="align-middle ms-25">{i18n.t('COMMON.FILTER_RESET')}</span>
          </Button>
        </CardHeader>
        <CardBody className="card-filter-body">
          <Row>
            <Col lg={4}>
              <Label>{t('TOURS_OPERATION.FILTER.CODE')}</Label>
              <Controller
                control={control}
                name="code"
                render={({ field }) => (
                  <Input {...field} />
                )}
              />
            </Col>
            <Col lg={4}>
              <Label>{t('TOURS_OPERATION.FILTER.NAME')}</Label>
              <Controller
                control={control}
                name="name"
                render={({ field }) => (
                  <Input {...field} />
                )}
              />
            </Col>
            <Col lg={4}>
              <Label>{t('TOURS_OPERATION.FILTER.OPERATION_STATUS')}</Label>
              <FormItemSelect
                control={control}
                name="operationStatus"
                options={tourOperationStatusOptions}
                isClearable
                errors={{}}
              />
            </Col>
          </Row>
          <Row>
            <Col lg={4}>
              <Label>{t('TOURS_OPERATION.FILTER.STARTING_LOCATION')}</Label>
              <FormItemSelect
                control={control}
                name="startingLocation"
                options={tourLocationOptions}
                isClearable
                errors={{}}
              />
            </Col>
            <Col lg={4}>
              <Label>{t('TOURS_OPERATION.FILTER.ENDING_LOCATION')}</Label>
              <FormItemSelect
                control={control}
                name="endingLocation"
                options={tourLocationOptions}
                isClearable
                errors={{}}
              />

            </Col>
          </Row>
        </CardBody>
      </Card>

    </Form>
  );
}
