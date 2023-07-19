import React from 'react';
import {
  Col, FormFeedback, Input, Label, Row,
} from 'reactstrap';
import i18n from '@config/i18n';
import { Controller } from 'react-hook-form';
import FormItemSelect from '@components/Form/FormItemSelect';
import FormItemEditor from '@components/Form/FormItemEditor';
import { EditorState } from 'draft-js';

type CommonInformationProps = {
  control: any;
  errors: any;
  note: EditorState;
  setNote: (value: EditorState) => void
};

const starRatingOptions = [
  { label: '1', value: 1 },
  { label: '2', value: 2 },
  { label: '3', value: 3 },
  { label: '4', value: 4 },
  { label: '5', value: 5 },
];

const supplierServicesType = [
  { label: i18n.t('SUPPLIER.TOUR'), value: 'TOUR' },
  { label: i18n.t('SUPPLIER.ACCOMMODATION'), value: 'ACCOMMODATION' },
  { label: i18n.t('SUPPLIER.RESTAURANT'), value: 'RESTAURANT' },
  { label: i18n.t('SUPPLIER.TOUR_GUIDE'), value: 'TOUR_GUIDE' },
  { label: i18n.t('SUPPLIER.TEAM_BUILDING'), value: 'TEAM_BUILDING' },
  { label: i18n.t('SUPPLIER.SIGHT_SEEING_TICKET'), value: 'SIGHT_SEEING_TICKET' },
  { label: i18n.t('SUPPLIER.FLIGHT_TICKET'), value: 'FLIGHT_TICKET' },
  { label: i18n.t('SUPPLIER.OTHER_SERVICE'), value: 'OTHER' },
];

