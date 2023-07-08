import React from 'react';
import {
  Col, FormFeedback, Input, InputGroup, InputGroupText, Label, Row,
} from 'reactstrap';
import FormItemSelect from '@components/Form/FormItemSelect';
import i18n from '@config/i18n';
import { Controller } from 'react-hook-form';
import { TourType } from '@domain/entities/TourTemplate';
import { TourLocation } from '@domain/entities/tour';

const tourTypeOptions = [
  { label: i18n.t(`TOUR_TEMPLATE.${TourType.INLAND}`), value: TourType.INLAND },
  { label: i18n.t(`TOUR_TEMPLATE.${TourType.INBOUND}`), value: TourType.INBOUND },
  { label: i18n.t(`TOUR_TEMPLATE.${TourType.OUTBOUND}`), value: TourType.OUTBOUND },
];

type CommonInformationProps = {
  control: any;
  errors: any;
  toursLocation: TourLocation[],
};
const CommonInformation: React.FC<CommonInformationProps> = ({
  control, errors, toursLocation,
}) => (
  <>
    <div className="divider divider-start divider-primary">
      <div className="divider-text text-primary fw-bolder">{i18n.t('TOUR_TEMPLATE.TOUR_TEMPLATE_INFO')}</div>
    </div>
    <Row>
      <Col md={12}>
        <div className="mb-1">
          <Label className="form-label" for="tourName">
            {i18n.t('TOUR_TEMPLATE.NAME')}
            {' '}
            <span className="text-danger">{' *'}</span>
          </Label>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input {...field} id="tourName" invalid={!!errors.name} />
            )}
          />
          {errors.name && <FormFeedback>{errors.name.message}</FormFeedback>}
        </div>
      </Col>
    </Row>
    <Row>
      <Col md={6}>
        <div className="mb-1">
          <Label className="form-label" for="type">
            {i18n.t('TOUR_TEMPLATE.TYPE')}
            {' '}
            <span className="text-danger">{' *'}</span>
          </Label>
          <FormItemSelect
            control={control}
            name="type"
            errors={errors}
            options={tourTypeOptions}
            placeholder={i18n.t('TOUR_TEMPLATE.SELECT_TOUR_TYPE')}
          />
        </div>
      </Col>
      <Col md={6}>
        <div className="mb-1">
          <Label className="form-label" for="visitorCount">
            {i18n.t('TOUR_TEMPLATE.VISITOR_COUNT')}
            {' '}
            <span className="text-danger">{' *'}</span>
          </Label>
          <Controller
            name="visitorCount"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="number"
                id="visitorCount"
                className={`${errors.visitorCount && 'is-invalid'}`}
              />
            )}
          />
          {errors.visitorCount
                            && <FormFeedback>{errors.visitorCount.message}</FormFeedback>}
        </div>
      </Col>
    </Row>
    <Row>
      <Col md={6}>
        <div className="mb-1">
          <Label className="form-label">
            {i18n.t('TOUR_TEMPLATE.STARTING_LOCATION')}
            {' '}
            <span className="text-danger">{' *'}</span>
          </Label>
          <div className="d-flex">
            <InputGroup>
              <InputGroupText>Starting Location</InputGroupText>
              <FormItemSelect
                control={control}
                name="startingLocation"
                errors={errors}
                selectClassName="flex-fill"
                options={toursLocation.map((template) => ({
                  label: template.name,
                  value: template.code,
                }))}
              />
            </InputGroup>
          </div>
        </div>
      </Col>
      <Col md={6}>
        <div className="mb-1">
          <Label className="form-label">
            {i18n.t('TOUR_TEMPLATE.ENDING_LOCATION')}
            {' '}
            <span className="text-danger">{' *'}</span>
          </Label>
          <div className="d-flex">
            <InputGroup>
              <InputGroupText>Ending Location</InputGroupText>
              <FormItemSelect
                control={control}
                name="endingLocation"
                errors={errors}
                selectClassName="flex-fill"
                options={toursLocation.map((template) => ({
                  label: template.name,
                  value: template.code,
                }))}
              />
            </InputGroup>
          </div>
        </div>
      </Col>
    </Row>
    <Row>
      <Col md={6}>
        <div className="mb-1">
          <Label className="form-label">
            {i18n.t('TOUR_TEMPLATE.DURATION')}
            {' '}
            <span className="text-danger">{' *'}</span>
          </Label>
          <div className="d-flex">
            <div className="w-50 me-1">
              <Controller
                name="durationInDays"
                control={control}
                render={({ field }) => (
                  <InputGroup>
                    <InputGroupText>{i18n.t('TOUR_TEMPLATE.DURATION_IN_DAYS')}</InputGroupText>
                    <Input
                      {...field}
                      type="number"
                      id="durationInDays"
                      className={`text-end ${errors.durationInDays && 'is-invalid'}`}
                    />
                    {errors.durationInDays
                            && <FormFeedback>{errors.durationInDays.message}</FormFeedback>}
                  </InputGroup>
                )}
              />
            </div>
            <div className="w-50">
              <Controller
                name="durationInNights"
                control={control}
                render={({ field }) => (
                  <InputGroup>
                    <InputGroupText>{i18n.t('TOUR_TEMPLATE.DURATION_IN_NIGHTS')}</InputGroupText>
                    <Input
                      {...field}
                      type="number"
                      id="durationInNights"
                      className={`text-end ${errors.durationInNights && 'is-invalid'}`}
                    />
                    {errors.durationInNights
                            && <FormFeedback>{errors.durationInNights.message}</FormFeedback>}
                  </InputGroup>
                )}
              />
            </div>
          </div>
        </div>
      </Col>
    </Row>
  </>
);

export default CommonInformation;
