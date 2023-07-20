import React from 'react';
import { Trash } from 'react-feather';
import { Control, Controller } from 'react-hook-form';
import {
  Button, Col, FormFeedback, Input, InputGroup, InputGroupText, Row,
} from 'reactstrap';
import CurrencyInput from 'react-currency-input-field';
import { convertCurrencyToNumber } from '@utils/CurrencyUtils';
import i18n from '@config/i18n';
import { TourServicePrice } from '@domain/entities/tour';

type AdditionalServiceItemProps = {
  services: TourServicePrice[];
  setServices: (services: TourServicePrice[]) => void
  control: Control<any, any>;
  errors: { [p: string]: any };
};

const AdditionalServiceItem: React.FC<AdditionalServiceItemProps> = ({
  services,
  setServices,
  control,
  errors,
}) => {
  const handleServiceNameChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const updatedServices = [...services];
    updatedServices[index] = { ...updatedServices[index], name: e.target.value };
    setServices(updatedServices);
  };

  const handleServicePriceChange = (value: number, index: number) => {
    const updatedServices = [...services];
    updatedServices[index] = { ...updatedServices[index], price: value };
    setServices(updatedServices);
  };

  const handleAddService = () => {
    setServices([...services, { name: '', price: 0 }]);
  };

  const handleRemoveService = (index: number) => {
    const updatedServices = [...services];
    updatedServices.splice(index, 1);
    setServices(updatedServices);
  };
  return (
    <div className="mt-2 mb-4">
      <div className="divider divider-start divider-primary">
        <div
          className="divider-text text-primary fw-bolder"
        >
          {i18n.t('TOUR_TEMPLATE.PRICE')}
        </div>
      </div>
      {services.map((service, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <div key={index}>
          <Row>
            <Col md={4} className="mb-1">
              <Controller
                control={control}
                name={`services.${index}.name`}
                render={({ field: { onChange, ...rest } }) => (
                  <InputGroup>
                    <InputGroupText>{i18n.t('TOUR_TEMPLATE.SERVICE_NAME')}</InputGroupText>
                    <Input
                      {...rest}
                      invalid={!!errors.services?.[index]?.name}
                      onChange={(e) => {
                        handleServiceNameChange(e, index);
                        onChange(e);
                      }}
                    />
                    {errors.services?.[index]?.name
                      && (
                        <FormFeedback>
                          {errors.services?.[index]?.name?.message}
                        </FormFeedback>
                      )}
                  </InputGroup>
                )}
              />
            </Col>
            <Col md={4}>
              <Controller
                control={control}
                name={`services.${index}.price`}
                render={({ field: { onChange, ...rest } }) => (
                  <InputGroup>
                    <InputGroupText>{i18n.t('TOUR_TEMPLATE.SERVICE_PRICE')}</InputGroupText>
                    <CurrencyInput
                      {...rest}
                      className={`form-control text-end ${errors.services?.[index]?.price && 'is-invalid'}`}
                      onValueChange={(newValue) => {
                        const numericValue = convertCurrencyToNumber(newValue);
                        handleServicePriceChange(numericValue, index);
                        onChange(numericValue);
                      }}
                      decimalSeparator="."
                      groupSeparator=","
                    />
                    <InputGroupText>VND</InputGroupText>
                    {errors.services?.[index]?.price && (
                      <FormFeedback>
                        {errors.services?.[index]?.price?.message}
                      </FormFeedback>
                    )}
                  </InputGroup>
                )}
              />
            </Col>
            <Col md={4}>
              <Button
                type="button"
                className="btn-icon"
                onClick={() => handleRemoveService(index)}
                color="danger"
              >
                <Trash size={16} />
              </Button>
            </Col>
          </Row>
        </div>
      ))}

      <Button type="button" onClick={handleAddService}>
        {i18n.t('TOUR_TEMPLATE.ADD_SERVICE')}
      </Button>
    </div>
  );
};

export default AdditionalServiceItem;