const SupplierCommonInfo: React.FC<CommonInformationProps> = ({
  control, errors, note, setNote,
}) => (
  <>
    <div className="divider divider-start divider-primary">
      <div className="divider-text text-primary fw-bolder">{i18n.t('SUPPLIER.SUPPLIER_INFO')}</div>
    </div>
    <Row>
      <Col md={6}>
        <div className="mb-1">
          <Label className="form-label" for="name">
            {i18n.t('SUPPLIER.NAME')}
            {' '}
            <span className="text-danger">{' *'}</span>
          </Label>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input {...field} id="name" invalid={!!errors.name} />
            )}
          />
          {errors.name && <FormFeedback>{errors.name.message}</FormFeedback>}
        </div>
      </Col>
      <Col md={6}>
        <div className="mb-1">
          <Label className="form-label" for="brandName">
            {i18n.t('SUPPLIER.BRAND_NAME')}
          </Label>
          <Controller
            name="brandName"
            control={control}
            render={({ field }) => (
              <Input {...field} id="brandName" invalid={!!errors.brandName} />
            )}
          />
          {errors.brandName && <FormFeedback>{errors.brandName.message}</FormFeedback>}
        </div>
      </Col>
    </Row>
    <Row>
      <Col md={6}>
        <div className="mb-1">
          <Label className="form-label" for="establishmentYear">
            {i18n.t('SUPPLIER.ESTABLISHMENT_YEAR')}
          </Label>
          <Controller
            name="establishmentYear"
            control={control}
            render={({ field }) => (
              <Input {...field} id="establishmentYear" type="number" invalid={!!errors.establishmentYear} />
            )}
          />
          {errors.establishmentYear
              && <FormFeedback>{errors.establishmentYear.message}</FormFeedback>}
        </div>
      </Col>
      <Col md={6}>
        <div className="mb-1">
          <Label className="form-label" for="starRating">
            {i18n.t('SUPPLIER.STAR_RATING')}
          </Label>
          <FormItemSelect
            control={control}
            name="starRating"
            errors={errors}
            options={starRatingOptions}
            placeholder={i18n.t('SUPPLIER.SELECT_STAR_RATING')}
          />
        </div>
      </Col>
    </Row>
    <Row>
      <Col md={6}>
        <div className="mb-1">
          <Label className="form-label" for="capacity">
            {i18n.t('SUPPLIER.CAPACITY')}
            {' '}
            <span className="text-danger">{' *'}</span>
          </Label>
          <Controller
            name="capacity"
            control={control}
            render={({ field }) => (
              <Input {...field} id="capacity" invalid={!!errors.capacity} />
            )}
          />
          {errors.capacity && <FormFeedback>{errors.capacity.message}</FormFeedback>}
        </div>
      </Col>
      <Col md={6}>
        <div className="mb-1">
          <Label className="form-label" for="taxId">
            {i18n.t('SUPPLIER.TAX_ID')}
          </Label>
          <Controller
            name="taxId"
            control={control}
            render={({ field }) => (
              <Input {...field} id="taxId" invalid={!!errors.taxId} />
            )}
          />
          {errors.taxId && <FormFeedback>{errors.taxId.message}</FormFeedback>}
        </div>
      </Col>
    </Row>
    <Row>
      <Col md={6}>
        <div className="mb-1">
          <Label className="form-label" for="city">
            {i18n.t('SUPPLIER.CITY')}
            {' '}
            <span className="text-danger">{' *'}</span>
          </Label>
          <Controller
            name="city"
            control={control}
            render={({ field }) => (
              <Input {...field} id="city" invalid={!!errors.city} />
            )}
          />
          {errors.city && <FormFeedback>{errors.city.message}</FormFeedback>}
        </div>
      </Col>
      <Col md={6}>
        <div className="mb-1">
          <Label className="form-label" for="district">
            {i18n.t('SUPPLIER.DISTRICT')}
            {' '}
            <span className="text-danger">{' *'}</span>
          </Label>
          <Controller
            name="district"
            control={control}
            render={({ field }) => (
              <Input {...field} id="district" invalid={!!errors.district} />
            )}
          />
          {errors.district && <FormFeedback>{errors.district.message}</FormFeedback>}
        </div>
      </Col>
    </Row>
    <Row>
      <Col md={12}>
        <div className="mb-1">
          <Label className="form-label" for="address">
            {i18n.t('SUPPLIER.ADDRESS')}
            {' '}
            <span className="text-danger">{' *'}</span>
          </Label>
          <Controller
            name="address"
            control={control}
            render={({ field }) => (
              <Input {...field} id="address" invalid={!!errors.address} />
            )}
          />
          {errors.address && <FormFeedback>{errors.address.message}</FormFeedback>}
        </div>
      </Col>
    </Row>
    <Row>
      <Col md={12}>
        <div className="mb-1">
          <Label className="form-label" for="type">
            {i18n.t('SUPPLIER.SERVICES')}
            {' '}
            <span className="text-danger">{' *'}</span>
          </Label>
          <br />
          <Row>
            {supplierServicesType.map((service, index) => (
              <Col md={4} key={index.toString()}>
                <Controller
                  name="services"
                  control={control}
                  defaultValue={false}
                  render={({ field }) => (
                    <>
                      <Input
                        type="checkbox"
                        value={service.value}
                        onChange={(e) => {
                          const selectedValues = Array.isArray(field.value) ? [...field.value] : [];
                          if (e.target.checked) {
                            selectedValues.push(service.value);
                          } else {
                            const idx = selectedValues.indexOf(service.value);
                            if (idx !== -1) {
                              selectedValues.splice(index, 1);
                            }
                          }
                          field.onChange(selectedValues);
                        }}
                      />
                      {' '}
                      {service.label}
                    </>
                  )}
                />
              </Col>
            ))}
          </Row>
        </div>
      </Col>
    </Row>
    <Row>
      <Col md={12}>
        <div className="mb-1">
          <div className="mb-1 rdw-editor-wrapper">
            <Label className="form-label" for="note">
              {i18n.t('SUPPLIER.NOTE')}
            </Label>
            <FormItemEditor
              name="note"
              editorState={note}
              setEditorState={setNote}
              control={control}
              errors={errors}
            />
          </div>
        </div>
      </Col>
    </Row>
  </>
);

export default SupplierCommonInfo;
