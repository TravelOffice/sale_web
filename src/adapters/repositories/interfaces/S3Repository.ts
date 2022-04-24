export interface S3Repository {
  uploadChatAttachmentViaPresignedURL: (
    pageId: string, customerId: string, file: File
  ) => Promise<string>
}
