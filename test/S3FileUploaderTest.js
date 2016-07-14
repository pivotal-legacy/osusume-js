import expect from 'expect'
import S3FileUploader from '../src/js/S3FileUploader'
import AWS from 'aws-sdk'

describe("S3FileUploader", () => {
  it("creates the fetchRestaurants action if the token exists", () => {
    let files = [{name: "myfile.txt", type: 'image/png'}, {name: "dog.txt", type: 'image/png'}]
    let uuid = {v4: () => {return 'my-uuid'}}
    let expectedUrl = 'http://its.a.party!!'
    let expectedParams = [
      {
        Bucket: 'osusume-tokyo-dev',
        Key: 'my-uuid',
        ContentType: 'image/png',
        ACL: 'public-read',
        Body: files[0]
      },
      {
        Bucket: 'osusume-tokyo-dev',
        Key: 'my-uuid',
        ContentType: 'image/png',
        ACL: 'public-read',
        Body: files[1]
      }
    ]
    let actualParams = []
    let bucket = {
      upload: (params, callback) => {
        actualParams.push(params)
        callback(null, {Location: expectedUrl})
      }
    }
    let fileUploader = new S3FileUploader(uuid, bucket)

    let promise = fileUploader.uploadPhotos(files)

    expect(actualParams[0]).toEqual(expectedParams[0])
    expect(actualParams[1]).toEqual(expectedParams[1])


    return promise.then((urls) => {
      expect(urls[0]).toEqual(expectedUrl)
      expect(urls[1]).toEqual(expectedUrl)
    })
  })
})
