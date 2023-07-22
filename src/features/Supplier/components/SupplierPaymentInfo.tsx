import React from 'react';
import { Trash } from 'react-feather';
import { Control, FieldErrors, useFieldArray } from 'react-hook-form';
import { Button, Col, Row } from 'reactstrap';
import i18n from '@config/i18n';
import { Supplier } from '@domain/entities/supplier';
import FormItemSelect from '@components/Form/FormItemSelect';
import FormItemInputGroup from '@components/Form/FormItemInputGroup';

type PaymentInfoItemProps = {
  control: Control<Supplier>,
  errors: FieldErrors<Supplier>,
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
  control,
  errors,
}) => {
  const { fields, remove, append } = useFieldArray({ control, name: 'paymentInfo' });

  return (
    <div className="mt-2 mb-4">
      <div className="divider divider-start divider-primary">
        <div className="divider-text text-primary fw-bolder">
          {i18n.t('SUPPLIER.PAYMENT_INFO_LIST')}
        </div>
      </div>
      {fields.map((item, index) => (
        <div key={item.id}>
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
              <FormItemInputGroup
                label={i18n.t('SUPPLIER.BANK_BRANCH')}
                control={control}
                name={`paymentInfo.${index}.bankBranch`}
                errors={errors}
              />
            </Col>
            <Col md={3}>
              <FormItemInputGroup
                label={i18n.t('SUPPLIER.BANK_ACCOUNT_NAME')}
                control={control}
                name={`paymentInfo.${index}.accountName`}
                errors={errors}
              />
            </Col>
            <Col md={3}>
              <FormItemInputGroup
                label={i18n.t('SUPPLIER.BANK_ACCOUNT_NUMBER')}
                control={control}
                name={`paymentInfo.${index}.accountNumber`}
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
      <Button
        type="button"
        color="primary"
        onClick={() => append({
          bankName: '', bankBranch: '', accountName: '', accountNumber: '',
        })}
      >
        {i18n.t('SUPPLIER.ADD_PAYMENT_INFO')}
      </Button>
    </div>
  );
};

export default SupplierPaymentInfo;
