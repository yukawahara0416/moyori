resource "aws_db_subnet_group" "example" {
  name       = "${var.aws_resource_prefix}-db-subnet-group"
  subnet_ids = [aws_subnet.private_1a.id, aws_subnet.private_1c.id]
}

resource "aws_db_instance" "example" {
  identifier                 = "${var.aws_resource_prefix}-db-instance"
  engine                     = "mysql"
  engine_version             = "8.0.16"
  instance_class             = "db.t3.micro"
  allocated_storage          = 20
  max_allocated_storage      = 100
  storage_type               = "gp2"
  storage_encrypted          = true
  kms_key_id                 = aws_kms_key.example.arn
  username                   = "root"
  password                   = "password"
  multi_az                   = false
  publicly_accessible        = false
  backup_window              = "09:10-09:40"
  backup_retention_period    = 30
  maintenance_window         = "mon:10:10-mon:10:40"
  auto_minor_version_upgrade = false
  deletion_protection        = true
  skip_final_snapshot        = false
  port                       = 3306
  apply_immediately          = false
  vpc_security_group_ids     = [module.mysql_sg.security_group_id]
  parameter_group_name       = aws_db_parameter_group.example.name
  option_group_name          = aws_db_option_group.example.name
  db_subnet_group_name       = aws_db_subnet_group.example.name
  lifecycle {
    ignore_changes = [password]
  }
}

module "mysql_sg" {
  source      = "./modules/security_group"
  name        = "${var.aws_resource_prefix}-mysql-sg"
  vpc_id      = aws_vpc.example.id
  port        = 3306
  cidr_blocks = [aws_vpc.example.cidr_block]
}

resource "aws_db_parameter_group" "example" {
  name   = "${var.aws_resource_prefix}-db-parameter-group"
  family = "mysql8.0"
  parameter {
    name  = "character_set_database"
    value = "utf8mb4"
  }
}

resource "aws_db_option_group" "example" {
  name                 = "${var.aws_resource_prefix}-db-option-group"
  engine_name          = "mysql"
  major_engine_version = "8.0"
  # option {
  #   option_name = "MARIADB_AUDIT_PLUGIN"
  # }
}

# # aws rds modify-db-instance --db-instance-identifier 'example' --master-user-password 'password'
