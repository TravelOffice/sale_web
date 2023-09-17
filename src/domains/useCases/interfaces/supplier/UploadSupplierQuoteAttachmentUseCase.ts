export interface UploadSupplierQuoteAttachmentUseCase {
  invoke: (file: File, presignedUrl?: string) => Promise<string>
}
