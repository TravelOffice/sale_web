import React from 'react';
import { Trash } from 'react-feather';
import { Control, Controller } from 'react-hook-form';
import {
  Button,
  Col,
  FormFeedback, Input, InputGroup, InputGroupText, Row,
} from 'reactstrap';
import i18n from '@config/i18n';
import { PaymentInfo } from '@domain/entities/supplier';
import FormItemSelect from '@components/Form/FormItemSelect';

type PaymentInfoItemProps = {
  paymentInfo: PaymentInfo[];
  setPaymentInfo: (paymentInfo: PaymentInfo[]) => void
  control: Control<any, any>;
  errors: { [p: string]: any };
};

const bankOptions = [
  { label: 'Vietcombank', value: 'vietcombank' },
  { label: 'Techcombank', value: 'techcombank' },
  { label: 'MBBank', value: 'mbbank' },
  { label: 'Agribank', value: 'agribank' },
  { label: 'BIDV', value: 'bidv' },
  { label: 'VPBank', value: 'vpbank' },
  { label: 'Sacombank', value: 'sacombank' },
  { label: 'VietinBank', value: 'vietinbank' },
  { label: 'ACB - Asia Commercial Bank', value: 'acb' },
  { label: 'DongA Bank', value: 'dongabank' },
  { label: 'TPBank - Tien Phong Bank', value: 'tpbank' },
  { label: 'Viet Capital Bank', value: 'vietcapitalbank' },
  { label: 'OceanBank', value: 'oceanbank' },
  { label: 'Eximbank', value: 'eximbank' },
  { label: 'PVcomBank', value: 'pvcombank' },
];

const SupplierPaymentInfo: React.FC<PaymentInfoItemProps> = ({
  paymentInfo,
  setPaymentInfo,
  control,
  errors,
}) => {
  const handlePaymentInfoChange = (value: number | string, index: number, type: string) => {
    const updatedPaymentInfo = [...paymentInfo];
    updatedPaymentInfo[index] = { ...updatedPaymentInfo[index], [type]: value };
    setPaymentInfo(updatedPaymentInfo);
  };

  const handleAddPaymentInfo = () => {
    setPaymentInfo([...paymentInfo, {
      bankName: '', accountName: '', accountNumber: '', bankBranch: '',
    }]);
  };

  const handleRemovePaymentInfo = (index: number) => {
    const updatedPaymentInfo = [...paymentInfo];
    updatedPaymentInfo.splice(index, 1);
    setPaymentInfo(updatedPaymentInfo);
  };

  return (
    <div className="mt-2 mb-4">
      <div className="divider divider-start divider-primary">
        <div className="divider-text text-primary fw-bolder">
          {i18n.t('SUPPLIER.PAYMENT_INFO_LIST')}
        </div>
      </div>
      {paymentInfo.map((info, index) => (
        <div key={index.toString()}>
          <Row className="mb-1">
            <Col md={2}>
              <FormItemSelect
                control={control}
                name={`paymentInfo.${index}.bankName`}
                errors={errors}
                options={bankOptions}
                placeholder={i18n.t('SUPPLIER.SELECT_BANK')}
              />
            </Col>
            <Col md={3}>
              <Controller
                control={control}
                name={`paymentInfo.${index}.bankBranch`}
                defaultValue={info.bankBranch}
                render={({ field: { onChange, ...rest } }) => (
                  <InputGroup>
                    <InputGroupText>{i18n.t('SUPPLIER.BANK_BRANCH')}</InputGroupText>
                    <Input
                      {...rest}
                      invalid={!!errors.paymentInfo?.[index]?.bankBranch}
                      onChange={(e) => {
                        handlePaymentInfoChange(e.target.value, index, 'bankBranch');
                        onChange(e);
                      }}
                    />
                    {errors.paymentInfo?.[index]?.bankBranch
                            && (
                            <FormFeedback>
                              {errors.paymentInfo?.[index]?.bankBranch?.message}
                            </FormFeedback>
                            )}
                  </InputGroup>
                )}
              />
            </Col>
            <Col md={3}>
              <Controller
                control={control}
                name={`paymentInfo.${index}.accountName`}
                defaultValue={info.accountName}
                render={({ field: { onChange, ...rest } }) => (
                  <InputGroup>
                    <InputGroupText>{i18n.t('SUPPLIER.BANK_ACCOUNT_NAME')}</InputGroupText>
                    <Input
                      {...rest}
                      invalid={!!errors.paymentInfo?.[index]?.accountName}
                      onChange={(e) => {
                        handlePaymentInfoChange(e.target.value, index, 'accountName');
                        onChange(e);
                      }}
                    />
                    {errors.paymentInfo?.[index]?.accountName
                            && (
                            <FormFeedback>
                              {errors.paymentInfo?.[index]?.accountName?.message}
                            </FormFeedback>
                            )}
                  </InputGroup>
                )}
              />
            </Col>
            <Col md={3}>
              <Controller
                control={control}
                name={`paymentInfo.${index}.accountNumber`}
                defaultValue={info.accountNumber}
                render={({ field: { onChange, ...rest } }) => (
                  <InputGroup>
                    <InputGroupText>{i18n.t('SUPPLIER.BANK_ACCOUNT_NUMBER')}</InputGroupText>
                    <Input
                      {...rest}
                      invalid={!!errors.paymentInfo?.[index]?.accountNumber}
                      onChange={(e) => {
                        handlePaymentInfoChange(e.target.value, index, 'accountNumber');
                        onChange(e);
                      }}
                    />
                    {errors.paymentInfo?.[index]?.accountNumber
                            && (
                            <FormFeedback>
                              {errors.paymentInfo?.[index]?.accountNumber?.message}
                            </FormFeedback>
                            )}
                  </InputGroup>
                )}
              />
            </Col>
            <Col md={1}>
              <Button
                type="button"
                className="btn-icon"
                onClick={() => handleRemovePaymentInfo(index)}
                color="danger"
              >
                <Trash size={16} />
              </Button>
            </Col>
          </Row>
        </div>
      ))}
      <Button type="button" onClick={handleAddPaymentInfo}>
        {i18n.t('SUPPLIER.ADD_PAYMENT_INFO')}
      </Button>
    </div>
  );
};

export default SupplierPaymentInfo;
