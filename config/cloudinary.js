const cloudinary = require('cloudinary').v2;
const { Readable } = require('stream');
cloudinary.config({
  cloud_name: 'dixtsphw7',
  api_key: '182982916985176',
  api_secret: 'SUspLYmbFwGJWdFG5uMho7PnRc0',
});
async function uploadBase64(base64String) {
  try {
    const rawBase64 = base64String.startsWith('data:') 
      ? base64String.split(',')[1] 
      : base64String;

    const buffer = Buffer.from(rawBase64, 'base64');

    const readableStream = new Readable();
    readableStream.push(buffer);
    readableStream.push(null); 

    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "messages",
          resource_type: "auto",
          chunk_size: 6000000,
          type: "upload"
        },
        (error, result) => error ? reject(error) : resolve(result)
      );
      
      readableStream.pipe(uploadStream);
    });
  } catch (error) {
    throw error;
  }
}
module.exports = {cloudinary,uploadBase64};
