import React, { useEffect } from 'react';
import {
  Col, Form, Input, Label, Row,
} from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { Controller, useForm, useWatch } from 'react-hook-form';
import Select from 'react-select';
import i18n from '@config/i18n';
import TourType from '@domain/entities/tour/TourType';
import FormItemSelect from '@components/Form/FormItemSelect';
import { DepartureTour } from '@domain/entities/tour';
import Flatpickr from 'react-flatpickr';
import classNames from 'classnames';
import moment from 'moment';

export interface DepartureTourFilterParams {
  name?: string,
  type?: TourType,
  startingLocation?: string,
  endingLocation?: string,
  dateRange?: Date[]
}

export interface DepartureTourFilterProps {
  onFilter: (params: DepartureTourFilterParams) => void,
  departureTours: DepartureTour[] | undefined
}

const tourTypeOptions = [
  { label: i18n.t('TOUR_TEMPLATE.INBOUND'), value: TourType.INBOUND },
  { label: i18n.t('TOUR_TEMPLATE.OUTBOUND'), value: TourType.OUTBOUND },
  { label: i18n.t('TOUR_TEMPLATE.INLAND'), value: TourType.INLAND },
];

export default function DepartureTourFilter(props: DepartureTourFilterProps) {
  const { onFilter, departureTours } = props;
  const { t } = useTranslation();
  const { control } = useForm<DepartureTourFilterParams>();
  const startLocations = Array.from(new Set(departureTours?.map((tour) => tour.startingLocation)))
    .map((location) => ({
      label: location,
      value: location,
    }));
  const endLocations = Array.from(new Set(departureTours?.map((tour) => tour.endingLocation)))
    .map((location) => ({
      label: location,
      value: location,
    }));
  const values = useWatch({ control });
  useEffect(() => {
    onFilter(values);
  }, [values]);
  return (
    <Form>
      <Row>
        <Col>
          <Label>{t('TOUR_TEMPLATE.NAME')}</Label>
          <Controller
            control={control}
            name="name"
            render={({ field }) => (
              <Input {...field} />
            )}
          />
        </Col>
        <Col>
          <Label>{t('TOUR_TEMPLATE.TYPE')}</Label>
          <Controller
            control={control}
            name="type"
            render={({ field: { onChange, value, ...rest } }) => (
              <Select
                {...rest}
                options={tourTypeOptions}
                value={{
                  label: tourTypeOptions.find((option) => option.value === value)?.label,
                  value,
                }}
                onChange={(newValue) => onChange(newValue?.value)}
                isClearable
              />
            )}
          />
        </Col>
        <Col>
          <Label>{t('TOUR_TEMPLATE.STARTING_LOCATION')}</Label>
          <FormItemSelect
            control={control}
            name="startingLocation"
            errors={{}}
            options={startLocations}
            isClearable
          />
        </Col>
        <Col>
          <Label>{t('TOUR_TEMPLATE.ENDING_LOCATION')}</Label>
          <FormItemSelect
            control={control}
            name="endingLocation"
            errors={{}}
            options={endLocations}
            isClearable
          />
        </Col>
        <Col>
          <Label>{t('DEPARTURE_TOUR.START_DATE_RANGE')}</Label>
          <Controller
            control={control}
            name="dateRange"
            render={({ field }) => (
              <Flatpickr
                {...field}
                className={classNames('form-control')}
                id="dateRange"
                options={{
                  formatDate: (date) => moment(date).format('DD/MM/YYYY'),
                  mode: 'range',
                }}
              />
            )}
          />
        </Col>
      </Row>
    </Form>
  );
}
