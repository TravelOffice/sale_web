export interface DeletePaymentVoucherUseCase {
  invoke: (id: string) => Promise<string>
}
