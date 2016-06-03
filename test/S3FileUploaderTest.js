import expect from 'expect';
import S3FileUploader from '../src/js/S3FileUploader';
import AWS from 'aws-sdk';

describe("S3FileUploader", () => {
  it("creates the fetchRestaurants action if the token exists", () => {
    var bucket = new AWS.S3({params: {Bucket: 'myBucket'}});
    let expectedUrl = 'http://its.a.party!!'
    let file = {name: "myfile.txt"}
//    let promise = new Promise((resolve) => {resolve(expectedUrl)})
    let promise = Promise.resolve(expectedUrl)
    promise.then((expectedUrl) => {
      expect(expectedUrl).toBe(url);
    })
    expect.spyOn(bucket, 'upload').andReturn(promise);
    let fileUploader = new S3FileUploader(bucket);
    fileUploader.upload(file)
    // fileUploader.upload(file).then((expectedUrl) => {
    //   expect(expectedUrl).toBe(url);
    // })
  })
});
