# AWS-S3-Presign-Tutorial

Youtube - https://m.youtube.com/watch?si=rSv97_HA1vHpPSWe&v=Zj338upBMtM&feature=youtu.be

CORS:
```
[
    {
        "AllowedHeaders": [
            "*"
        ],
        "AllowedMethods": [
            "PUT",
            "POST",
            "GET",
            "HEAD"
        ],
        "AllowedOrigins": [
            "*"
        ],
        "ExposeHeaders": []
    }
] ```

BUCKET POLICY :
``{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::s3setuptutorial/*"
        },
        {
            "Sid": "PublicUploadPutObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:PutObject",
            "Resource": "arn:aws:s3:::s3setuptutorial/*"
        }
    ]
}```
