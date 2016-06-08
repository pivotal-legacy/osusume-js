import AWS from 'aws-sdk'

export default class S3FileUploader {
  constructor(uuid, bucket=new AWS.S3) {
    AWS.config.region = 'ap-northeast-1'
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: `ap-northeast-1:${process.env.S3_IDENTITY_POOL_ID}`
    })
    this.bucket = bucket
    this.uuid = uuid
  }

  upload(file) {
    let promise = new Promise((resolve) => {
      let params = {
        Bucket: 'osusume-tokyo-dev',
        Key: this.uuid.v4(),
        ContentType: file.type,
        ACL: 'public-read',
        Body: file
      }
      this.bucket.upload(params, function (err, data) {
        resolve(data.Location)
      })
     })
    return promise
  }
}
