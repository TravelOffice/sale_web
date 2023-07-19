import React from 'react';
import { Trash } from 'react-feather';
import { Control, Controller } from 'react-hook-form';
import {
  Button,
  Col,
  FormFeedback, Input, InputGroup, InputGroupText, Row,
} from 'reactstrap';
import i18n from '@config/i18n';
import { Contact } from '@domain/entities/supplier';

type ContactItemProps = {
  contacts: Contact[];
  setContacts: (contacts: Contact[]) => void
  control: Control<any, any>;
  errors: { [p: string]: any };
};

const SupplierContact: React.FC<ContactItemProps> = ({
  contacts,
  setContacts,
  control,
  errors,
}) => {
  const handleContactChange = (value: number | string, index: number, type: string) => {
    const updatedContacts = [...contacts];
    updatedContacts[index] = { ...updatedContacts[index], [type]: value };
    setContacts(updatedContacts);
  };

  const handleAddContact = () => {
    setContacts([...contacts, {
      name: '', email: '', phoneNumber: '',
    }]);
  };

  const handleRemoveContact = (index: number) => {
    const updatedContacts = [...contacts];
    updatedContacts.splice(index, 1);
    setContacts(updatedContacts);
  };

  return (
    <div className="mt-2 mb-4">
      <div className="divider divider-start divider-primary">
        <div className="divider-text text-primary fw-bolder">
          {i18n.t('SUPPLIER.CONTACT_LIST')}
        </div>
      </div>
      {contacts.map((info, index) => (
        <div key={index.toString()}>
          <Row className="mb-1">
            <Col md={3}>
              <Controller
                control={control}
                name={`contacts.${index}.name`}
                defaultValue={info.name}
                render={({ field: { onChange, ...rest } }) => (
                  <InputGroup>
                    <InputGroupText>{i18n.t('SUPPLIER.CONTACT_NAME')}</InputGroupText>
                    <Input
                      {...rest}
                      invalid={!!errors.contacts?.[index]?.name}
                      onChange={(e) => {
                        handleContactChange(e.target.value, index, 'name');
                        onChange(e);
                      }}
                    />
                    {errors.contacts?.[index]?.name
                            && (
                            <FormFeedback>
                              {errors.contacts?.[index]?.name?.message}
                            </FormFeedback>
                            )}
                  </InputGroup>
                )}
              />
            </Col>
            <Col md={3}>
              <Controller
                control={control}
                name={`contacts.${index}.email`}
                defaultValue={info.email}
                render={({ field: { onChange, ...rest } }) => (
                  <InputGroup>
                    <InputGroupText>{i18n.t('SUPPLIER.CONTACT_EMAIL')}</InputGroupText>
                    <Input
                      {...rest}
                      invalid={!!errors.contacts?.[index]?.email}
                      onChange={(e) => {
                        handleContactChange(e.target.value, index, 'email');
                        onChange(e);
                      }}
                    />
                    {errors.contacts?.[index]?.email
                            && (
                            <FormFeedback>
                              {errors.contacts?.[index]?.email?.message}
                            </FormFeedback>
                            )}
                  </InputGroup>
                )}
              />
            </Col>
            <Col md={3}>
              <Controller
                control={control}
                name={`contacts.${index}.phoneNumber`}
                defaultValue={info.phoneNumber}
                render={({ field: { onChange, ...rest } }) => (
                  <InputGroup>
                    <InputGroupText>{i18n.t('SUPPLIER.CONTACT_PHONE_NUMBER')}</InputGroupText>
                    <Input
                      {...rest}
                      invalid={!!errors.contacts?.[index]?.phoneNumber}
                      onChange={(e) => {
                        handleContactChange(e.target.value, index, 'phoneNumber');
                        onChange(e);
                      }}
                    />
                    {errors.contacts?.[index]?.phoneNumber
                            && (
                            <FormFeedback>
                              {errors.contacts?.[index]?.phoneNumber?.message}
                            </FormFeedback>
                            )}
                  </InputGroup>
                )}
              />
            </Col>
            <Col md={3}>
              <Button
                type="button"
                className="btn-icon"
                onClick={() => handleRemoveContact(index)}
                color="danger"
              >
                <Trash size={16} />
              </Button>
            </Col>
          </Row>
        </div>
      ))}

      <Button type="button" onClick={handleAddContact}>
        {i18n.t('SUPPLIER.ADD_CONTACT')}
      </Button>
    </div>
  );
};

export default SupplierContact;
