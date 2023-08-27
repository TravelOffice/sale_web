// ** React Imports
import React, { useState } from 'react';
// ** Third Party Components
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import i18n from '@config/i18n';
// ** Reactstrap Imports
import {
  Button, Card, CardBody, CardHeader, CardTitle, Form, Spinner,
} from 'reactstrap';

import { EditorState } from 'draft-js';
import { CreateSupplierFormData, Supplier } from '@domain/entities/supplier';

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss';
import '@styles/react/libs/input-number/input-number.scss';
import '@styles/react/libs/editor/editor.scss';
import { supplierPresenter } from '@adapter/presenters';
import { useMutation } from '@tanstack/react-query';
import toasty from '@components/Toasty/Toasty';
import { supplierValidateSchema } from '@features/Supplier/validateSchemas/supplierValidateSchema';
import SupplierCommonInfo from '@features/Supplier/components/SupplierCommonInfo';
import SupplierQuote from '@features/Supplier/components/SupplierQuote';
import SupplierPaymentInfo from '@features/Supplier/components/SupplierPaymentInfo';
import SupplierContact from '@features/Supplier/components/SupplierContact';
import { useHistory } from 'react-router-dom';

const SupplierCreatePage = () => {
  const history = useHistory();
  const [
    note,
    setNote,
  ] = useState(EditorState.createEmpty());

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Supplier>({
    resolver: yupResolver(supplierValidateSchema),
    defaultValues: {
      name: '',
      brandName: '',
      establishmentYear: 2000,
      starRating: 1,
      capacity: 1,
      taxId: '',
      city: '',
      district: '',
      address: '',
      note: '',
      services: [],
      quotes: [],
      contacts: [],
      paymentInfo: [],
    },
  });

  const { isLoading, mutate: createSupplierMutation } = useMutation({
    mutationFn: supplierPresenter.addSupplier,
    onSuccess: (supplier: Supplier) => {
      toasty.show({
        title: i18n.t('COMMON.SUCCESS'),
        type: 'success',
        message: i18n.t('SUPPLIER.CREATE_SUPPLIER_SUCCESSFULLY'),
      });
      history.push(`/apps/suppliers/${supplier.code}/edit`);
    },
    onError: (error: Error) => {
      toasty.show({
        title: i18n.t('COMMON.ERROR'),
        type: 'error',
        message: `${error}`,
      });
    },
  });

  const onSubmit = (data: CreateSupplierFormData) => {
    createSupplierMutation(data);
  };

  const goBack = () => {
    history.goBack();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">{i18n.t('SUPPLIER.CREATE_SUPPLIER')}</CardTitle>
      </CardHeader>
      <CardBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <SupplierCommonInfo control={control} errors={errors} note={note} setNote={setNote} />
          <SupplierQuote
            control={control}
            errors={errors}
          />
          <SupplierPaymentInfo
            control={control}
            errors={errors}
          />
          <SupplierContact
            control={control}
            errors={errors}
          />
          <div className="d-flex justify-content-end">
            <Button type="reset" color="danger" className="me-1" outline onClick={goBack}>
              {i18n.t('COMMON.BACK')}
            </Button>
            <Button type="submit" className="me-1" color="primary">
              {!isLoading ? i18n.t('SUPPLIER.CREATE_SUPPLIER') : i18n.t('COMMON.LOADING')}
              {isLoading ? (
                <Spinner
                  style={{ width: '0.7rem', height: '0.7rem' }}
                  type="grow"
                  color="light"
                />
              ) : null}
            </Button>
          </div>
        </Form>
      </CardBody>
    </Card>
  );
};

export default SupplierCreatePage;
