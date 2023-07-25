import {
  Control, Controller, FieldErrors, useFieldArray, useWatch,
} from 'react-hook-form';
import React from 'react';
import {
  Button, Col, FormFeedback, Input, Row,
} from 'reactstrap';
import i18n from '@config/i18n';
import CurrencyInput from 'react-currency-input-field';
import { convertCurrencyToNumber } from '@utils/CurrencyUtils';
import { Trash } from 'react-feather';
import { UpdateBookingFormData } from '@domain/entities/booking/UpdateBookingFormData';
import { calculateAfterVAT, calculateBeforeVAT, calculatePaymentTotal } from '@utils/BookingUtils';
import { formatCurrency } from '@utils/Utils';

export interface BookingServiceProps {
  control: Control<UpdateBookingFormData>,
  errors: FieldErrors,
  isEditable: boolean,
}

export default function BookingService(props: BookingServiceProps) {
  const {
    control, errors, isEditable,
  } = props;
  const {
    fields,
    append,
    remove,
  } = useFieldArray({
    control,
    name: 'services',
  });

  const services = useWatch({ control, name: 'services' });

  const removeServiceHandler = (index: number) => {
    remove(index);
  };

  const addServiceHandler = () => {
    append({
      serviceName: '',
      price: 0,
      quantity: 1,
      tax: 0,
    });
  };
  return (
    <div className="mt-2 mb-4">
      {
        fields.map((item, index) => (
          <div key={item.id}>
            <Row>
              <Col mb={2}>
                <Controller
                  control={control}
                  name={`services.${index}.serviceName`}
                  defaultValue={item.serviceName}
                  render={({ field }) => (
                    <>
                      <Input
                        {...field}
                        invalid={!!errors.services?.[index]?.serviceName}
                        disabled={!isEditable}
                      />
                      {errors.services?.[index]?.serviceName
                        && (
                          <FormFeedback>
                            {errors.services?.[index]?.serviceName?.message}
                          </FormFeedback>
                        )}
                    </>
                  )}
                />
              </Col>
              <Col mb={2}>
                <Controller
                  control={control}
                  name={`services.${index}.price`}
                  defaultValue={item.price}
                  render={({ field: { onChange, ...rest } }) => (
                    <>
                      <CurrencyInput
                        {...rest}
                        className={`form-control text-end ${errors.services?.[index]?.price && 'is-invalid'}`}
                        onValueChange={(newValue) => {
                          const numericValue = convertCurrencyToNumber(newValue);
                          onChange(numericValue);
                        }}
                        decimalSeparator="."
                        groupSeparator=","
                        disabled={!isEditable}
                      />
                      {errors.services?.[index]?.price && (
                        <FormFeedback>
                          {errors.services?.[index]?.price?.message}
                        </FormFeedback>
                      )}
                    </>
                  )}
                />
              </Col>
              <Col md={2}>
                <Controller
                  control={control}
                  name={`services.${index}.quantity`}
                  defaultValue={item.quantity}
                  render={({ field: { onChange, ...rest } }) => (
                    <>
                      <CurrencyInput
                        {...rest}
                        className={`form-control text-end ${errors.services?.[index]?.quantity && 'is-invalid'}`}
                        onValueChange={(newValue) => {
                          const numericValue = convertCurrencyToNumber(newValue);
                          onChange(numericValue);
                        }}
                        decimalSeparator="."
                        groupSeparator=","
                        disabled={!isEditable}
                      />
                      {errors.services?.[index]?.price && (
                        <FormFeedback>
                          {errors.services?.[index]?.price?.message}
                        </FormFeedback>
                      )}
                    </>
                  )}
                />
              </Col>
              <Col md={1}>
                <Controller
                  control={control}
                  name={`services.${index}.tax`}
                  defaultValue={item.tax}
                  render={({ field: { onChange, ...rest } }) => (
                    <>
                      <CurrencyInput
                        {...rest}
                        className={`form-control text-end ${errors.services?.[index]?.tax && 'is-invalid'}`}
                        onValueChange={(newValue) => {
                          const numericValue = convertCurrencyToNumber(newValue);
                          onChange(numericValue);
                        }}
                        decimalSeparator="."
                        groupSeparator=","
                        disabled={!isEditable}
                      />
                      {errors.services?.[index]?.tax && (
                        <FormFeedback>
                          {errors.services?.[index]?.price?.message}
                        </FormFeedback>
                      )}
                    </>
                  )}
                />
              </Col>
              <Col md={2}>
                <Input
                  value={formatCurrency(calculateBeforeVAT(
                    services[index]?.price, services[index]?.quantity,
                  ))}
                  disabled
                />
              </Col>
              <Col md={2}>
                <Input
                  value={formatCurrency(calculateAfterVAT(
                    services[index]?.price, services[index]?.quantity, services[index]?.tax,
                  ))}
                  disabled
                />
              </Col>
              <Col md={1}>
                {
                  isEditable ? (
                    <Button
                      type="button"
                      className="btn-icon"
                      onClick={() => removeServiceHandler(index)}
                      color="danger"
                    >
                      <Trash size={16} />
                    </Button>
                  ) : <></>
                }
              </Col>
            </Row>
            <br />
          </div>
        ))
      }
      <Row>
        <Col md={2}>
          {
            isEditable ? (
              <Button type="button" onClick={addServiceHandler}>
                {i18n.t('DEPARTURE_TOUR.ADD_SERVICE')}
              </Button>
            ) : <></>
          }
        </Col>
        <Col md={2} className="offset-5 d-flex align-items-center">
          <h5 className="mb-0">{i18n.t('BOOKING.TOTAL_PAYMENT')}</h5>
        </Col>
        <Col md={2}>
          <Input
            className="text-danger fw-bold"
            value={formatCurrency(calculatePaymentTotal(services))}
            disabled
          />
        </Col>
      </Row>
    </div>
  );
}
