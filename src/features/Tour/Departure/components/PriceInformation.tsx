import React from 'react';
import {
  Col, FormFeedback, InputGroup, InputGroupText, Row,
} from 'reactstrap';
import { Controller } from 'react-hook-form';
import CurrencyInput from 'react-currency-input-field';
import { convertCurrencyToNumber } from '@utils/CurrencyUtils';
import i18n from '@config/i18n';

type PriceInformationProps = {
  control: any;
  errors: any;
};

const PriceInformation: React.FC<PriceInformationProps> = ({ control, errors }) => (
  <div className="mt-2 mb-1">
    <div className="divider divider-start divider-primary">
      <div className="divider-text text-primary fw-bolder">{i18n.t('TOUR_TEMPLATE.PRICE')}</div>
    </div>
    <div className="d-flex">
      <Row>
        <Col md={12}>
          <div className="mb-1 w-50">
            <Controller
              name="adultPrice"
              control={control}
              render={({ field: { onChange, ...rest } }) => (
                <InputGroup>
                  <InputGroupText className="w-15">{i18n.t('TOUR_TEMPLATE.ADULT_PRICE')}</InputGroupText>
                  <CurrencyInput
                    {...rest}
                    className={`form-control text-end ${errors.adultPrice && 'is-invalid'}`}
                    onValueChange={(newValue) => {
                      const numericValue = convertCurrencyToNumber(newValue);
                      onChange(numericValue);
                    }}
                    decimalSeparator="."
                    groupSeparator=","
                  />
                  <InputGroupText>VND</InputGroupText>
                  {errors.adultPrice
                      && <FormFeedback>{errors.adultPrice.message}</FormFeedback>}
                </InputGroup>
              )}
            />
          </div>
        </Col>
        <Col md={12}>
          <div className="mb-1 w-50">
            <Controller
              name="childUnder5Price"
              control={control}
              render={({ field: { onChange, ...rest } }) => (
                <InputGroup>
                  <InputGroupText className="w-15">{i18n.t('TOUR_TEMPLATE.CHILD_UNDER_5_PRICE')}</InputGroupText>
                  <CurrencyInput
                    {...rest}
                    className={`form-control text-end ${errors.childUnder5Price && 'is-invalid'}`}
                    onValueChange={(newValue) => {
                      const numericValue = convertCurrencyToNumber(newValue);
                      onChange(numericValue);
                    }}
                    decimalSeparator="."
                    groupSeparator=","
                  />
                  <InputGroupText>VND</InputGroupText>
                  {errors.childUnder5Price
                      && <FormFeedback>{errors.childUnder5Price.message}</FormFeedback>}
                </InputGroup>
              )}
            />
          </div>
        </Col>
        <Col md={12} className="mb-1">
          <div className="me-1 w-50">
            <Controller
              name="child5to7Price"
              control={control}
              render={({ field: { onChange, ...rest } }) => (
                <InputGroup>
                  <InputGroupText className="w-15">{i18n.t('TOUR_TEMPLATE.CHILD_5_7_PRICE')}</InputGroupText>
                  <CurrencyInput
                    {...rest}
                    className={`form-control text-end ${errors.child5to7Price && 'is-invalid'}`}
                    onValueChange={(newValue) => {
                      const numericValue = convertCurrencyToNumber(newValue);
                      onChange(numericValue);
                    }}
                    decimalSeparator="."
                    groupSeparator=","
                  />
                  <InputGroupText>VND</InputGroupText>
                  {errors.child5to7Price
                      && <FormFeedback>{errors.child5to7Price.message}</FormFeedback>}
                </InputGroup>
              )}
            />
          </div>
        </Col>
        <Col md={12} className="mb-1">
          <div className="me-1 w-50">
            <Controller
              name="child8to11Price"
              control={control}
              render={({ field: { onChange, ...rest } }) => (
                <InputGroup>
                  <InputGroupText className="w-15">{i18n.t('TOUR_TEMPLATE.CHILD_8_11_PRICE')}</InputGroupText>
                  <CurrencyInput
                    {...rest}
                    className={`form-control text-end ${errors.child8to11Price && 'is-invalid'}`}
                    onValueChange={(newValue) => {
                      const numericValue = convertCurrencyToNumber(newValue);
                      onChange(numericValue);
                    }}
                    decimalSeparator="."
                    groupSeparator=","
                  />
                  <InputGroupText>VND</InputGroupText>
                  {errors.child8to11Price
                      && <FormFeedback>{errors.child8to11Price.message}</FormFeedback>}
                </InputGroup>
              )}
            />
          </div>
        </Col>
      </Row>
    </div>
  </div>
);

export default PriceInformation;
