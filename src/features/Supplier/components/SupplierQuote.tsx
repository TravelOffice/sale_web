import React from 'react';
import { Trash } from 'react-feather';
import { Control, Controller } from 'react-hook-form';
import {
  Button,
  Col,
  FormFeedback, Input, InputGroup, InputGroupText, Row,
} from 'reactstrap';
import i18n from '@config/i18n';
import { Quote } from '@domain/entities/supplier';
import CurrencyInput from 'react-currency-input-field';
import { convertCurrencyToNumber } from '@utils/CurrencyUtils';

type QuoteItemProps = {
  quotes: Quote[];
  setQuotes: (quotes: Quote[]) => void
  control: Control<any, any>;
  errors: { [p: string]: any };
};

const SupplierQuote: React.FC<QuoteItemProps> = ({
  quotes,
  setQuotes,
  control,
  errors,
}) => {
  const handleQuoteChange = (value: number | string, index: number, type: string) => {
    const updatedQuotes = [...quotes];
    updatedQuotes[index] = { ...updatedQuotes[index], [type]: value };
    setQuotes(updatedQuotes);
  };

  const handleAddQuote = () => {
    setQuotes([...quotes, {
      description: '', year: 0, price: 0, link: '',
    }]);
  };

  const handleRemoveQuote = (index: number) => {
    const updatedQuotes = [...quotes];
    updatedQuotes.splice(index, 1);
    setQuotes(updatedQuotes);
  };

  return (
    <div className="mt-2 mb-4">
      <div className="divider divider-start divider-primary">
        <div className="divider-text text-primary fw-bolder">
          {i18n.t('SUPPLIER.QUOTE_LIST')}
        </div>
      </div>
      {quotes.map((quote, index) => (
        <div key={index.toString()}>
          <Row className="mb-1">
            <Col md={3}>
              <Controller
                control={control}
                name={`quotes.${index}.year`}
                defaultValue={quote.year}
                render={({ field: { onChange, ...rest } }) => (
                  <InputGroup>
                    <InputGroupText>{i18n.t('SUPPLIER.QUOTE_YEAR')}</InputGroupText>
                    <Input
                      {...rest}
                      type="number"
                      invalid={!!errors.quote?.[index]?.year}
                      onChange={(e) => {
                        handleQuoteChange(parseInt(e.target.value, 10), index, 'year');
                        onChange(e);
                      }}
                    />
                    {errors.quotes?.[index]?.year
                            && (
                            <FormFeedback>
                              {errors.quote?.[index]?.year?.message}
                            </FormFeedback>
                            )}
                  </InputGroup>
                )}
              />
            </Col>
            <Col md={3}>
              <Controller
                control={control}
                name={`quotes.${index}.price`}
                defaultValue={quote.price}
                render={({ field: { onChange, ...rest } }) => (
                  <InputGroup>
                    <InputGroupText>{i18n.t('SUPPLIER.QUOTE_PRICE')}</InputGroupText>
                    <CurrencyInput
                      {...rest}
                      className={`form-control text-end ${errors.otherPrice?.[index]?.price && 'is-invalid'}`}
                      onValueChange={(newValue) => {
                        const numericValue = convertCurrencyToNumber(newValue);
                        handleQuoteChange(numericValue, index, 'price');
                        onChange(numericValue);
                      }}
                      decimalSeparator="."
                      groupSeparator=","
                    />
                    <InputGroupText>VND</InputGroupText>
                    {errors.otherPrice?.[index]?.price && (
                    <FormFeedback>
                      {errors.otherPrice?.[index]?.price?.message}
                    </FormFeedback>
                    )}
                  </InputGroup>
                )}
              />
            </Col>
            <Col md={4}>
              <Controller
                control={control}
                name={`quotes.${index}.link`}
                defaultValue={quote.link}
                render={({ field: { onChange, ...rest } }) => (
                  <InputGroup>
                    <InputGroupText>{i18n.t('SUPPLIER.QUOTE_LINK')}</InputGroupText>
                    <Input
                      {...rest}
                      invalid={!!errors.quote?.[index]?.link}
                      onChange={(e) => {
                        handleQuoteChange(e.target.value, index, 'link');
                        onChange(e);
                      }}
                    />
                    {errors.quotes?.[index]?.link
                            && (
                            <FormFeedback>
                              {errors.quote?.[index]?.link?.message}
                            </FormFeedback>
                            )}
                  </InputGroup>
                )}
              />
            </Col>
            <Col md={2}>
              <Button
                type="button"
                className="btn-icon"
                onClick={() => handleRemoveQuote(index)}
                color="danger"
              >
                <Trash size={16} />
              </Button>
            </Col>
          </Row>
        </div>
      ))}

      <Button type="button" onClick={handleAddQuote}>
        {i18n.t('SUPPLIER.ADD_QUOTE')}
      </Button>
    </div>
  );
};

export default SupplierQuote;
