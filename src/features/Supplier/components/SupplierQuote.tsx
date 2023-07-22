import React from 'react';
import { Trash } from 'react-feather';
import { Control, FieldErrors, useFieldArray } from 'react-hook-form';
import { Button, Col, Row } from 'reactstrap';
import i18n from '@config/i18n';
import { Supplier } from '@domain/entities/supplier';
import FormItemInputGroup from '@components/Form/FormItemInputGroup';

type QuoteItemProps = {
  control: Control<Supplier>,
  errors: FieldErrors<Supplier>,
};

const SupplierQuote: React.FC<QuoteItemProps> = ({
  control,
  errors,
}) => {
  const { fields, remove, append } = useFieldArray({ control, name: 'quotes' });

  return (
    <div className="mt-2 mb-4">
      <div className="divider divider-start divider-primary">
        <div className="divider-text text-primary fw-bolder">
          {i18n.t('SUPPLIER.QUOTE_LIST')}
        </div>
      </div>
      {fields.map((item, index) => (
        <div key={item.id}>
          <Row className="mb-1">
            <Col md={3}>
              <FormItemInputGroup
                label={i18n.t('SUPPLIER.QUOTE_YEAR')}
                control={control}
                name={`quotes.${index}.year`}
                errors={errors}
              />
            </Col>
            <Col md={3}>
              <FormItemInputGroup
                label={i18n.t('SUPPLIER.QUOTE_PRICE')}
                control={control}
                name={`quotes.${index}.price`}
                errors={errors}
              />
            </Col>
            <Col md={4}>
              <FormItemInputGroup
                label={i18n.t('SUPPLIER.QUOTE_LINK')}
                control={control}
                name={`quotes.${index}.link`}
                errors={errors}
              />
            </Col>
            <Col md={2}>
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

      <Button type="button" color="primary" onClick={() => append({ year: 0, price: 0, link: '' })}>
        {i18n.t('SUPPLIER.ADD_QUOTE')}
      </Button>
    </div>
  );
};

export default SupplierQuote;
