import React, { useEffect } from 'react';
import {
  Col, Form, Input, Label, Row,
} from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { Controller, useForm, useWatch } from 'react-hook-form';
import Select from 'react-select';
import i18n from '@config/i18n';
import TourType from '@domain/entities/tour/TourType';

export interface TourTemplateFilterParams {
  name?: string,
  type?: TourType,
  startingLocation?: string,
  endingLocation?: string,
  durationInDays?: number,
  durationInNights?: number,
  creator?: string,
}

export interface TourTemplateFilterProps {
  onFilter: (params: TourTemplateFilterParams) => void,
}

const tourTypeOptions = [
  { label: i18n.t('TOUR_TEMPLATE.INBOUND'), value: TourType.INBOUND },
  { label: i18n.t('TOUR_TEMPLATE.OUTBOUND'), value: TourType.OUTBOUND },
  { label: i18n.t('TOUR_TEMPLATE.INLAND'), value: TourType.INLAND },
];

export default function TourTemplateFilter(props: TourTemplateFilterProps) {
  const { onFilter } = props;
  const { t } = useTranslation();
  const { control } = useForm<TourTemplateFilterParams>();
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
              />
            )}
          />
        </Col>
        <Col>
          <Label>{t('TOUR_TEMPLATE.STARTING_LOCATION')}</Label>
          <Controller
            control={control}
            name="startingLocation"
            render={({ field }) => (
              <Input {...field} />
            )}
          />
        </Col>
        <Col>
          <Label>{t('TOUR_TEMPLATE.ENDING_LOCATION')}</Label>
          <Controller
            control={control}
            name="endingLocation"
            render={({ field }) => (
              <Input {...field} />
            )}
          />
        </Col>
        <Col>
          <Label>{t('TOUR_TEMPLATE.DURATION_IN_DAYS')}</Label>
          <Controller
            control={control}
            name="durationInDays"
            render={({ field }) => (
              <Input
                {...field}
                type="number"
                onChange={(e) => {
                  field.onChange(parseInt(e.target.value, 10));
                }}
              />
            )}
          />
        </Col>
        <Col>
          <Label>{t('TOUR_TEMPLATE.DURATION_IN_NIGHTS')}</Label>
          <Controller
            control={control}
            name="durationInNights"
            render={({ field }) => (
              <Input
                {...field}
                type="number"
                onChange={(e) => {
                  field.onChange(parseInt(e.target.value, 10));
                }}
              />
            )}
          />
        </Col>
        <Col>
          <Label>{t('TOUR_TEMPLATE.CREATOR')}</Label>
          <Controller
            control={control}
            name="creator"
            render={({ field }) => (
              <Input {...field} />
            )}
          />
        </Col>
      </Row>
    </Form>
  );
}
