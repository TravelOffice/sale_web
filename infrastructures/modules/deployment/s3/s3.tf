variable "ENV" {}
variable "BUCKET_NAME" {}
variable "TAGS" {}

locals {
  root_path = format("%s/../../../../build", path.module)
}

resource "aws_s3_object" "dist" {
  for_each = fileset(local.root_path, "/**")

  bucket       = var.BUCKET_NAME
  key          = each.value
  source       = "${local.root_path}/${each.value}"
  # etag makes the file update when it changes; see https://stackoverflow.com/questions/56107258/terraform-upload-file-to-s3-on-every-apply
  etag = filemd5("${local.root_path}/${each.value}")
}