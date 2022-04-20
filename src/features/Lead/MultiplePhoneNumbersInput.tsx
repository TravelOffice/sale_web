// ** React Imports
import React from 'react';
import classnames from 'classnames';
// ** Icons Imports
import { Plus, X } from 'react-feather';
import {
  Control, FieldErrors, useFieldArray, UseFormRegister,
} from 'react-hook-form';
// ** Reactstrap Imports
import {
  Button, Col, FormFeedback, Row,
} from 'reactstrap';
import i18n from '@config/i18n';

export interface MultiplePhoneNumbersInputProps {
  fieldName: string,
  control: Control<any, any>,
  errors: FieldErrors,
  register: UseFormRegister<any>,
}

const MultiplePhoneNumbersInput = (props: MultiplePhoneNumbersInputProps) => {
  const {
    fieldName, control, errors, register,
  } = props;

  const {
    fields, append, remove,
  } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: fieldName, // unique name for your Field Array
  });

  const deletePhoneNumber = (index: number) => {
    remove(index);
  };

  return (
    <>
      {
        fields.map((field, index) => (
          <Row className="justify-content-between align-items-center">
            <Col md={8} className="mb-md-0 mb-1">
              <input className={classnames('form-control', { 'is-invalid': errors[fieldName] && errors[fieldName][index] })} {...register(`${fieldName}[${index}].value`)} />
            </Col>
            <Col md={4}>
              <Button color="danger" className="text-nowrap px-1" onClick={() => deletePhoneNumber(index)} outline>
                <X size={16} className="me-50" />
                <span>{i18n.t('COMMON.DELETE')}</span>
              </Button>
            </Col>
            {errors[fieldName]
            && errors[fieldName][index]
            && <FormFeedback className="d-block">{errors[fieldName][index].value.message}</FormFeedback>}
            <Col sm={12}>
              <hr />
            </Col>
          </Row>
        ))
      }
      <Button className="btn-icon" color="primary" onClick={() => append({ value: '' })}>
        <Plus size={16} />
        <span className="align-middle ms-25">{i18n.t('COMMON.ADD')}</span>
      </Button>
    </>
  );
};

export default MultiplePhoneNumbersInput;
