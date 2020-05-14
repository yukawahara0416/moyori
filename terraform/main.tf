terraform {
  required_version = ">= 0.12.0"
  required_providers {
    aws = ">= 2.7.0"
  }
}

provider "aws" {
  access_key = var.aws_access_key
  secret_key = var.aws_secret_key
  region     = var.aws_region
  version    = "~> 2.60"
}

provider "github" {
  token        = var.github_token
  organization = var.github_organization
}
