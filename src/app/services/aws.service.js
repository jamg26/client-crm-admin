import S3 from 'react-aws-s3';

const config = {
    bucketName: process.env.BUCKET,
    dirName: 'support/attachment',
    region: process.env.REGION,
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_KEY
}