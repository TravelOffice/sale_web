import React from 'react';
import { CreateDepartureTourFormData } from '@domain/entities/tour';
import {
  Control, FieldErrors, useFieldArray,
} from 'react-hook-form';
import FormItemCurrency from '@components/Form/FormItemCurrency';
import i18n from '@config/i18n';
import {
  Button, Col, Row,
} from 'reactstrap';
import { Plus, Trash } from 'react-feather';
import FormItemInputGroup from '@components/Form/FormItemInputGroup';

export interface ServicesProps {
  control: Control<CreateDepartureTourFormData>,
  errors: FieldErrors<CreateDepartureTourFormData>,
}

export default function Services(props: ServicesProps) {
  const { control, errors } = props;
  const { fields, remove, append } = useFieldArray({ control, name: 'services' });
  return (
    <div className="mt-2 mb-3">
      <div className="divider divider-start divider-primary">
        <div className="divider-text text-primary fw-bolder">{i18n.t('TOUR_TEMPLATE.PRICE')}</div>
      </div>
      <div>
        {fields.map((item, index) => (
          <div key={item.id}>
            <Row>
              <Col md={6} className="mb-1">
                <FormItemInputGroup
                  label={i18n.t('TOUR_TEMPLATE.SERVICE_NAME')}
                  control={control}
                  name={`services.${index}.name`}
                  errors={errors}
                />
              </Col>
              <Col md={5}>
                <FormItemCurrency
                  label={i18n.t('TOUR_TEMPLATE.SERVICE_PRICE')}
                  name={`services.${index}.price`}
                  control={control}
                  errors={errors}
                />
              </Col>
              <Col md={1}>
                <Button
                  type="button"
                  className="btn-icon"
                  onClick={() => remove(index)}
                  color="danger"
                >
                  <Trash size={16} />
                </Button>
              </Col>
            </Row>
          </div>
        ))}
      </div>
      <Button color="primary" type="button" onClick={() => append({ name: '', price: 0 })}>
        <Plus size={16} />
        {' '}
        {i18n.t('TOUR_TEMPLATE.ADD_SERVICE')}
      </Button>
    </div>
  );
}
