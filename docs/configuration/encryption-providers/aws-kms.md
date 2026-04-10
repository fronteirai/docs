# AWS KMS

This guide explains how to set up AWS KMS encryption for Fronteir AI.

### Prerequisites

- AWS CLI installed and logged in with valid credentials.

### 1. Create KMS Key

```bash
aws kms create-key \
  --description "Fronteir AI Encryption Key" \
  --key-usage ENCRYPT_DECRYPT \
  --key-spec SYMMETRIC_DEFAULT

# Optional, but recommended - Create an Alias
aws kms create-alias \
  --alias-name alias/obot-encryption-key \
  --target-key-id <key-id>
```

### 2. Update the Key Policy (Optional)

```bash
aws kms put-key-policy \
  --key-id <key-id> \
  --policy-name default \
  --policy file://kms-policy.json
```

Example `kms-policy.json`:

```json
{
  "Version": "2012-10-17",
  "Id": "obot-encryption-policy",
  "Statement": [
    {
      "Sid": "Allow access for Fronteir AI",
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::<ACCOUNT_ID>:<OBOT_IAM_IDENTITY_NAME>"
      },
      "Action": [
        "kms:Encrypt",
        "kms:Decrypt",
        "kms:DescribeKey",
        "kms:GenerateDataKey"
      ],
      "Resource": "*"
    }
  ]
}
```

### Fronteir AI environment variables

Make sure the following environment variables are set on Fronteir AI when you run it:

- `OBOT_SERVER_ENCRYPTION_PROVIDER=aws`
- `OBOT_AWS_KMS_KEY_ARN=<your key ARN>`

### AWS credentials

The credentials can be provided to Fronteir AI either via the standard AWS environment variables (`AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_SESSION_TOKEN`, `AWS_REGION`) or through a metadata server setup with EC2 or IRSA in Kubernetes.
