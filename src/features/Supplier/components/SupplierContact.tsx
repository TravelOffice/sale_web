import React from 'react';
import { Trash } from 'react-feather';
import { Control, useFieldArray } from 'react-hook-form';
import { Button, Col, Row } from 'reactstrap';
import i18n from '@config/i18n';
import FormItemInputGroup from '@components/Form/FormItemInputGroup';

type ContactItemProps = {
  control: Control<any, any>;
  errors: { [p: string]: any };
};

const SupplierContact: React.FC<ContactItemProps> = ({
  control,
  errors,
}) => {
  const { fields, remove, append } = useFieldArray({ control, name: 'contacts' });

  return (
    <div className="mt-2 mb-4">
      <div className="divider divider-start divider-primary">
        <div className="divider-text text-primary fw-bolder">
          {i18n.t('SUPPLIER.CONTACT_LIST')}
        </div>
      </div>
      {fields.map((item, index) => (
        <div key={item.id}>
          <Row className="mb-1">
            <Col md={3}>
              <FormItemInputGroup
                label={i18n.t('SUPPLIER.CONTACT_NAME')}
                control={control}
                name={`contacts.${index}.name`}
                errors={errors}
              />
            </Col>
            <Col md={3}>
              <FormItemInputGroup
                label={i18n.t('SUPPLIER.CONTACT_EMAIL')}
                control={control}
                name={`contacts.${index}.email`}
                errors={errors}
              />
            </Col>
            <Col md={3}>
              <FormItemInputGroup
                label={i18n.t('SUPPLIER.CONTACT_PHONE_NUMBER')}
                control={control}
                name={`contacts.${index}.phoneNumber`}
                errors={errors}
              />
            </Col>
            <Col md={3}>
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

      <Button type="button" color="primary" onClick={() => append({ name: '', email: '', phoneNumber: '' })}>
        {i18n.t('SUPPLIER.ADD_CONTACT')}
      </Button>
    </div>
  );
};

export default SupplierContact;
