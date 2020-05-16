data "aws_ecs_task_definition" "example" {
  task_definition = aws_ecs_task_definition.example.family
}

resource "aws_ecs_cluster" "example" {
  name = "${var.aws_resource_prefix}-cluster"
}

resource "aws_ecs_service" "example" {
  name                              = "${var.aws_resource_prefix}-service"
  cluster                           = aws_ecs_cluster.example.arn
  task_definition                   = "${aws_ecs_task_definition.example.family}:${max("${aws_ecs_task_definition.example.revision}", "${data.aws_ecs_task_definition.example.revision}")}"
  desired_count                     = 2
  launch_type                       = "FARGATE"
  platform_version                  = "1.3.0"
  health_check_grace_period_seconds = 60
  network_configuration {
    assign_public_ip = false
    security_groups  = [module.ecs_sg.security_group_id]
    subnets = [
      aws_subnet.private_1a.id,
      aws_subnet.private_1c.id,
    ]
  }
  load_balancer {
    target_group_arn = aws_lb_target_group.example.arn
    container_name   = "frontend"
    container_port   = 8080
  }
  # lifecycle {
  #   ignore_changes = [task_definition]
  # }
}

resource "aws_ecs_task_definition" "example" {
  family                   = "${var.aws_resource_prefix}-task"
  cpu                      = "256"
  memory                   = "512"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  execution_role_arn       = module.ecs_task_execution_role.iam_role_arn
  container_definitions    = <<TASK_DEFINITION
  [
    {
      "name": "frontend",
      "image": "${var.aws_account_id}.dkr.ecr.${var.aws_region}.amazonaws.com/${var.aws_resource_prefix}-frontend:latest",
      "essential": true,
      "command": ["yarn", "serve"],
      "workingDirectory": "/app/frontend",
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/ecs/${var.aws_resource_prefix}",
          "awslogs-region": "${var.aws_region}",
          "awslogs-stream-prefix": "ecs"
        }
      },
      "portMappings": [
        {
          "containerPort": 8080,
          "protocol": "tcp"
        }
      ],
      "environment": [{ "name": "NODE_ENV", "value": "production" }]
    },

    {
      "name": "backend",
      "image": "${var.aws_account_id}.dkr.ecr.${var.aws_region}.amazonaws.com/${var.aws_resource_prefix}-backend:latest",
      "essential": true,
      "command": ["bundle", "exec", "rails", "s"],
      "workingDirectory": "/app/backend",
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/ecs/${var.aws_resource_prefix}",
          "awslogs-region": "${var.aws_region}",
          "awslogs-stream-prefix": "ecs"
        }
      },
      "portMappings": [
        {
          "containerPort": 3000,
          "protocol": "tcp"
        }
      ],
      "environment": [
        { "name": "RAILS_ENV", "value": "production" },
        {
          "name": "DB_HOST",
          "value": "${aws_db_instance.example.address}"
        },
        { "name": "DB_DATABASE", "value": "${var.db_database}" },
        { "name": "DB_USERNAME", "value": "${var.db_username}" },
        { "name": "DB_PASSWORD", "value": "${var.db_password}" },
        {
          "name": "RAILS_MASTER_KEY",
          "value": "${var.rails_master_key}"
        },
        { "name": "RAILS_LOG_TO_STDOUT", "value": "ENABLED" }
      ]
    }
  ]
  TASK_DEFINITION
}

resource "aws_ecs_task_definition" "example_batch" {
  family                   = "${var.aws_resource_prefix}-batch"
  cpu                      = "256"
  memory                   = "512"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  execution_role_arn       = module.ecs_task_execution_role.iam_role_arn
  container_definitions    = <<TASK_DEFINITION
  [
    {
      "name": "alpine",
      "image": "alpine:latest",
      "essential": true,
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-region": "${var.aws_region}",
          "awslogs-stream-prefix": "batch",
          "awslogs-group": "/ecs-scheduled-tasks/${var.aws_resource_prefix}"
        }
      },
      "command": ["/bin/date"]
    }
  ]
  TASK_DEFINITION
}

module "ecs_sg" {
  source      = "./modules/security_group"
  name        = "ecs-sg"
  vpc_id      = aws_vpc.example.id
  port        = 80
  cidr_blocks = [aws_vpc.example.cidr_block]
}

resource "aws_security_group_rule" "alb" {
  type                     = "ingress"
  from_port                = 0
  to_port                  = 65535
  protocol                 = "tcp"
  source_security_group_id = module.https_sg.security_group_id
  security_group_id        = module.ecs_sg.security_group_id
}
