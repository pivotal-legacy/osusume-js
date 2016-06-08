import expect from 'expect'
import S3FileUploader from '../src/js/S3FileUploader'
import AWS from 'aws-sdk'

describe("S3FileUploader", () => {
  it("creates the fetchRestaurants action if the token exists", () => {
    let file = {name: "myfile.txt", type: 'image/png'}
    let uuid = {v4: () => {return 'my-uuid'}}
    let expectedUrl = 'http://its.a.party!!'
    let expectedParams = {
      Bucket: 'osusume-tokyo-dev',
      Key: 'my-uuid',
      ContentType: 'image/png',
      ACL: 'public-read',
      Body: file
    }
    let actualParams
    let bucket = {
      upload: (params, callback) => {
        actualParams = params
        callback(null, {Location: expectedUrl})
      }
    }
    let fileUploader = new S3FileUploader(uuid, bucket)

    let promise = fileUploader.upload(file)

    expect(actualParams).toEqual(expectedParams)

    return promise.then((url) => {
      expect(url).toEqual(expectedUrl)
    })
  })
})
