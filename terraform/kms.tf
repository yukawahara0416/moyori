resource "aws_kms_key" "example" {
  description             = "${var.aws_resource_prefix} customer master key"
  enable_key_rotation     = true
  is_enabled              = true
  deletion_window_in_days = 30
}

resource "aws_kms_alias" "example" {
  name          = "alias/${var.aws_resource_prefix}"
  target_key_id = aws_kms_key.example.key_id
}
