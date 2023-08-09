import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { useSupplier } from '@hooks/supplier';
import { Estimation } from '@domain/entities/tour/Estimation';
import { groupBy } from '@utils/Utils';
import { useEstimations } from '@hooks/tourDeparture';
import { usePaymentVouchersOfTour } from '@hooks/paymentVoucher';
import SuppliersTable from '@features/ToursOperation/Estimation/SuppliersTable';
import EstimationsTable from './EstimationsTable';
import PaymentVouchersTable from './PaymentVouchersTable';

export interface EditTourPageParams {
  tourId: string,
}

export default function EstimationPage() {
  const { tourId } = useParams<EditTourPageParams>();
  const {
    data: allEstimations,
    isLoading: isLoadingEstimations,
  } = useEstimations(tourId);

  const {
    data: allSuppliers,
    isLoading: isLoadingSuppliers,
  } = useSupplier();

  const {
    data: allPaymentVouchers,
    isLoading: isLoadingPaymentVouchers,
  } = usePaymentVouchersOfTour(tourId);

  const estimationsWithSupplier = useMemo(() => {
    if (!allEstimations || !allSuppliers) return [];
    return allEstimations.map((estimation: Estimation) => ({
      ...estimation,
      supplier: allSuppliers.find((supplier) => supplier.code === estimation.supplierId),
    }));
  }, [allEstimations, allSuppliers]);

  const estimationsGroupByType = useMemo(() => groupBy(
    estimationsWithSupplier ?? [], (estimation: Estimation) => estimation.serviceType,
  ), [estimationsWithSupplier]);

  const estimationsGroupBySupplier = useMemo(() => groupBy(
    estimationsWithSupplier ?? [], (estimation: Estimation) => estimation.supplierId,
  ), [estimationsWithSupplier]);

  return (
    <>
      <EstimationsTable
        estimationsGroupByType={estimationsGroupByType}
        allSuppliers={allSuppliers!}
        isLoading={isLoadingEstimations && isLoadingSuppliers && isLoadingPaymentVouchers}
      />
      <SuppliersTable
        allPaymentVouchers={allPaymentVouchers!}
        estimationsGroupBySupplier={estimationsGroupBySupplier}
        isLoading={isLoadingEstimations && isLoadingSuppliers && isLoadingPaymentVouchers}
        tourId={tourId}
      />
      <PaymentVouchersTable
        allPaymentVouchers={allPaymentVouchers!}
        isLoading={isLoadingEstimations && isLoadingSuppliers && isLoadingPaymentVouchers}
      />
    </>
  );
}
