
module.exports = {
    postgresURI: process.env.POSTGRES_URI,
    secretOrKey: process.env.SECRET,
    awsAccessKeyId: process.env.AWS_ACCESS_KEY,
    awsSecretAccessKey: process.env.AWS_SECRET,
    s3Region: process.env.S3_REGION,
    s3Bucket: process.env.S3_BUCKET
  };