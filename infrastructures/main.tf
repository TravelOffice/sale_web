variable "TF_BUCKET" {}
locals {
  remote_feature_name = "base_infrastructure"
  iam_roles = {
    standard_lambda_role = module.REMOTE_STATE.STATE.COMMON_CONFIG.iam.roles.standard_lambda_iam_role
  }

  tags = {
    Env       = var.ENV
    Terraform = true
    Feature   = var.FEATURE_NAME
  }
}

module "REMOTE_STATE" {
  source              = "../../modules/tf_remote_state"
  ENV                 = var.ENV
  REMOTE_TF_BUCKET    = var.TF_BUCKET
  REMOTE_FEATURE_NAME = local.remote_feature_name
  REMOTE_AWS_REGION   = var.AWS_REGION
}

module "S3_UPLOAD" {
  source      = "../../modules/deployment/s3"
  ENV         = var.ENV
  BUCKET_NAME = module.REMOTE_STATE.STATE.MARKETING.frontend.sale_web.s3_bucket
  TAGS        = local.tags
}