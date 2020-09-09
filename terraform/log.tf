module "ecs_task_execution_role" {
  source     = "./modules/iam_role"
  name       = "ecs-task-execution"
  identifier = "ecs-tasks.amazonaws.com"
  policy     = data.aws_iam_policy_document.ecs_task_execution.json
}

data "aws_iam_policy" "ecs_task_execution_role_policy" {
  arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}

data "aws_iam_policy_document" "ecs_task_execution" {
  source_json = data.aws_iam_policy.ecs_task_execution_role_policy.policy
  statement {
    effect    = "Allow"
    actions   = ["ssm:GetParameters", "kms:Decrypt"]
    resources = ["*"]
  }
}

module "ecs_events_role" {
  source     = "./modules/iam_role"
  name       = "ecs-events"
  identifier = "events.amazonaws.com"
  policy     = data.aws_iam_policy.ecs_events_role_policy.policy
}

data "aws_iam_policy" "ecs_events_role_policy" {
  arn = "arn:aws:iam::aws:policy/service-role/AmazonEC2ContainerServiceEventsRole"
}

resource "aws_cloudwatch_log_group" "for_ecs" {
  name              = "/ecs/${var.aws_resource_prefix}"
  retention_in_days = 180
}

resource "aws_cloudwatch_log_group" "for_ecs_scheduled_tasks" {
  name              = "/ecs-scheduled-tasks/${var.aws_resource_prefix}"
  retention_in_days = 180
}

# resource "aws_cloudwatch_event_rule" "example_batch" {
#   name                = "example-batch"
#   description         = "2分毎にdateコマンドを出力します"
#   schedule_expression = "cron(*/2 * * * ? *)"
# }

# resource "aws_cloudwatch_event_target" "example_batch" {
#   target_id = "example-batch"
#   rule      = aws_cloudwatch_event_rule.example_batch.name
#   role_arn  = module.ecs_events_role.iam_role_arn
#   arn       = aws_ecs_cluster.example.arn
#   ecs_target {
#     launch_type         = "FARGATE"
#     task_count          = 1
#     platform_version    = "1.3.0"
#     task_definition_arn = aws_ecs_task_definition.example_batch.arn
#     network_configuration {
#       assign_public_ip = "false"
#       subnets          = [aws_subnet.private_1a.id]
#     }
#   }
# }
