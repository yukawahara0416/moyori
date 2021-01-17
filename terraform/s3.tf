resource "aws_s3_bucket" "alb_log" {
  bucket = "alb-log-pragmatic-${var.github_organization}-${var.github_repo}"
  lifecycle_rule {
    enabled = true
    expiration {
      days = "180"
    }
  }
}

resource "aws_s3_bucket_policy" "alb_log" {
  bucket = aws_s3_bucket.alb_log.id
  policy = data.aws_iam_policy_document.alb_log.json
}

data "aws_iam_policy_document" "alb_log" {
  statement {
    effect    = "Allow"
    actions   = ["s3:PutObject"]
    resources = ["arn:aws:s3:::${aws_s3_bucket.alb_log.id}/*"]
    principals {
      type        = "AWS"
      identifiers = ["582318560864"]
    }
  }
}

resource "aws_s3_bucket" "moyori-image" {
  bucket = "aws-kawahara-image-test"
  acl    = "null"
}
# resource "aws_s3_bucket" "force_destroy" {
#   bucket        = "force-destroy-${var.github_organization}-${var.github_repo}"
#   force_destroy = true
# }
