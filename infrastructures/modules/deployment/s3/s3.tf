variable "ENV" {}
variable "BUCKET_NAME" {}
variable "TAGS" {}

locals {
  root_path = format("%s/../../../../build", path.module)
}

resource "null_resource" "upload_build_folder" {
  triggers = {
    always_run = "${timestamp()}"
  }
  provisioner "local-exec" {
    command = "aws s3 sync ${local.root_path}/ s3://${var.BUCKET_NAME}"
  }
}
