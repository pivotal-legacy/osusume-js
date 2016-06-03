import AWS from 'aws-sdk'

export default class S3FileUploader {
  constructor(bucket) {
    AWS.config.update({
      accessKeyId: process.env.S3_ACCESS_KEY_ID,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY
    })
    this.bucket = bucket ? bucket : new AWS.S3({region: 'ap-northeast-1', Bucket: 'osusume-tokyo-dev'});
  }

  upload(file) {
    let promise = new Promise((resolve) => {
      let params = {
        Bucket: 'osusume-tokyo-dev',
        Key: file.name,
        ContentType: file.type,
        ACL: 'public-read',
        Body: file
      }
      this.bucket.upload(params, function (err, data) {
        resolve(data.Location)
      })
     });
    return promise;
  }
}
