resource "aws_ecr_repository" "example_frontend" {
  name = "${var.aws_resource_prefix}-frontend"
}

resource "aws_ecr_lifecycle_policy" "example_frontend" {
  repository = aws_ecr_repository.example_frontend.name
  policy     = <<EOF
  {
    "rules": [
      {
        "rulePriority": 1,
        "description": "Keep last 1 release images",
        "selection": {
          "tagStatus": "tagged",
          "tagPrefixList": ["release"],
          "countType": "imageCountMoreThan",
          "countNumber": 1
        },
        "action": {
          "type": "expire"
        }
      }
    ]
  }
EOF
}

resource "aws_ecr_repository" "example_backend" {
  name = "${var.aws_resource_prefix}-backend"
}

resource "aws_ecr_lifecycle_policy" "example_backend" {
  repository = aws_ecr_repository.example_backend.name
  policy     = <<EOF
  {
    "rules": [
      {
        "rulePriority": 1,
        "description": "Keep last 1 release images",
        "selection": {
          "tagStatus": "tagged",
          "tagPrefixList": ["release"],
          "countType": "imageCountMoreThan",
          "countNumber": 1
        },
        "action": {
          "type": "expire"
        }
      }
    ]
  }
EOF
}
