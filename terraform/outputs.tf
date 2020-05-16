output "domain_name" {
  value       = aws_route53_record.example.name
  description = "The Domain Name"
}

output "alb_dns_name" {
  value       = aws_lb.example.dns_name
  description = "The ALB DNS Name of the AWS"
}

output "rds_endpoint" {
  value       = aws_db_instance.example.address
  description = "The RDS Endpoint of the AWS "
}
