variable "aws_access_key" {}
variable "aws_secret_key" {}
variable "aws_account_id" {}
variable "aws_region" {}
variable "aws_resource_prefix" {}

variable "domain" {}

variable "db_database" {}
variable "db_username" {}
variable "db_password" {}
variable "rails_master_key" {}

variable "github_token" {}
variable "github_secret_token" {}
variable "github_name" {}
variable "github_organization" {}
variable "github_repo" {}

variable "vue_app_gmap_api_key" {}

variable "images" {
  default = {
    us-east-1      = "ami-1ecae776"
    us-west-2      = "ami-e7527ed7"
    us-west-1      = "ami-d114f295"
    eu-west-1      = "ami-a10897d6"
    eu-central-1   = "ami-a8221fb5"
    ap-southeast-1 = "ami-68d8e93a"
    ap-southeast-2 = "ami-fd9cecc7"
    ap-northeast-1 = "ami-cbf90ecb"
    sa-east-1      = "ami-b52890a8"
  }
}
